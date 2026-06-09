import { useState, useEffect } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraPartida({ setMensagem }) {
    // Dados da partida
    const [listaJogadores, setJogadores] = useState([]);
    const [listaSalva, setSalvo] = useState([]);
    const [jogadoresSelecionados, setSelecao] = useState(false);
    const [timeBranco, setBranco] = useState("");
    const [listaBrancos, setListaBrancos] = useState([]);
    const [timePreto, setPreto] = useState("");
    const [listaPretos, setListaPretos] = useState([]);

    // Dados jogadas
    const [pecasPartidas, setPecas] = useState(null);
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
        setPecas(Partida);
    }, []);

    async function pesquisaJogadores(pesquisa, campo) {
        try {
            const Requisicao = new RequisicaoHTTP(`/usuarios?tipoUsuario=Jogador&filtro=${pesquisa}&tipoFiltro=nickname`);
            const Resposta = await Requisicao.GET();
            const { sucesso, mensagem, dados } = Resposta;
            if(sucesso){
                switch(campo){
                    case "Branco":
                        setBranco(pesquisa)
                        setListaBrancos(dados);
                        break;

                    case "Preto":
                        setPreto(pesquisa)
                        setListaPretos(dados.filter(jog => dados != timeBranco));
                        break;
                };
                return;

            } else{
                setMensagem(mensagem);
                return;
            }
            
        } catch (error) {
            console.error("ERRO: ", error.message || error);
        }
    }

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

    return (<main className="sm:ml-[60px]">
        {jogadoresSelecionados === false ? <form onSubmit={() => { }}>
            <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                    <label htmlFor="timeBranco">Peças Brancas</label>
                    <input type="text" name="timeBranco" id="timeBranco" value={timeBranco} onInput={(e) => {pesquisaJogadores(e.target.value, "Branco")}}/>
                    <div className={`border h-10 ${timeBranco ? "flex" : "hidden"} flex-col`}>
                        {/*Lista filtrada*/}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="timePreto">Peças Pretas</label>
                    <input type="text" name="timePreto" id="timePreto" value={timePreto} onInput={(e) => {pesquisaJogadores(e.target.value, "Preto")}}/>
                    <div className={`border h-10 ${timePreto ? "flex" : "hidden"} flex-col`}>
                        {/*Lista filtrada*/}
                    </div>
                </div>
            </div>
            <button type="submit">Começar partida</button>
        </form> : null}

        {jogadoresSelecionados === true ? <form onSubmit={() => { }}>
            <label htmlFor="">Peça</label>
            <select name="" id="" onChange={(e) => { setPeca(e.target.value) }} value={pecaJogada}>
                <option value="" disabled>Peça</option>
                <option value="Peão">Peão</option>
                <option value="Torre">Torre</option>
                <option value="Cavalo">Cavalo</option>
                <option value="Bispo">Bispo</option>
                <option value="Rainha">Rainha</option>
                <option value="Rei">Rei</option>
            </select>

            <label htmlFor="casaJogada">Casa</label>
            <div id="casaJogada" className="doisCampos">
                <select name="letra" id="letra" onChange={() => { SelecaoCasa() }} value={(casaJogada.split(''))[0]}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                </select>

                <select name="numero" id="numero" onChange={() => { SelecaoCasa() }} value={(casaJogada.split(''))[1]}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>

            <label htmlFor="">Peça adversaria</label>
            <select name="" id="" onChange={(e) => { setEliminada(e.target.value) }} value={pecaEliminada}>
                <option value="Nenhuma" disabled>Peça</option>
                <option value="Peão">Peão</option>
                <option value="Torre">Torre</option>
                <option value="Cavalo">Cavalo</option>
                <option value="Bispo">Bispo</option>
                <option value="Rainha">Rainha</option>
                <option value="Rei">Rei</option>
                <option value="Nenhuma">Nenhuma</option>
            </select>

            <button type="submit">Jogar</button>
        </form> : null}
    </main>)
}

export default RegistraPartida;