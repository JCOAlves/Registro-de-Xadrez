import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";


function Jogada({setMensagem}){
    const [jogada, setJogada] = useState(null);
    const { id } = useParams();
    id ? null : () => { return <Navigate to={"/ERRO"}/> }

    useEffect(() => {
        async function buscaJogada() {
            try {
                const Requisicao = new RequisicaoHTTP(`http://localhost:3000/jogadas/${id}`);
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if(sucesso){
                    const [Jogada_] = dados;
                    setJogada(Jogada_);
                } else{
                    setMensagem(mensagem);
                }
                
            } catch (error) {
                console.error("Erro na busca de dados de jogada especifica no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogada especifica no servidor.");
            }
        };

        buscaJogada();
    }, []);

    return (<main>
        <h1>{jogada ? jogada.ID_jogada : "ERRv"}</h1>
    </main>);
}

export default Jogada;