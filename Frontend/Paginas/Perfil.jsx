import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import ImagemUser from "../Imagens/ImagemUser.png"
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Perfil({ setMensagem, ID_usuario = null }) {
    const [jogador, setJogador] = useState(null);
    const [exibiForm, setExibicao] = useState(false);
    const navigate = useNavigate();
    const { id = null } = useParams();

    useEffect(() => {
        async function buscaUsuario(ID_usuario) {
            try {
                if (!ID_usuario) return <Navigate to={"/ERRO"} />

                const Requisicao = new RequisicaoHTTP(`/usuarios/${ID_usuario}`);
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

        !ID_usuario ? buscaUsuario(id) : buscaUsuario(ID_usuario);

    }, [id, ID_usuario]);

    async function deletaJogador(id) {
        try {
            const confimaDelete = confirm("Deseja prosseguir com a ação de exclusão de jogador?");
            if (confimaDelete) {
                const Requisicao = new RequisicaoHTTP(`/jogadores/${id}`);
                const Resposta = await Requisicao.DELETE();
                const { sucesso, mensagem } = Resposta;
                if (sucesso) {
                    setMensagem(mensagem);

                } else {
                    setMensagem(mensagem);
                    return;
                };
            };

        } catch (error) {
            console.error("Erro na exclusão de jogador no servidor: ", error.message || error);
            setMensagem("Erro na exclusão de jogador no servidor.");
        };
    };
    console.log(jogador)

    // Tratar melhor rederização de perfil de administradore jogador com relação ao atributo tipo usuario
    return (<main className="sm:ml-[60px]">
        {jogador ?
            (<div className="flex flex-col flex-wrap gap-5 justify-center content-center sm:content-center">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-center">
                    <div className="w-45 sm:w-50 mr-auto ml-auto">
                        <PorcentagemJogador imagemJogador={ImagemUser} />
                    </div>
                    <div>
                        <div className="flex flex-col sm:flex-row gap-1 w-auto text-center mb-4">
                            <p>{jogador.nomeUsuario || jogador.usuario.nomeUsuario}</p>
                            <p>{jogador.nicknameJogador ? jogador.nicknameJogador : null}</p>
                            <p>{jogador.emailUsuario || jogador.usuario.emailUsuario}</p>
                        </div>
                        {!jogador?.tipoUsuario || jogador.tipoUsuario === "Jogador" ? (<div className="text-left border rounded p-3 min-w-70">
                            <p className="">Pontuação: {jogador.pontuacaoJogador}</p>
                            <p>Número de Partidas: {jogador.numeroPartidas}</p>
                            <p>Número de Vitorias: {jogador.vitorias}</p>
                            <p>Número de Derrotas: {jogador.derrotas}</p>
                            <p>Número de Empates: {jogador.empates}</p>
                        </div>) : null}
                    </div>
                </div>
                <div className="flex gap-3 justify-center content-center sm:justify-start">
                    <button className="w-20" onClick={() => setExibicao(true)}>Editar</button>
                    <button className="w-20" onClick={() => { deletaJogador(jogador.ID_jogador) }}>Deletar</button>
                </div>
            </div>)
            : null}
    </main>);
}

export default Perfil;