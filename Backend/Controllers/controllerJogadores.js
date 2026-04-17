import Jogador from "../Models/Jogador.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Funções CRUD de jogadores

const listaJogadores = async (req, res) => {
    try {
        const listaJogadores = await Jogador.findAll();
        if (listaJogadores.length > 0) {
            const Resposta = new RespostaHTTP(true, "Jogadores listados com sucesso", null);
            Resposta.ExibiMensagem();
            res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else {
            const Resposta = new RespostaHTTP(false, "Não há jogadores registrados no sistema", "Não há jogadores registrados no sistema");
            Resposta.ExibiMensagem();
            res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de jogadores", error.message | error);
        Resposta.ExibiMensagem('Erro');
        res.status(500).json(Resposta.RetornaResposta());
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

            const Resposta = new RespostaHTTP(true, "Nomes de usuário de jogadores listados com sucesso", null);
            Resposta.ExibiMensagem();
            res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogadores registrados no sistema", "Não há jogadores registrados no sistema");
            Resposta.ExibiMensagem();
            res.status(404).json(Resposta.RetornaResposta());
        }


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de nomes de usuários (nicknames)", error.message | error);
        Resposta.ExibiMensagem('Erro');
        res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaJogadorID = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido", "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(id);
        if (!Jogador_ID) {
            const Resposta = new RespostaHTTP(false, "Não foi encontrado nenhum jogador relacionado ao ID", "Não foi encontrado nenhum jogador relacionado ao ID");
            Resposta.ExibiMensagem();
            res.status(404).json(Resposta.RetornaResposta());
        } 

        const Resposta = new RespostaHTTP(true, "Listagem de jogador por ID feita com sucesso", null);
        Resposta.ExibiMensagem();
        res.status(200).json(Resposta.RetornaResposta('returnDados'));

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de jogador por ID", error.message | error);
        Resposta.ExibiMensagem('Erro');
        res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaRanking_Jogadores = async (req, res) => {
    try {
        const rankingJogadores = await Jogador.findAll();
        if(rankingJogadores.length > 0){
            const Resposta = new RespostaHTTP(true, "Ranking de jogadores listado com sucesso", null);
            Resposta.ExibiMensagem();
            res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogadores cadastrados no sistema", "Não há jogadores cadastrados no sistema");
            Resposta.ExibiMensagem();
            res.status(200).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ranking de jogadores", error.message | error);
        Resposta.ExibiMensagem('Erro');
        res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaJogadores, lista_nickNames, listaJogadorID, listaRanking_Jogadores };