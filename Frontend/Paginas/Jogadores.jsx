import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import FormJogador from "../Compornentes/FormJogador.jsx"
import RequisicaoHTTP from "../hook/RequisicaoHTTP.js";
import { PronomesJogador } from "../FuncoesJS/FormatacaoDados.js"
import "../style/Jogadores.css";

function Jogadores({ setMensagem }) {
    const [jogadores, setJogadores] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscaJogadores() {
            try {
                const Requisicao = new RequisicaoHTTP("http://localhost:3000/jogadores");
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
        <h2>Quantidade de jogadores registrados: {quantidade}</h2>
        <br />

        {jogadores.length != 0 ? <div role="Caixa de cards dos jogadores." className="caixaCards">
            {jogadores.map(jog =>
                <div className="cardJogador" key={jog.ID_jogador}>
                    {jog.nomeUsuario} - {PronomesJogador(jog.generoJogador)} <br />
                    <button onClick={() => navigate(`/jogadores/${jog.ID_jogador}`)}>Ver perfil</button>
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
                const Requisicao = new RequisicaoHTTP(`http://localhost:3000/jogadores/${id}`);
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, dados } = Resposta;
                if (sucesso) {
                    const [dadosJogador] = dados;
                    setJogador(dadosJogador);
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
                const Requisicao = new RequisicaoHTTP(`http://localhost:3000/jogadores/${id}`);
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
                {jogador.nomeUsuario} - {jogador.nomeJogador} - {jogador.generoJogador} <br />
                Número de Partidas: {jogador.numeroPartidas} <br />
                Número de Vitorias: {jogador.numeroVitorias} <br />
                Número de Derrotas: {jogador.numeroDerrotas} <br />
                Número de Empates: {jogador.numeroEmpates} <br />
                <button onClick={() => setExibicao(true)}>Editar</button>
                <button onClick={() => {deletaJogador(jogador.ID_jogador)}}>Deletar</button>
            </div>)
            : null}
    </main>);
}

export { Jogadores, Jogador };