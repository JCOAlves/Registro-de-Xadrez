import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraPartida({ setMensagem }) {
    // Dados evento
    const [ID_evento, setEvento] = useState("");
    const [listaEventos, setEventos] = useState([]);

    // Dados da partida
    const [listaJogadores, setJogadores] = useState([[], []]);
    const [jogadoresSelecionados, setSelecao] = useState(false);
    const [timeBranco, setBranco] = useState(["", ""]);
    const [listaBrancos, setListaBrancos] = useState([false, []]);
    const [timePreto, setPreto] = useState(["", ""]);
    const [listaPretos, setListaPretos] = useState([false, []]);

    // Dados jogadas
    const [partida, setPartida] = useState("");
    const [pecasPartidas, setPecas] = useState([]);
    const [pecaJogada, setPeca] = useState("");
    const [casaJogada, setCasa] = useState("");
    const [pecaEliminada, setEliminada] = useState("Nenhuma");
    const [vezJogada, setVez] = useState("Branco");
    const [vencedor, setVencedor] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const [submitDesabilitado, setDesabilitado] = useState([true, true]);

    useEffect(() => {
        async function buscaEventos() {
            try {
                const Requisicao = new RequisicaoHTTP("/eventos");
                const Resposta = await Requisicao.GET();
                const { sucesso, dados, mensagem } = Resposta;
                if (sucesso) {
                    setEventos(dados);

                } else {
                    setMensagem(mensagem);
                }

            } catch (error) {
                setMensagem("Erro na busca de eventos no servidor");
                console.error("ERRO: ", error.message || error);
            };
        };

        if (setEvento(searchParams.get("evento"))) {
            setEvento(searchParams.get("evento"))

        } else {
            setEvento("");
            buscaEventos();
        }
    }, [searchParams]);



    useEffect(() => {
        async function buscaJogadores() {
            try {
                const Requisicao = new RequisicaoHTTP("/usuarios?tipoUsuario=Jogador");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if (sucesso) {
                    setJogadores([dados, dados]);
                } else {
                    setMensagem(mensagem);
                };

            } catch (error) {
                console.error("Erro na listagem de jogadores registrados: ", error.message || error);
                setMensagem("Erro na listagem de jogadores regiatrados.");
            }
        };
        buscaJogadores();

        const Partida = {
            "Branco": { "Rei": 1, "Rainha": 1, "Torre": 2, "Bispo": 2, "Cavalo": 2, "Peao": 8 },
            "Preto": { "Rei": 1, "Rainha": 1, "Torre": 2, "Bispo": 2, "Cavalo": 2, "Peao": 8 }
        };
        setPecas([Partida, ["Peao", "Cavalo", "Bispo", "Torre", "Rainha", "Rei"]]);
    }, []);

    useEffect(() => {
        if (timeBranco && timePreto) {
            setDesabilitado([false, true]);

        } else {
            setDesabilitado([true, true]);
        }

    }, [timeBranco, timePreto]);

    async function pesquisaJogadores(pesquisa, campo) {
        try {
            const Requisicao = new RequisicaoHTTP(`/usuarios?tipoUsuario=Jogador&filtro=${pesquisa}&tipoFiltro=nickname`);
            const Resposta = await Requisicao.GET();
            const { sucesso, mensagem, dados } = Resposta;
            if (sucesso) {
                switch (campo) {
                    case "Branco":
                        setBranco(["", pesquisa]);
                        const listaFiltrada_Branco = dados.filter(jog => jog.ID_jogador != timePreto[1]);
                        setListaBrancos([true, listaFiltrada_Branco]);
                        break;

                    case "Preto":
                        setPreto(["", pesquisa])
                        const listaFiltrada_Preto = dados.filter(jog => jog.ID_jogador != timeBranco[1]);
                        setListaPretos([true, listaFiltrada_Preto]);
                        break;
                };
                return;

            } else {
                switch (campo) {
                    case "Branco":
                        setBranco([null, pesquisa]);
                        setListaBrancos(dados);
                        break;

                    case "Preto":
                        setPreto([null, pesquisa]);
                        setListaPretos(dados);
                        break;
                };
                return;
            }

        } catch (error) {
            console.error("ERRO: ", error.message || error);
        }
    }

    // Necessarios ajustes
    async function registraPartida(e) {
        try {
            setDesabilitado([true, true]);

            const formulario = e.currentTarget;
            if (!formulario.checkValidity()) return;

            e.preventDefault();

            ID_evento ? null : () => { setMensagem("Evento não selecionado."); return; };
            timeBranco ? null : () => { setMensagem("Jogador do time branco não selecionado."); return; };
            timePreto ? null : () => { setMensagem("Jogador do time preto não selecionado."); return; };
            const dadosPartida = { pecasBrancas: timeBranco[1], pecasPretas: timePreto[1], ID_evento: ID_evento };
            const Requisicao = new RequisicaoHTTP("/partidas", dadosPartida);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro, dados } = Resposta;
            if (sucesso) {
                setSelecao(true);
                const { ID_partida } = dados;
                setPartida(ID_partida);
                setMensagem(mensagem);
            } else {
                setMensagem(erro);
                setSelecao(false);
            };

        } catch (error) {
            console.error("Erro no registro de partida no servidor: ", error.message || error);
            setMensagem("Erro no registro de partida no servidor");
        }
    };

    // Não concluido
    async function registraJogada(e) {
        try {
            setDesabilitado([false, false]);

            const formulario = e.currentTarget;
            if (!formulario.checkValidity()) return;

            e.preventDefault();

            pecaJogada ? null : () => { }
            casaJogada ? null : () => { }
            const dadosJogada = {
                timeJogada: "Time Preto", // <-- Revesar as vezes da jogada
                pecaJogada: pecaJogada, casaJogada: casaJogada,
                pecaEliminada: pecaEliminada, ID_partida: partida
            }
            const Requisicao = new RequisicaoHTTP("/jogadas", dadosJogada);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if (sucesso) {
                setMensagem(mensagem);

            } else {
                setMensagem(erro);
            }

        } catch (error) {
            console.error("Erro no registro de jogada no servidor: ", error.message || error);
            setMensagem("Erro no registro de jogada no servidor.");
        }
    };

    async function finalizaPartida(e) {
        try {
            const formulario = e.currentTarget;
            if (!formulario.checkValidity()) return;

            e.preventDefault();

            vencedor ? null : () => { setMensagem("Não fornecido o jogador vencedor da partida."); return; };
            const dados = { vencedor: vencedor };

            const Requisicao = new RequisicaoHTTP(`/finalizaPartida`, dados);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if (sucesso) {
                setMensagem(mensagem);
            } else {
                setMensagem(erro);
            }

        } catch (error) {
            console.error("Erro na finalização de partida no servidor: ", error.message || error);
            setMensagem("Erro na finalização de partida no servidor.");
        }
    };

    return (<main className="sm:ml-[60px] flex flex-col">
        {partida}
        {!jogadoresSelecionados ? <form className="gap-5" onSubmit={(e) => { registraPartida(e) }}>
            {!ID_evento ? <div className="flex flex-col gap-2 max-w-125 w-full ml-auto mr-auto">
                <h1>Evento<span className="text-red-600">*</span></h1>
                <select value={ID_evento} onChange={(e) => { setEvento(e.target.value) }} required>
                    <option value="" disabled>Selecione o evento referido</option>
                    {listaEventos.map(e => (<option key={e.ID_evento} value={e.ID_evento}>{e.nomeEvento}</option>))}
                </select>
            </div> : null}
    
            <h1>Jogadores</h1>
            <div className="flex flex-col sm:flex-row gap-5 justify-center content-center">
                <div className="flex flex-col">
                    <label htmlFor="timeBranco">Peças Brancas<span className="text-red-600">*</span></label>
                    <input type="text" name="timeBranco" id="timeBranco" placeholder="Digite o nickname" required autoComplete="off" className="w-60" value={timeBranco[0]} onInput={(e) => { pesquisaJogadores(e.target.value, "Branco") }} />
                    {listaBrancos[0] && timeBranco[1] && listaBrancos.length > 0 ? (
                        <div className={`border h-auto flex flex-col`}>
                            {listaBrancos[1].map(e => (<div key={e.ID_jogador} className="p-[7px] hover:bg-gray-200" onClick={() => { setBranco([e.nicknameJogador, e.ID_jogador]); setListaBrancos([false, listaBrancos]) }}>{e.nicknameJogador}</div>))}
                        </div>)
                        : null}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="timePreto">Peças Pretas<span className="text-red-600">*</span></label>
                    <input type="text" name="timePreto" id="timePreto" placeholder="Digite o nickname" required autoComplete="off" className="w-60" value={timePreto[0]} onInput={(e) => { pesquisaJogadores(e.target.value, "Preto") }} />
                    {listaPretos[0] && timePreto[1] && listaPretos.length > 0 ? (
                        <div className={`border h-auto flex flex-col`}>
                            {listaPretos[1].map(e => (<div key={e.ID_jogador} className="p-[7px] hover:bg-gray-200" onClick={() => { setPreto([e.nicknameJogador, e.ID_jogador]); setListaPretos([false, listaPretos]) }}>{e.nicknameJogador}</div>))}
                        </div>
                    ) : null}

                </div>
            </div>
            <button type="submit" disabled={submitDesabilitado[0]}>Começar partida</button>
        </form> : null}

        {jogadoresSelecionados ? <form className="gap-2" onSubmit={() => { }}>
            <h1>Partida</h1>
            <label htmlFor="">Peça<span className="text-red-600">*</span></label>
            <select name="" id="" onChange={(e) => { setPeca(e.target.value) }} value={pecaJogada} required>
                <option value="" disabled>Peça jogada</option>
                {pecasPartidas[1].map((p, index) => (<option key={index} value={p}>{p}</option>))}
            </select>

            <label htmlFor="casaJogada">Casa<span className="text-red-600">*</span></label>
            <div id="casaJogada" className="flex gap-3">
                <select name="letra" id="letra" onChange={() => { SelecaoCasa() }} value={(casaJogada.split(''))[0]} required>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((letra, index) => (<option value={letra} key={index}>{letra}</option>))}
                </select>

                <select name="numero" id="numero" onChange={() => { SelecaoCasa() }} value={(casaJogada.split(''))[1]} required>
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((numero, index) => (<option value={numero} key={index}>{numero}</option>))}
                </select>
            </div>

            <label htmlFor="">Peça adversaria</label>
            <select name="" id="" onChange={(e) => { setEliminada(e.target.value) }} value={pecaEliminada}>
                <option value="Nenhuma" disabled>Peça eliminada</option>
                {pecasPartidas[1].map((p, index) => (<option value={p} key={index}>{p}</option>))}
                <option value="Nenhuma">Nenhuma</option>
            </select>

            <button type="submit" disabled={submitDesabilitado[1]}>Jogar</button>
        </form> : null}
    </main>)
}

export default RegistraPartida;