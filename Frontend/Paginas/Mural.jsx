import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams, useNavigate } from "react-router-dom";
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";
import "../style/Jogadores.css";

function Mural({ setMensagem, tipoUsuario = "Administrador" }) {
    const [jogadores, setJogadores] = useState([[], []]);
    const [equipes, setEquipes] = useState([[], []]);
    const [eventos, setEventos] = useState([[], []]);
    const [pesquisa, setPesquisa] = useState("");
    const [dados, setDados] = useState(<></>);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function buscaDados_Usuarios() {
            try {
                const Requisicao = new RequisicaoHTTP("/usuarios?tipoUsuario=Jogador");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setJogadores([dados, dados]);
                    return;

                } else {
                    setMensagem(mensagem);
                    return;
                }

            } catch (error) {
                console.error("Erro na busca de dados de jogadores no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de jogadores no servidor");
            };
        };

        async function buscaDados_Equipes() {
            try {
                const Requisicao = new RequisicaoHTTP("/equipes");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setEquipes([dados, dados]);
                    return;

                } else {
                    setMensagem(mensagem);
                    return;
                }

            } catch (error) {
                console.error("Erro na busca de dados de equipes no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de equipes no servidor");
            };
        }

        async function buscaDados_Eventos() {
            try {
                const Requisicao = new RequisicaoHTTP("/eventos");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setEventos([dados, dados]);
                    return;

                } else {
                    setMensagem(mensagem);
                    return;
                }

            } catch (error) {
                console.error("Erro na busca de dados de eventos no servidor: ", error.message || error);
                setMensagem("Erro na busca de dados de eventos no servidor.");
            };
        }

        buscaDados_Usuarios();
        //buscaDados_Equipes();
        buscaDados_Eventos();

    }, []);


    useEffect(() => {
        async function Pesquisa(pesquisa, tipoDados) {
            try {
                if (!pesquisa) {
                    setJogadores([jogadores[0], jogadores[0]]);
                    return;
                };

                let URLrequisicao = "";
                switch(tipoDados){
                    case "Jogadores":
                        URLrequisicao = `/usuarios?tipoUsuario=Jogador&&filtro=${encodeURIComponent(pesquisa)}`;
                        break;
                    case "Equipes":
                        URLrequisicao = `/equipes`;
                        break;
                    case "Eventos":
                        URLrequisicao = `/eventos`;
                        break;
                    default:
                        URLrequisicao = `/usuarios?tipoUsuario=Jogador&&filtro=${encodeURIComponent(pesquisa)}`;
                        break;
                }

                const Requisicao = new RequisicaoHTTP(URLrequisicao);
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
            <input type="search" value={pesquisa} onInput={(e) => { setPesquisa(e.target.value) }} 
                placeholder="Pesquise" minLength={1} className="pt-3 mb-3 mr-5 w-70" /> 
            
            <div className="flex gap-3 h-10">
                <button onClick={() => { !searchParams.get('tipoDados') ? setSearchParams({ tipoDados: "Jogadores" }) : setSearchParams({}) }} 
                    className={`${searchParams.get("tipoDados") === "Jogadores" ? "bg-blue-300" : ""}`}>Jogadores</button>
                <button onClick={() => { !searchParams.get('tipoDados') ? setSearchParams({ tipoDados: "Equipes" }) : setSearchParams({}) }} 
                    className={`${searchParams.get("tipoDados") === "Equipes" ? "bg-blue-300" : ""}`}>Equipes</button>
                <button onClick={() => { !searchParams.get('tipoDados') ? setSearchParams({ tipoDados: "Eventos" }) : setSearchParams({}) }} 
                    className={`${searchParams.get("tipoDados") === "Eventos" ? "bg-blue-300" : ""}`}>Eventos</button>
            </div>
        </div>

        {searchParams.get('tipoDados') === "Jogadores" ? <>
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
        </> : null}

        {searchParams.get('tipoDados') === "Equipes" ? <>
            Número eventos: {equipes[1].length}
            {equipes[1].length > 0 ? <div className="flex flex-row flex-wrap gap-4 w-full pt-2">
                {equipes[1].map(jog =>
                    <div className="" key={jog.ID_evento} role="Card de eventos">
                        {jog.nomeEvento}
                    </div>
                )}</div> : <p className="mt-30">Equipe não encontrada</p>}
        </> : null}

        {searchParams.get('tipoDados') === "Eventos" ? <>
            Número eventos: {eventos[1].length}
            {eventos[1].length > 0 ? <div className="flex flex-row flex-wrap gap-4 w-full pt-2">
                {eventos[1].map(jog =>
                    <div className="" key={jog.ID_evento} role="Card de eventos">
                        <Link to={`/eventos/${jog.ID_evento}`}>{jog.nomeEvento}</Link>
                    </div>
                )}</div> : <p className="mt-30">Evento não encontrado</p>}
        </> : null}

        {!searchParams.get('tipoDados') ? <div className="flex flex-col gap-5">
            <div>
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
            </div>
            <div>
                Número Equipes: {equipes[1].length}
                {equipes[1].length > 0 ? <div className="flex flex-row flex-wrap gap-4 w-full pt-2">
                    {equipes[1].map(jog =>
                        <div className="" key={jog.ID_evento} role="Card de eventos">
                            {jog.nomeEvento}
                        </div>
                    )}</div> : <p className="mt-30">Equipe não encontrada</p>}
            </div>
            <div>
                Número eventos: {eventos[1].length}
                {eventos[1].length > 0 ? <div className="flex flex-row flex-wrap gap-4 w-full pt-2">
                    {eventos[1].map(jog =>
                        <div className="" key={jog.ID_evento} role="Card de eventos">
                            <Link to={`/eventos/${jog.ID_evento}`}>{jog.nomeEvento}</Link>
                        </div>
                    )}</div> : <p className="mt-30">Evento não encontrado</p>}
            </div>
        </div> : null}

    </main>);
}

export default Mural;