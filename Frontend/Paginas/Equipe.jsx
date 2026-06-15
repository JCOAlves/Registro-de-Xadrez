import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Equipe({ setMensagem }) {
    const [Equipe, setEquipe] = useState(null);
    const { id=null } = useParams();
    
    
    useEffect(() => {
        async function buscaEquipe(ID_equipe){
            try {
                if(!ID_equipe) return <Navigate to={"/ERRO"}/>
    
                const Requisicao = new RequisicaoHTTP("/eventos");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if(sucesso){
                    setEquipe(dados);
                    return;
    
                } else{
                    setMensagem(mensagem);
                    return;
                };
                
            } catch (error) {
                setMensagem("Erro na busca de dados de equipe no servidor")
                console.error("Erro na busca de dados de equipe no servidor: ", error.message || error);
            };
        };

        buscaEquipe();

    }, [id]);

    return <h1>Equipe por ID</h1>
};

export default Equipe;