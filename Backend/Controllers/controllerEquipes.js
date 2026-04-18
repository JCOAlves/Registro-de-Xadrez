import Equipe from "../Models/Equipe.js";
import Jogador from "../Models/Jogador.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

const listaEquipes = async (req, res) => {
    try {
        const listaEquipes = await Equipe.findAll();
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de equipes", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const lista_nomesEquipes = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de nomes de equipes", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaEquipeID = async (req, res) => {
    try {
        const { id } = req.params;
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de equipe por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaRanking_Equipes = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ranking de equipes", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const cadastraEquipe = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const atualizaEquipe = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const excluiEquipe = async (req, res) => {
    try {
        const { id } = req.params;
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de dados de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaEquipes, lista_nomesEquipes, listaEquipeID, listaRanking_Equipes, cadastraEquipe, atualizaEquipe, excluiEquipe };