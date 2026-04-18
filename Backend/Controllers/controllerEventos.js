import Evento from "../Models/Evento.js";

// Funções CRUD de eventos

const listaEvento = async (req, res) => {
    try {
        const listaEventos = await Evento.findAll();
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de eventos", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const lista_nomesEventos = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem nomes de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaEventoID = async (req, res) => {
    try {
        const { id } = req.params

        const Evento_ID = await Evento.findByPk(id)
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de evento por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const cadastraEvento = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const atualizaEvento = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const excluiEvento = async (req, res) => {
    try {
        const { id } = req.params
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de dados de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaEvento, lista_nomesEventos, listaEventoID, cadastraEvento, atualizaEvento, excluiEvento };