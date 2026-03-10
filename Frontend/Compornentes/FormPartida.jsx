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
    const [pecaEliminada, setEliminada] = useState("");

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

    async function registraPartida() {
        try {
            timeBranco ? null : () => { setMensagem("Jogador do time branco não selecionado."); return; };
            timePreto ? null : () => { setMensagem("Jogador do time preto não selecionado."); return; };
            const dadosPartida = { pecasBrancas: timeBranco, pecasPretas: timePreto };
            const resposta = await POST("", dadosPartida);
            const { sucesso, mensagem, erro } = resposta;
            if(sucesso){
                setMensagem(mensagem);
            } else{
                setMensagem(erro);
            };
            
        } catch (error) {
            console.error("Erro no registro de partida no servidor: ", error.message || error);
            setMensagem("Erro no registro de partida no servidor");
        }
    };

    async function registraJogada() {
        try {
            pecaJogada ? null : () => {}
            casaJogada ? null : () => {}

            setSelecao(true);
        } catch (error) {
            console.error("", error.message || error);
            setMensagem("");
        }
    };

    async function finalizaPartida() {
        try {
            
        } catch (error) {
            
        }
    };

    return <>
        {!jogadoresSelecionados ? <form onSubmit={() => {}}>
            {/*Modo de seleção de jogadores provisorio*/}
            <label htmlFor="timeBranco">Peças Brancas</label>
            <select name="timeBranco" id="timeBranco">
                <option value={timeBranco} disabled>Time Branco</option>
                {listaJogadores.map(p => <option key={p.ID_jogador} value={p.ID_jogador}>{p.nomeUsuario}</option>)}
            </select>

            <label htmlFor="timePreto">Peças Pretas</label>
            <select name="timePreto" id="timePreto">
                <option value={timePreto} disabled>Time Preto</option>
                {(listaJogadores.filter(I => I != timeBranco)).map(b => <option key={b.ID_jogador} value={b.ID_jogador}>{b.nomeUsuario}</option>)}
            </select>
            <button type="submit">Começar partida</button>
        </form> : null}

        {jogadoresSelecionados ? <form onSubmit={() => {}}>
            <label htmlFor=""></label>
            <select name="" id="">
                <option value=""></option>
            </select>

            <label htmlFor=""></label>
            <div>
                <select name="" id="">
                    <option value=""></option>
                </select>

                <select name="" id="">
                    <option value=""></option>
                </select>
            </div>

            <label htmlFor=""></label>
            <select name="" id="">
                <option value=""></option>
            </select>
        </form> : null}
    </>
}

export default FormPartida;