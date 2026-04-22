import Evento from "../Models/Evento.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Funções CRUD de eventos

const listaEvento = async (req, res) => {
    try {
        const listaEventos = await Evento.findAll();
        if(listaEventos.length > 0){
            const Resposta = new RespostaHTTP(true, "Eventos listados com sucesso", null, listaEventos);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há eventos cadastrados no sistema", "Não há eventos cadastrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de eventos", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const lista_nomesEventos = async (req, res) => {
    try {
        const lista_nomesEvento = await Evento.findAll({ attributes: ['ID_evento', 'nomeEvento'] });
        if(lista_nomesEvento.length > 0){
            const Resposta = new RespostaHTTP(true, "Erro na listagem nomes de evento", null, lista_nomesEvento);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());

        } else{
            const Resposta = new RespostaHTTP(false, "Não há eventos cadastrados no sistema", "Não há eventos cadastrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem nomes de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaEventoID = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido", "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(id);
        if(Evento_ID){
            const Resposta = new RespostaHTTP(true, "Evento listado por ID com sucesso", null, Evento_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(true, "Não há evento cadastrado relacionado ao ID", "Não há equipe cadastrado relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
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