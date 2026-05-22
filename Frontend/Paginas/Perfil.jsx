import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import FormJogador from "../Compornentes/FormJogador.jsx"
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Perfil({ setMensagem, dadosUsuario }){
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

export default Perfil;