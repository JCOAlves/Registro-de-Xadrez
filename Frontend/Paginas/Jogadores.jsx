import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FormJogador from "../Compornentes/FormJogador.jsx"
import PorcentagemJogador from "../Compornentes/PorcentagenJogador.jsx";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";
import "../style/Jogadores.css";

function Jogadores({ setMensagem }) {
    const [jogadores, setJogadores] = useState([]);
    const [listaSalva, setSalva] = useState([]); // Salva os dados de jogadores para pesquisa
    const [quantidade, setQuantidade] = useState(0);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        async function buscaJogadores() {
            try {
                const Requisicao = new RequisicaoHTTP("/usuarios?tipoUsuario=Jogador");
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setJogadores(dados);
                    setSalva(dados);
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

        buscaJogadores();
    }, []);

    // Fututramente adicionar consulta direto no Backend com endpoint
    useEffect(() => {
        function Pesquisa(pesquisa){
            try {
                if(!pesquisa){
                    setJogadores(listaSalva);
                    return;
                };

                const Requisicao = new RequisicaoHTTP(`/usuarios?tipoUsuario=Jogador&&filtro=${pesquisa}`);
                const Resposta = await Requisicao.GET();
                const { sucesso, mensagem, quantidade, dados } = Resposta;
                if (sucesso) {
                    setJogadores(dados);
                    setQuantidade(quantidade);
                    return;

                } else {
                    setMensagem(mensagem);
                    return;
                };
            
                
            } catch (error) {
                console.error("Erro na filtragem de dados de jogadores no servidor: ", error.message || error);
                setMensagem("Erro na filtragem de dados de jogadores no servidor.");
            };
        };

        Pesquisa(pesquisa);

    }, [pesquisa]);

    return (<main>
        <input type="seach" value={pesquisa} onInput={(e) => { setPesquisa(e.target.value) }} placeholder="Pesquise por usuários jogadores" minLength={1} className="pt-3 w-70"/>
        Número jogadores: {quantidade}
        {jogadores.length != 0 ? <div role="Caixa de cards dos jogadores." className="flex flex-row flex-wrap gap-4 w-full pt-2">
            {jogadores.map(jog =>
                <div className="flex flex-row flex-wrap text-center justify-center content-center gap-2 rounded-[30px] bg-pink-200 p-[16px_10px] w-40" key={jog.ID_jogador} role="Card de jogadores">
                    <Link to={`/usuarios/${jog.ID_jogador}`} className="text-center justify-center content-center">
                        <PorcentagemJogador vitorias={jog.vitorias} empates={jog.empates} derrotas={jog.derrotas} />
                    </Link>
                    <Link to={`/usuarios/${jog.ID_jogador}`} className="text-center justify-center content-center">{jog.nicknameJogador}</Link>
                </div>
            )}</div> : null}
    </main>);
}

export default Jogadores;