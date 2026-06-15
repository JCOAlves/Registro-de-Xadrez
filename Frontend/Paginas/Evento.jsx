import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.jsx";

function Evento({ setMensagem }){
    const [Evento, setEvento] = useState(null);
    const { id=null } = useParams();

    useEffect(() => {
        async function buscaEvento(ID_evento) {
            try {
                if(!ID_evento) return <Navigate to={"/ERRO"}/>

                const Requisicao = new RequisicaoHTTP(`/eventos/${ID_evento}`);
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if(sucesso){
                    setEvento(dados);
                    return;

                } else{
                    setMensagem(mensagem);
                    return;
                };
                
            } catch (error) {
                setMensagem("Erro na busca de dados de evento no servidor")
                console.error("Erro na busca de dados de evento no servidor: ", error.message || error);
            };
        };

        buscaEvento(id);
    }, [id]);

    return (<main className="sm:ml-[60px]">
        <div className="flex flex-col border">
            <h2>{Evento.nomeEvento}</h2>
            <p>Local: {Evento.localEvento}</p>
            <p>Modalidade: {Evento.modalidadeEvento}</p>
            {Evento.decricaoEvento ? <p>{Evento.decricaoEvento}</p> : null}
            <p>Dias: {Evento.dataInicio} - {Evento.dataFim}</p>
            <p>Horário: {Evento.horaInicio} - {Evento.horaFim}</p>
        </div>
    </main>);
}

export default Evento;