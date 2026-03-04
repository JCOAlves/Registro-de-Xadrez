import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { GET } from "../FuncoesJS/MetodosHTTP.js";

function Jogadores({setMensagem}){
    const [jogadores, setJogadores] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        async function buscaJogadores(){
            try {
                const resposta = await GET("http://localhost:3000/jogadores");
                const { sucesso, mensagem, quantidade, dados } = resposta;
                if(sucesso){
                    setMensagem(mensagem);
                    setJogadores(dados);
                    setQuantidade(quantidade)
                } else{
                    setMensagem(mensagem);
                    return;
                }

            } catch (error) {
                console.error("Erro na busca de dados de jogadores no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogadores no servidor.");
            };
        };

        buscaJogadores();
    }, []);

    return (<main>
        <h2>Quantidade de jogadores registrados: {quantidade}</h2>
            <br/>
        <ol>
            {jogadores.length != 0 ? jogadores.map(jog => <li key={jog.ID_jogador}>{jog.nomeUsuario} - {jog.nomeJogador}</li>) : null}
        </ol>
    </main>);
}


function Jogador({setMensagem}) {
    const [jogador, setJogador] = useState(null);
    const { id } = useParams();
    id ? null : () => { return <Navigate to={"/ERRO"}/> };

    useEffect(() => {
        async function buscaJogador(){
            try {
                const resposta = await GET(`http://localhost:3000/jogadores/${id}`);
                const { sucesso, mensagem, dados } = resposta;
                if(sucesso){
                    setMensagem(mensagem);
                    const [dadosJogador] = dados;
                    setJogador(dadosJogador);
                } else{
                    setMensagem(mensagem);
                    return;
                }
                
            } catch (error) {
                console.error("Erro na busca de dados de jogador por ID no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogador por ID no servidor.");
            };
        };

        buscaJogador();
    }, [id]);

    return (<main>
        {jogador ? 
            (<div>
                {jogador.nomeUsuario} - {jogador.nomeJogador} - {jogador.generoJogador} <br/>
                Número de Partidas: {jogador.numeroPartidas} <br/>
                Número de Vitorias: {jogador.numeroVitorias} <br/>
                Número de Derrotas: {jogador.numeroDerrotas} <br/>
                Número de Empates: {jogador.numeroEmpates} <br/>
            </div>) 
            : "Olá mundo"}
    </main>);
}

export { Jogadores, Jogador };