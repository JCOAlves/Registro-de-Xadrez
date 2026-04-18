import connectionDB from "../Config/db.js";
import Jogador from "../Models/Jogador.js";
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
            const Resposta = new RespostaHTTP(false, "Não há jogadores registrados no sistema", "Não há jogadores registrados no sistema");
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
            let lista_nicknames = [];
            nomesUsuarios.forEach(nome => {
                !lista_nicknames.includes(nome.nicknameJogador) ? lista_nicknames.push(nome) : null
            });

            const Resposta = new RespostaHTTP(true, "Nomes de usuário de jogadores listados com sucesso", null, lista_nicknames);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogadores registrados no sistema", "Não há jogadores registrados no sistema");
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
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido", "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(id);
        if (!Jogador_ID) {
            const Resposta = new RespostaHTTP(false, "Não foi encontrado nenhum jogador relacionado ao ID", "Não foi encontrado nenhum jogador relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        } 
        
        // Fazer listagem de número de partidas, vitorias, derrotas e empates
        const Partidas_jogador = await Partida.findAll();
        let numeroPartidas = 0;
        let vitorias = 0;
        let derrotas = 0;
        let empates = 0;

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
            const Resposta = new RespostaHTTP(false, "Não há jogadores cadastrados no sistema", "Não há jogadores cadastrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ranking de jogadores", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaJogadores, lista_nickNames, listaJogadorID, listaRanking_Jogadores };