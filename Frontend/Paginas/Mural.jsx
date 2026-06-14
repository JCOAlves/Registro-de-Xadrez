import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";
import "../style/Jogadores.css";

function Mural({ setMensagem, tipoUsuario="Administrador" }) {
    const [jogadores, setJogadores] = useState([[], []]);
    const [equipes, setEquipes] = useState([[], []]);
    const [eventos, setEventos] = useState([[], []]);
    const [tipoDados, setTipo] = useState("Todos");
    const [quantidade, setQuantidade] = useState(0);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        async function buscaDados() {
            try {
                const Requisicao = new RequisicaoHTTP("/usuarios?tipoUsuario=Jogador");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setJogadores([dados, dados]);
                    setQuantidade(quantidade);
                    return;

                } else {
                    setMensagem(mensagem);
                    return;
                }

            } catch (error) {
                console.error("Erro na busca de dados de jogadores no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogadores no servidor.");
            };
        };

        buscaDados();
    }, []);


    useEffect(() => {
        async function Pesquisa(pesquisa, tipoDados){
            try {
                if(!pesquisa){
                    setJogadores([jogadores[0], jogadores[0]]);
                    return;
                };

                const Requisicao = new RequisicaoHTTP(`/usuarios?tipoUsuario=Jogador&&filtro=${encodeURIComponent(pesquisa)}`);
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setJogadores([jogadores[0], dados]);
                    setQuantidade(quantidade);
                    return;

                } else {
                    setJogadores([jogadores[0], dados]);
                    setQuantidade(quantidade);
                    return;
                };
                
            } catch (error) {
                console.error("Erro na filtragem de dados de jogadores no servidor: ", error.message || error);
                setMensagem("Erro na filtragem de dados de jogadores no servidor.");
            };
        };

        Pesquisa(pesquisa);

    }, [pesquisa]);

    return (<main className="sm:ml-[60px]">
        <div className="flex">
            <input type="seach" value={pesquisa} onInput={(e) => { setPesquisa(e.target.value) }} placeholder="Pesquise por usuários jogadores" minLength={1} className="pt-3 mb-3 mr-5 w-70"/>
            <div className="flex gap-3 h-10">
                <button>Jogadores</button>
                <button>Equipes</button>
                <button>Eventos</button>
            </div>
        </div>
        Número jogadores: {jogadores[1].length}
        {jogadores[1].length > 0 ? <div role="Caixa de cards dos jogadores." className="flex flex-row flex-wrap gap-4 w-full pt-2">
            {jogadores[1].map(jog =>
                <div className="flex flex-row flex-wrap text-center justify-center content-center gap-2 rounded-[30px] bg-blue-100 p-[16px_10px] w-40 h-50" key={jog.ID_jogador} role="Card de jogadores">
                    <Link to={`/usuarios/${jog.ID_jogador}`} className="text-center justify-center content-center">
                        <PorcentagemJogador vitorias={jog.vitorias} empates={jog.empates} derrotas={jog.derrotas} />
                    </Link>
                    <Link to={`/usuarios/${jog.ID_jogador}`} className="text-center justify-center content-center">{jog.nicknameJogador}</Link>
                </div>
            )}</div> : <p className="mt-30">Usuário não encontrado</p>}
    </main>);
}

export default Mural;