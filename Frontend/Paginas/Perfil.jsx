import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Perfil({ setMensagem, dadosUsuario=null }){
    const [jogador, setJogador] = useState(null);
    const [exibiForm, setExibicao] = useState(false);
    const navigate = useNavigate();
    const { id=null } = useParams();

    useEffect(() => {
        async function buscaUsuario(ID_usuario) {
            try {
                if(!ID_usuario) return <Navigate to={"/ERRO"} />

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

        !dadosUsuario ? buscaUsuario(id) : buscaUsuario(dadosUsuario.ID_usuario);

    }, [id, dadosUsuario]);

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
                };
            };

        } catch (error) {
            console.error("Erro na exclusão de jogador no servidor: ", error.message || error);
            setMensagem("Erro na exclusão de jogador no servidor.");
        };
    };

    return (<main className="sm:ml-[60px]">
        {jogador ?
            (<div role="Card como os dados dos jogadores.">
                <div className="flex flex-row flex-wrap gap-5">
                    <div className="w-40">
                        <PorcentagemJogador/>
                    </div>
                    <div className="flex flex-cols w-auto">
                        <p>{jogador.nomeUsuario || jogador.usuario.nomeUsuario}/</p>
                        <p>{jogador.nicknameJogador || null}/</p>
                        <p>{jogador.emailUsuario || jogador.usuario.emailUsuario}</p>
                    </div>
                </div>
                {jogador.usuario.tipoUsuario === "Jogador" ? (<>
                    Pontuação: {jogador.pontuacaoJogador} <br/> 
                    Número de Partidas: {jogador.numeroPartidas} <br />
                    Número de Vitorias: {jogador.vitorias} <br />
                    Número de Derrotas: {jogador.derrotas} <br />
                    Número de Empates: {jogador.empates} <br />
                </>) : null}
                <button onClick={() => setExibicao(true)}>Editar</button>
                <button onClick={() => {deletaJogador(jogador.ID_jogador)}}>Deletar</button>
            </div>)
        : null}
    </main>);
}

export default Perfil;