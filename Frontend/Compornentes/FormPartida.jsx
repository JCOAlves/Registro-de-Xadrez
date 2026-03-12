import { useState, useEffect } from "react";
import { GET, POST } from "../FuncoesJS/MetodosHTTP.js";

function FormPartida({setMensagem}) {
    const [listaJogadores, setJogadores] = useState(null);
    const [timeBranco, setBranco] = useState(null);
    const [timePreto, setPreto] = useState(null);
    const [ID_partida, setPartida] = useState(0);
    const [jogadoresSelecionados, setSelecao] = useState(false);
    const [pecasPartidas, setPecas] = useState(null);
    const [listaJogadas, setJogadas] = useState([]);
    const [pecaJogada, setPeca] = useState("");
    const [casaJogada, setCasa]= useState("");
    const [pecaEliminada, setEliminada] = useState("Nenhuma");
    
    const [vencedor, setVencedor] = useState(null);

    // Ajustar a função POST de partida para retornar ID_partida
    useEffect(() => {
        async function buscaJogadores() {
            try {
                const resposta = await GET("http://localhost:3000/nomesUsuarios");
                const { sucesso, mensagem, dados } = resposta;
                if(sucesso){
                    setJogadores(dados);
                } else{
                    setMensagem(mensagem);
                };

            } catch (error) {
                console.error("Erro na listagem de jogadores registrados: ", error.message || error);
                setMensagem("Erro na listagem de jogadores regiatrados.");
            }
        };
        buscaJogadores();

        const pecasXadrez = { Rei: 1, Rainha: 1, Torre: 2, Bispo: 2, Cavalo: 2, Peao: 8 };
        const Partida = { Branco: pecasXadrez, Preto: pecasXadrez };
        setPecas(Partida);
    }, []);

    // Função de seleção de casa de jogada
    function SelecaoCasa(){
        const Letra = document.getElementById("letra").value;
        const Numero = document.getElementById("numero").value;
        Letra && Numero ? setCasa(Letra+Numero) : null;
    }

    async function registraPartida() {
        try {
            timeBranco ? null : () => { setMensagem("Jogador do time branco não selecionado."); return; };
            timePreto ? null : () => { setMensagem("Jogador do time preto não selecionado."); return; };
            const dadosPartida = { pecasBrancas: timeBranco, pecasPretas: timePreto };
            const resposta = await POST("http://localhost:3000/partidas", dadosPartida);
            const { sucesso, mensagem, erro, dados } = resposta;
            if(sucesso){
                const { ID_partida } = dados;
                setPartida(ID_partida);
                setSelecao(true);
                setMensagem(mensagem);
            } else{
                setMensagem(erro);
            };
            
        } catch (error) {
            console.error("Erro no registro de partida no servidor: ", error.message || error);
            setMensagem("Erro no registro de partida no servidor");
        }
    };

    async function registraJogada(timePartida) {
        try {
            pecaJogada ? null : () => {}
            casaJogada ? null : () => {}
            const dadosJogada = {
                timeJogada: timePartida, pecaJogada: pecaJogada, 
                casaJogada: casaJogada, pecaEliminada: pecaEliminada, 
                ID_partida: ID_partida
            }
            const resposta = await POST("http://localhost:3000/jogadas", dadosJogada);
            const { sucesso, mensagem, erro } = resposta;
            if(sucesso){
                setMensagem(mensagem);
            } else{
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

            const resposta = await POST(`http://localhost:3000`, dados);
            const { sucesso, mensagem, erro } = resposta;
            if(sucesso){
                setMensagem(mensagem);
            } else{
                setMensagem(erro);
            }
            
        } catch (error) {
            console.error("Erro na finalização de partida no servidor: ", error.message || error);
            setMensagem("Erro na finalização de partida no servidor.");
        }
    };

    return <>
        {!jogadoresSelecionados ? <form onSubmit={() => {}}>
            {/*Modo de seleção de jogadores provisorio*/}
            <label htmlFor="timeBranco">Peças Brancas</label>
            <select name="timeBranco" id="timeBranco" onChange={(e) => setBranco(e.target.value)} value={timeBranco}>
                <option value={null} disabled>Time Branco</option>
                {listaJogadores.map(p => <option key={p.ID_jogador} value={p.ID_jogador}>{p.nomeUsuario}</option>)}
            </select>

            <label htmlFor="timePreto">Peças Pretas</label>
            <select name="timePreto" id="timePreto" onChange={(e) => {setPreto(e.target.value)}} value={timePreto}>
                <option value={null} disabled>Time Preto</option>
                {(listaJogadores.filter(I => I != timeBranco)).map(b => <option key={b.ID_jogador} value={b.ID_jogador}>{b.nomeUsuario}</option>)}
            </select>
            <button type="submit">Começar partida</button>
        </form> : null}

        {jogadoresSelecionados ? <form onSubmit={() => {}}>
            <label htmlFor="">Peça</label>
            <select name="" id="" onChange={(e) => {setPeca(e.target.value)}} value={pecaJogada}>
                <option value="">Peça</option>
                <option value="Peão">Peão</option>
                <option value="Torre">Torre</option>
                <option value="Cavalo">Cavalo</option>
                <option value="Bispo">Bispo</option>
                <option value="Rainha">Rainha</option>
                <option value="Rei">Rei</option>
            </select>

            <label htmlFor="casaJogada">Casa</label>
            <div id="casaJogada">
                <select name="letra" id="letra" onChange={() => {SelecaoCasa()}} value={(casaJogada.split(''))[0]}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                </select>

                <select name="numero" id="numero" onChange={() => {SelecaoCasa()}} value={(casaJogada.split(''))[1]}>
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
            <select name="" id="" onChange={(e) => {setEliminada(e.target.value)}} value={pecaEliminada}>
                <option value="Nenhuma">Peça</option>
                <option value="Peão">Peão</option>
                <option value="Torre">Torre</option>
                <option value="Cavalo">Cavalo</option>
                <option value="Bispo">Bispo</option>
                <option value="Rainha">Rainha</option>
                <option value="Rei">Rei</option>
                <option value="Nenhuma">Nenhuma</option>
            </select>
            <button type="submit"></button>
        </form> : null}
    </>
}

export default FormPartida;