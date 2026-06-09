import { useState, useEffect } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraPartida({ setMensagem }) {
    // Dados da partida
    const [listaJogadores, setJogadores] = useState([]);
    const [listaSalva, setSalvo] = useState([]);
    const [jogadoresSelecionados, setSelecao] = useState(false);
    const [timeBranco, setBranco] = useState([null, ""]);
    const [listaBrancos, setListaBrancos] = useState([false, []]);
    const [timePreto, setPreto] = useState([null, ""]);
    const [listaPretos, setListaPretos] = useState([false, []]);

    // Dados jogadas
    const [pecasPartidas, setPecas] = useState([]);
    const [pecaJogada, setPeca] = useState("");
    const [casaJogada, setCasa] = useState("");
    const [pecaEliminada, setEliminada] = useState("Nenhuma");
    const [vezJogada, setVez] = useState("Branco");
    const [vencedor, setVencedor] = useState(null);

    useEffect(() => {
        async function buscaJogadores() {
            try {
                const Requisicao = new RequisicaoHTTP("/usuarios?tipoUsuario=Jogador");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if (sucesso) {
                    setJogadores(dados);
                    setSalvo(dados);
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

    useEffect(() => { timeBranco && timePreto ? setSelecao(true) : setSelecao(false) }, [timeBranco, timePreto]);

    async function pesquisaJogadores(pesquisa, campo) {
        try {
            const Requisicao = new RequisicaoHTTP(`/usuarios?tipoUsuario=Jogador&filtro=${pesquisa}&tipoFiltro=nickname`);
            const Resposta = await Requisicao.GET();
            const { sucesso, mensagem, dados } = Resposta;
            if(sucesso){
                switch(campo){
                    case "Branco":
                        setBranco([null, pesquisa]);
                        const listaFiltrada_Branco = dados.filter(jog => jog.nicknameJogador != timePreto[1]);
                        setListaBrancos([true, listaFiltrada_Branco]);
                        break;

                    case "Preto":
                        setPreto([null, pesquisa])
                        const listaFiltrada_Preto = dados.filter(jog => jog.nicknameJogador != timeBranco[1]);
                        setListaPretos([true, listaFiltrada_Preto]);
                        break;
                };
                return;

            } else{
                switch(campo){
                    case "Branco":
                        setBranco([null, pesquisa]);
                        setListaBrancos(dados);
                        console.log(listaBrancos)
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
    async function registraPartida() {
        try {
            timeBranco ? null : () => { setMensagem("Jogador do time branco não selecionado."); return; };
            timePreto ? null : () => { setMensagem("Jogador do time preto não selecionado."); return; };
            const dadosPartida = { pecasBrancas: timeBranco, pecasPretas: timePreto };
            const Requisicao = new RequisicaoHTTP("/partidas", dadosPartida);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro, dados } = Resposta;
            if (sucesso) {
                const { ID_partida } = dados;
                setPartida(ID_partida);
                setSelecao(true);
                setMensagem(mensagem);
            } else {
                setMensagem(erro);
            };

        } catch (error) {
            console.error("Erro no registro de partida no servidor: ", error.message || error);
            setMensagem("Erro no registro de partida no servidor");
        }
    };

    // Não concluido
    async function registraJogada() {
        try {
            pecaJogada ? null : () => { }
            casaJogada ? null : () => { }
            const dadosJogada = {
                timeJogada: vezJogada === timeBranco ? "Branco" : "Preto",
                pecaJogada: pecaJogada, casaJogada: casaJogada,
                pecaEliminada: pecaEliminada, ID_partida: ID_partida
            }
            const Requisicao = new RequisicaoHTTP("/jogadas", dadosJogada);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if (sucesso) {
                let pecasBrancas = pecasPartidas;
                vezJogada === timeBranco ? () => {
                    switch (pecaJogada) {
                        case "Peão":
                            break;
                        case "Torre":
                            break;
                        case "Cavalo":
                            break;
                        case "":
                            break;
                        case "":
                            break;
                        case "":
                            break;
                        case "":
                            break;
                    }
                    setVez(timePreto)

                } : setVez(timeBranco);
                setMensagem(mensagem);

            } else {
                setMensagem(erro);
            }

        } catch (error) {
            console.error("Erro no registro de jogada no servidor: ", error.message || error);
            setMensagem("Erro no registro de jogada no servidor.");
        }
    };

    async function finalizaPartida() {
        try {
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

    return (<main className="sm:ml-[60px] flex flex-col sm:flex-row">
        {true ? <form className="gap-5" onSubmit={() => { }}>
            <h1>Jogadores</h1>
            <div className="flex flex-col sm:flex-row gap-5 justify-center content-center">
                <div className="flex flex-col">
                    <label htmlFor="timeBranco">Peças Brancas<span className="text-red-600">*</span></label>
                    <input type="text" name="timeBranco" id="timeBranco" placeholder="Digite o nickname" required autoComplete="off" className="w-60" value={timeBranco[1]} onInput={(e) => {pesquisaJogadores(e.target.value, "Branco")}}/>
                    {listaBrancos[0] && timeBranco[1] && listaBrancos.length > 0 ? (
                        <div className={`border h-auto flex flex-col`}>
                            {listaBrancos[1].map(e => (<div key={e.ID_jogador} className="p-[7px] hover:bg-gray-200" onClick={() => {setBranco([null, e.nicknameJogador]); setListaBrancos([false, listaBrancos])}}>{e.nicknameJogador}</div>))}
                        </div>) 
                    : null}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="timePreto">Peças Pretas<span className="text-red-600">*</span></label>
                    <input type="text" name="timePreto" id="timePreto" placeholder="Digite o nickname" required autoComplete="off" className="w-60" value={timePreto[1]} onInput={(e) => {pesquisaJogadores(e.target.value, "Preto")}}/>
                    {listaPretos[0] && timePreto[1] && listaPretos.length > 0 ? (
                        <div className={`border h-auto flex flex-col`}>
                            {listaPretos[1].map(e => (<div key={e.ID_jogador} className="p-[7px] hover:bg-gray-200" onClick={() => {setPreto([null, e.nicknameJogador]); setListaPretos([false, listaPretos])}}>{e.nicknameJogador}</div>))}
                        </div>
                    ) : null}
                    
                </div>
            </div>
            <button type="submit">Começar partida</button>
        </form> : null}

        {jogadoresSelecionados ? <form className="gap-2" onSubmit={() => { }}>
            <h1>Partida</h1>
            <label htmlFor="">Peça<span className="text-red-600">*</span></label>
            <select name="" id="" onChange={(e) => { setPeca(e.target.value) }} value={pecaJogada} required>
                <option value="" disabled>Peça jogada</option>
                {pecasPartidas[1].map((p) => (<option value={p}>{p}</option>))}
            </select>

            <label htmlFor="casaJogada">Casa<span className="text-red-600">*</span></label>
            <div id="casaJogada" className="flex gap-3">
                <select name="letra" id="letra" onChange={() => { SelecaoCasa() }} value={(casaJogada.split(''))[0]} required>
                    {["A", "B", "C", "D", "E", "F", "G", "H"].map((letra, index) => (<option value={letra} key={index}>{letra}</option>))}
                </select>

                <select name="numero" id="numero" onChange={() => { SelecaoCasa() }} value={(casaJogada.split(''))[1]} required>
                    {[1,2,3,4,5,6,7,8].map((numero, index) => (<option value={numero} key={index}>{numero}</option>))}
                </select>
            </div>

            <label htmlFor="">Peça adversaria</label>
            <select name="" id="" onChange={(e) => { setEliminada(e.target.value) }} value={pecaEliminada}>
                <option value="Nenhuma" disabled>Peça eliminada</option>
                {pecasPartidas[1].map((p) => (<option value={p}>{p}</option>))}
                <option value="Nenhuma">Nenhuma</option>
            </select>

            <button type="submit">Jogar</button>
        </form> : null}
    </main>)
}

export default RegistraPartida;