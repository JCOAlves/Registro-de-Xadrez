import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../FuncoesJS/MetodosHTTP.js";

function Jogadores({setMensagem}){
    const [jogadores, setJogadores] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        async () => {
            try {
                const resposta = await GET("");
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

    }, [jogadores]);

    return (<main>
        <span>{quantidade}</span>
        <li>
            {jogadores.length != 0 ? jogadores.map(jog => {<ol key={jog.ID_jogador}>{jog.nomeJogador || jog.nomeUsuario}</ol>}) : "nada"}
        </li>
    </main>);
}

function Jogador({setMensagem}) {
    const [jogador, setJogador] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async () => {
            try {
                const resposta = await GET(`/${id}`);
                const { sucesso, mensagem, dados } = resposta;
                if(sucesso){
                    setMensagem(mensagem);
                    setJogador(dados);
                } else{
                    setMensagem(mensagem);
                }
                
            } catch (error) {
                console.error("Erro na busca de dados de jogador por ID no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogador por ID no servidor.");
            };
        };

    }, [id]);

    return (<main>
        <h1>{jogador ? jogador.nomeJogador : "Olá mundo"}</h1>
    </main>);
}

export { Jogadores, Jogador };