import connectionDB from "../Config/db.js";
import Jogador from "../Models/Jogador.js";
import Equipe, { Equipe_Jogador } from "../Models/Equipe.js";
import Partida from "../Models/Partida.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Funções CRUD de jogadores

const listaJogadores = async (req, res) => {
    try {
        const listaJogadores = await Jogador.findAll();
        if (listaJogadores.length > 0) {
            const Resposta = new RespostaHTTP(true, "Jogadores listados com sucesso", null, listaJogadores);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else {
            const Resposta = new RespostaHTTP(false, "Não há jogadores registrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de jogadores", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const lista_nickNames = async (req, res) => {
    try {
        const nomesUsuarios = await Jogador.findAll({ attributes: ['ID_jogador', 'nicknameJogador', 'ID_usuario'] })

        if(nomesUsuarios.length > 0){
            const Resposta = new RespostaHTTP(true, "Nomes de usuário de jogadores listados com sucesso", null, nomesUsuarios);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogadores registrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de nomes de usuários (nicknames)", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaJogadorID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        let Jogador_ID = await Jogador.findByPk(id);
        if (!Jogador_ID) {
            const Resposta = new RespostaHTTP(false, "Não foi encontrado nenhum jogador relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        } 
        
        // Fazer listagem de número de partidas, vitorias, derrotas e empates
        let numeroPartidas = 0;
        let vitorias = 0;
        let derrotas = 0;
        let empates = 0;
        const Partidas_jogador = await Partida.findAll();

        if(Partidas_jogador.length > 0){
            Partidas_jogador.forEach(part => {
                const { timeBranco, timePreto, vencedor } = part;
                timeBranco === id || timePreto === id ? numeroPartidas+=1 : null;
                switch(vencedor){
                    case "Time Branco":
                        timeBranco === id ? vitorias+=1 : derrotas+=1;
                        break;
                    case "Time Preto":
                        timePreto === id ? vitorias+=1 : derrotas+=1;
                        break;
                    case "Empate":
                        empates+=1;
                        break;
                };
            });
        }

        // Adicionar número de partidas, derrotas, vitorias e empates
        Jogador_ID.dataValues.numeroPartidas = numeroPartidas;
        Jogador_ID.dataValues.vitorias = vitorias;
        Jogador_ID.dataValues.derrotas = derrotas;
        Jogador_ID.dataValues.empates = empates;

        const Resposta = new RespostaHTTP(true, "Listagem de jogador por ID feita com sucesso", null, Jogador_ID);
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta('returnDado'));

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de jogador por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaRanking_Jogadores = async (req, res) => {
    try {
        const rankingJogadores = await Jogador.findAll({ order: [['pontuacaoJogador', 'DESC']] });
        if(rankingJogadores.length > 0){
            const Resposta = new RespostaHTTP(true, "Ranking de jogadores listado com sucesso", null, rankingJogadores);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogadores cadastrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ranking de jogadores", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const adicionaJogador_Equipe = async (req, res) => {
    try {
        const { ID_jogador, ID_equipe } = req.body;

        if(!ID_jogador){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de jogador ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!ID_equipe){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de evento ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(ID_jogador);
        if(!Jogador_ID){
            const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(ID_equipe);
        if(!Equipe_ID){
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const jogador_equipe = await Equipe_Jogador.create({ ID_jogador: ID_jogador, ID_equipe: ID_equipe });
        if(jogador_equipe){
            const Resposta = new RespostaHTTP(true, "Jogador adicionado a equipe com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na adição de jogador de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const removeJogador_Equipe = async (req, res) => {
    try {
        const { removeJogador=true } = req.body;
        const { ID_jogador, ID_equipe } = req.params;

        if(!ID_jogador){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de jogador ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!ID_equipe){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de evento ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(ID_jogador);
        if(!Jogador_ID){
            const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(ID_equipe);
        if(!Equipe_ID){
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        if(removeJogador){
            await Equipe_Jogador.destroy({ where: { ID_equipe: ID_equipe, ID_jogador: ID_jogador } });

            const Resposta = new RespostaHTTP(true, "Jogador removido da equipe com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }

        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na remoção de jogador de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaJogadores, lista_nickNames, listaJogadorID, listaRanking_Jogadores };