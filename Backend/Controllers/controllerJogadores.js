import connectionDB from "../Config/db.js";
import Usuario from "../Models/Usuario.js";
import Jogador from "../Models/Jogador.js";
import Equipe, { Equipe_Jogador } from "../Models/Equipe.js";
import Partida from "../Models/Partida.js";
import { Jogadores_Evento } from "../Models/Evento.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

// Funções CRUD de jogadores

const lista_nickNames = async (req, res) => {
    try {
        const nomesUsuarios = await Jogador.findAll({ attributes: ['ID_jogador', 'nicknameJogador', 'ID_usuario'] });
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

        let Jogador_ID = await Jogador.findByPk(id, { include: { model: Usuario, attributes: ['nomeUsuario', 'emailUsuario'] } });
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
        Partidas_jogador.forEach(part => {
            const { timeBranco, timePreto, vencedor } = part;
            if(timeBranco === id || timePreto === id){
                numeroPartidas+=1;
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
            };
        });

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
        const { tipoListagem='pontuacao' } = req.query;

        if(!['pontuacao', 'vitorias', 'derrotas', 'empates', 'numeroPartidas'].includes(tipoListagem)){
            const Resposta = new RespostaHTTP(false, "Tipo de listagem de ranking fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        let mensagemResposta = '';
        let rankingJogadores = await await Jogador.findAll({ order: [['pontuacaoJogador', 'DESC']], include: { model: Usuario, attributes: ['nomeUsuario', 'emailUsuario'] } });
        const Partidas_jogador = await Partida.findAll();
        
        rankingJogadores.forEach(jog => {
            let numeroPartidas = 0;
            let vitorias = 0;
            let derrotas = 0;
            let empates = 0;
    
            Partidas_jogador.forEach(part => {
                const { timeBranco, timePreto, vencedor } = part;
                if(timeBranco === jog.ID_jogador || timePreto === jog.ID_jogador){
                    numeroPartidas+=1;
                    switch(vencedor){
                        case "Time Branco":
                            timeBranco === jog.ID_jogador ? vitorias+=1 : derrotas+=1;
                            break;
                        case "Time Preto":
                            timePreto === jog.ID_jogador ? vitorias+=1 : derrotas+=1;
                            break;
                        case "Empate":
                            empates+=1;
                            break;
                    };
                };
            });

            // Adicionar número de partidas, derrotas, vitorias e empates
            jog.dataValues.numeroPartidas = numeroPartidas;
            jog.dataValues.vitorias = vitorias;
            jog.dataValues.derrotas = derrotas;
            jog.dataValues.empates = empates;
        });
        
        if(rankingJogadores.length > 0){
            switch(tipoListagem){
                case 'pontuacao':
                    mensagemResposta = "Ranking de jogadores por pontuação listado com sucesso";
                    break;
    
                case 'vitorias':
                    rankingJogadores.sort((a, b) => b.dataValues.vitorias - a.dataValues.vitorias);
                    mensagemResposta = "Ranking de jogadores por vitorias listado com sucesso";
                    break;
    
                case 'derrotas':
                    rankingJogadores.sort((a, b) => a.dataValues.derrotas - b.dataValues.derrotas);
                    mensagemResposta = "Ranking de jogadores por derrotas listado com sucesso";
                    break;
    
                case 'empates':
                    rankingJogadores.sort((a, b) => a.dataValues.empates - b.dataValues.empates);
                    mensagemResposta = "Ranking de jogadores por empates listado com sucesso";
                    break;
    
                case 'numeroPartidas':
                    rankingJogadores.sort((a, b) => b.dataValues.numeroPartidas - a.dataValues.numeroPartidas);
                    mensagemResposta = "Ranking de jogadores por número de partidas listado com sucesso";
                    break;
            };

            const Resposta = new RespostaHTTP(true, mensagemResposta, null, rankingJogadores);
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
        const { jogador, equipe } = req.query;

        if(!jogador && !equipe){
            const Resposta = new RespostaHTTP(false, "IDs de jogador e equipe não foram fornecidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!jogador){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de jogador ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!equipe){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de evento ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(jogador);
        if(!Jogador_ID){
            const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(equipe);
        if(!Equipe_ID){
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const jogador_equipe = await Equipe_Jogador.create({ ID_jogador: jogador, ID_equipe: equipe });
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
        const { jogador, equipe } = req.query;

        if(!jogador && !equipe){
            const Resposta = new RespostaHTTP(false, "IDs de jogador e equipe não foram fornecidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!jogador){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de jogador ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!equipe){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de evento ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(jogador);
        if(!Jogador_ID){
            const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(equipe);
        if(!Equipe_ID){
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        await Equipe_Jogador.destroy({ where: { ID_equipe: equipe, ID_jogador: jogador } });

        const Resposta = new RespostaHTTP(true, "Jogador removido da equipe com sucesso", null);
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta());

        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na remoção de jogador de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const cancelaInscricao_Evento = async (req, res) => {
    try {
        const { jogador, evento } = req.query;

        if(!jogador && !evento){
            const Resposta = new RespostaHTTP(false, "IDs de jogador e evento não foram fornecidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!jogador){
            const Resposta = new RespostaHTTP(false, "ID de jogador não foi fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!evento){
            const Resposta = new RespostaHTTP(false, "ID de evento não foi fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(ID_jogador);
        if(!Jogador_ID){
            const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado no sistema relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        await Jogadores_Evento.destroy({ where: { ID_jogador: jogador, ID_evento: evento } });

        const Resposta = new RespostaHTTP(true, "Inscrição de jogador em evento cancelado com sucesso");
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta());
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cancelamento de jogador em evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

export { lista_nickNames, listaJogadorID, listaRanking_Jogadores, cancelaInscricao_Evento, removeJogador_Equipe, adicionaJogador_Equipe };