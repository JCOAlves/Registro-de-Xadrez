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
                }

            } catch (error) {
                console.error("Erro na busca de dados de jogadores no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogadores no servidor.");
            };
        };

        buscaJogadores();
    }, []);

    return (<main>
        <span>{quantidade}</span>
        <ol>
            {jogadores.length != 0 ? jogadores.map(jog => <li key={jog.ID_jogador}>{jog.nomeUsuario}</li>) : null}
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
                }
                
            } catch (error) {
                console.error("Erro na busca de dados de jogador por ID no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogador por ID no servidor.");
            };
        };

        buscaJogador();
    }, [id]);

    return (<main>
        <h1>{jogador ? jogador.nomeUsuario : "Olá mundo"}</h1>
    </main>);
}

export { Jogadores, Jogador };