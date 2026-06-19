import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Equipe({ setMensagem }) {
    const [Equipe, setEquipe] = useState({});
    const { id=null } = useParams();
    
    
    useEffect(() => {
        async function buscaEquipe(ID_equipe){
            try {
                if(!ID_equipe) return <Navigate to={"/ERRO"}/>
    
                const Requisicao = new RequisicaoHTTP(`/equipes/${ID_equipe}`);
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

        buscaEquipe(id);

    }, [id]);

    return (<main className="sm:ml-[60px]">
        <h2 className="text-[25px] text-center mb-3">{Equipe.nomeEquipe}</h2>
        <div className="flex flex-col border p-4 rounded-[10px] max-w-120 ml-auto mr-auto">
            
            
        </div>
    </main>)
};

export default Equipe;