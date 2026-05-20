import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import FormJogador from "../Compornentes/FormJogador.jsx"
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";
import "../style/Jogadores.css";

function Jogadores({ setMensagem }) {
    const [jogadores, setJogadores] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscaJogadores() {
            try {
                const Requisicao = new RequisicaoHTTP("/usuarios?tipoUsuario=Jogador");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setJogadores(dados);
                    setQuantidade(quantidade) 
                } else {
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
        {jogadores.length != 0 ? <div role="Caixa de cards dos jogadores." className="flex flex-row flex-wrap w-35">
            {jogadores.map(jog =>
                <div className="flex flex-row flex-wrap text-center justify-center content-center gap-2 rounded-[30px] bg-pink-200 p-[18px_12px] w-40" key={jog.ID_jogador}>
                    <Link to={`/jogadores/${jog.ID_jogador}`} className="text-center justify-center content-center">
                        <PorcentagemJogador vitorias={40} derrotas={30} empates={30}/>
                    </Link>
                    <Link to={`/jogadores/${jog.ID_jogador}`} className="text-center justify-center content-center">{jog.nicknameJogador}</Link>
                </div>
            )}</div> : null}
    </main>);
}


function Jogador({ setMensagem }) {
    const [jogador, setJogador] = useState(null);
    const [exibiForm, setExibicao] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    id ? null : () => { return <Navigate to={"/ERRO"} /> };

    useEffect(() => {
        async function buscaJogador() {
            try {
                const Requisicao = new RequisicaoHTTP(`/jogadores/${id}`);
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if (sucesso) {
                    setJogador(dados);
                } else {
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

    async function deletaJogador(id) {
        try {
            const confimaDelete = confirm("Deseja prosseguir com a ação de exclusão de jogador?");
            if(confimaDelete){
                const Requisicao = new RequisicaoHTTP(`/jogadores/${id}`);
                const Resposta = await Requisicao.DELETE();
                const { sucesso, mensagem } = Resposta;
                if(sucesso){
                    setMensagem(mensagem);
                } else{
                    setMensagem(mensagem);
                    return;
                }
            };

        } catch (error) {
            console.error("Erro na exclusão de jogador no servidor: ", error.message || error);
            setMensagem("Erro na exclusão de jogador no servidor.");
        }
    }

    return (<main>
        {exibiForm ?
            <div role="Formulario de edição de jogador." className="formEdit">
                <FormJogador editarJogador={true} dadosJogador={jogador} setMensagem={setMensagem} exibiForm={setExibicao}/> 
            </div>
            : null}

        {jogador ?
            (<div role="Card como os dados dos jogadores.">
                {jogador.usuario.nomeUsuario} - {jogador.nicknameJogador} - {jogador.usuario.emailUsuario}<br />
                Pontuação: {jogador.pontuacaoJogador} <br/> 
                Número de Partidas: {jogador.numeroPartidas} <br />
                Número de Vitorias: {jogador.vitorias} <br />
                Número de Derrotas: {jogador.derrotas} <br />
                Número de Empates: {jogador.empates} <br />
                <button onClick={() => setExibicao(true)}>Editar</button>
                <button onClick={() => {deletaJogador(jogador.ID_jogador)}}>Deletar</button>
            </div>)
            : null}
    </main>);
}

export { Jogadores, Jogador };