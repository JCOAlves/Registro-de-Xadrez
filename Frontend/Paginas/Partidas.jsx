import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { GET } from "../FuncoesJS/MetodosHTTP.js";

function Partidas({setMensagem}){
    const [partidas, setPartidas] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        async function buscaPartidas() {
            try {
                const resposta = await GET("http://localhost:3000/partidas");
                const { sucesso, mensagem, quantidade, dados } = resposta;
                if(sucesso){
                    setQuantidade(quantidade);
                    setPartidas(dados);
                } else{
                    setMensagem(mensagem);
                    return;
                }

            } catch (error) {
                console.error("Erro na busca de dados de partidas no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de partidas no servidor.");
            }
        };

        buscaPartidas();
    }, []);

    return (<main>
        <h2>Quantidade de partidas: {quantidade}</h2>
            <br/>
        {partidas.length != 0 ? 
        partidas.map(part => (<div key={part.ID_partida}>
            {new Date(part.dataPartida).toLocaleDateString('pt-BR')}  {part.horaInicio} - {part.horaFinal}
            </div>)) 
        : null}
    </main>);
}

function Partida({setMensagem}){
    const [partida, setPartida] = useState(null);
    const [jogadas, setJogadas] = useState([]);
    const [quantidadeJogadas, setQuantidade] = useState(0);
    const { id } = useParams();
    id ? null : () => { return <Navigate to={"/ERRO"}/> };

    useEffect(() => {
        async function buscaPartida() {
            try {
                const respostaPartida = await GET(`http://localhost:3000/partidas/${id}`);
                if(respostaPartida.sucesso){
                    const [Partida] = respostaPartida.dados;
                    setPartida(Partida);
                } else{ 
                    setMensagem(respostaPartida.mensagem);
                    return;
                }
    
                const respostaJogadas = await GET(`http://localhost:3000/jogadas/partida/${id}`);
                if(respostaJogadas.sucesso){
                    setQuantidade(respostaJogadas.quantidade);
                    setJogadas(respostaJogadas.dados);
                } else{
                    setMensagem(respostaJogadas.mensagem);
                    return;
                }
                
            } catch (error) {
                console.error("Erro na busca de dados e partida e jogadas da partida no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados e partida e jogadas da partida no servidor.")
            }
        }

        buscaPartida();
    }, []);

    return (<main>
        <h2>Quantida de jogadas: {quantidadeJogadas}</h2>
        <ol>
            {jogadas.length != 0 ? (jogadas.map(jg => <li key={jg.ID_jogada}>{jg.casaJogada}</li>)) : null }
        </ol>
    </main>);
}

export { Partidas, Partida }