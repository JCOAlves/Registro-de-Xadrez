import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { GET, DELETE } from "../FuncoesJS/MetodosHTTP.js";
import "../style/Jogadores.css";

function Jogadores({ setMensagem }) {
    const [jogadores, setJogadores] = useState([]);
    const [quantidade, setQuantidade] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscaJogadores() {
            try {
                const resposta = await GET("http://localhost:3000/jogadores");
                const { sucesso, mensagem, quantidade, dados } = resposta;
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

    function PronomesJogador(generoJogador) {
        switch (generoJogador) {
            case "Masculino":
                return "ele/dele";
            case "Feminino":
                return "ela/dela";
            case "Não-Binario":
                return "elu/delu";
            default:
                return null
        }
    }

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
    const { id } = useParams();
    id ? null : () => { return <Navigate to={"/ERRO"} /> };

    useEffect(() => {
        async function buscaJogador() {
            try {
                const resposta = await GET(`http://localhost:3000/jogadores/${id}`);
                const { sucesso, mensagem, dados } = resposta;
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

    return (<main>
        {jogador ?
            (<div>
                {jogador.nomeUsuario} - {jogador.nomeJogador} - {jogador.generoJogador} <br />
                Número de Partidas: {jogador.numeroPartidas} <br />
                Número de Vitorias: {jogador.numeroVitorias} <br />
                Número de Derrotas: {jogador.numeroDerrotas} <br />
                Número de Empates: {jogador.numeroEmpates} <br />
            </div>)
            : "Olá mundo"}
    </main>);
}

export { Jogadores, Jogador };