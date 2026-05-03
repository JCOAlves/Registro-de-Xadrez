import Equipe from "../Models/Equipe.js";
import Evento, { Jogadores_Evento, Equipes_Evento } from "../Models/Evento.js";
import Jogador from "../Models/Jogador.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Funções CRUD de eventos

const listaEvento = async (req, res) => {
    try {
        const listaEventos = await Evento.findAll({ order: [['data_inicioEvento', 'ASC']] });
        if(listaEventos.length > 0){
            const Resposta = new RespostaHTTP(true, "Eventos listados com sucesso", null, listaEventos);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há eventos cadastrados no sistema");
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
            const Resposta = new RespostaHTTP(true, "Nomes de eventos listados com sucesso", null, lista_nomesEvento);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());

        } else{
            const Resposta = new RespostaHTTP(false, "Não há eventos cadastrados no sistema");
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
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(id);
        if(Evento_ID){
            const Resposta = new RespostaHTTP(true, "Evento listado por ID com sucesso", null, Evento_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há evento cadastrado relacionado ao ID");
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
        const { nomeEvento, localEvento, descricaoEvento, modalidadeEvento, data_inicioEvento, data_fimEvento, hora_inicioEvento, hora_fimEvento } = req.body;
        
        if(!nomeEvento){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nome de evento ou nome de evento invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const nomeCadastrado = await Evento.findOne({ where: { nomeEvento: nomeEvento } });
        if(nomeCadastrado){
            const Resposta = new RespostaHTTP(false, "Nome de evento já registrado no sistema");
            Resposta.ExibiMensagem();
            return res.status(409).json(Resposta.RetornaResposta());
        }

        if(!localEvento){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido local de evento ou local de evento invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!modalidadeEvento && !['Individual', 'Equipes', 'Individual e Equipes'].includes(modalidadeEvento)){
            const Resposta = new RespostaHTTP(false, "Não foi fornecida uma modalidade valida de evento");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!data_inicioEvento){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido data de inicio de evento ou data fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!hora_inicioEvento){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido hora de inicio de evento ou hora fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!hora_fimEvento){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido hora de fim de evento ou hora fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const dadosEvento = {
            nomeEvento: nomeEvento, 
            localEvento: localEvento, 
            descricaoEvento: descricaoEvento ? descricaoEvento : "",
            data_inicioEvento: data_inicioEvento, 
            data_fimEvento: data_fimEvento ? 
            data_fimEvento : data_inicioEvento,
            hora_inicioEvento: hora_inicioEvento, 
            hora_fimEvento: hora_fimEvento
        };

        const eventoCadastrado = await Evento.create(dadosEvento);
        if(eventoCadastrado){
            const Resposta = new RespostaHTTP(true, "Evento cadastrado no sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const inscricaoJogador_Evento = async (req, res) => {
    try {
        const { ID_jogador, ID_evento } = req.body;

        if (!ID_jogador) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de jogador na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if (!ID_evento) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de evento na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogador_ID = await Jogador.findByPk(ID_jogador);
        if(!Jogador_ID){
            const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(ID_evento);
        if(!Evento_ID){
            const Resposta = new RespostaHTTP(false, "Não há evento cadastrado relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Inscricao = await Jogadores_Evento.create({ ID_jogador: ID_jogador, ID_evento: ID_evento });
        if(Inscricao){
            const Resposta = new RespostaHTTP(true, "Jogador inscrito no evento com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na inscrição de jogador em evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const inscricaoEquipe_Evento = async (req, res) => {
    try {
        const { ID_equipe, ID_evento } = req.body;

        if (!ID_equipe) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de equipe na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if (!ID_evento) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de evento na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(ID_jogador);
        if(!Equipe_ID){
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(ID_evento);
        if(!Evento_ID){
            const Resposta = new RespostaHTTP(false, "Não há evento cadastrado relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Inscricao = await Equipes_Evento.create({ ID_equipe: ID_equipe, ID_evento: ID_evento });
        if(Inscricao){
            const Resposta = new RespostaHTTP(true, "Equipe inscrita no evento com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }

        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na inscrição de equipe em evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const atualizaEvento = async (req, res) => {
    try {
        const { nomeEvento, localEvento, descricaoEvento, modalidadeEvento, data_inicioEvento, data_fimEvento, hora_inicioEvento, hora_fimEvento } = req.body;
        const { id } = req.params;
        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(id);
        if(Evento_ID){
            let novosDados = {};
            Evento_ID.nomeEvento === nomeEvento ? null : novosDados.nomeEvento = nomeEvento;
            Evento_ID.localEvento === localEvento ? null : novosDados.localEvento = localEvento;
            Evento_ID.descricaoEvento === descricaoEvento ? null : novosDados.descricaoEvento = descricaoEvento;
            Evento_ID.modalidadeEvento === modalidadeEvento ? null : novosDados.modalidadeEvento = modalidadeEvento;
            Evento_ID.data_inicioEvento === data_inicioEvento ? null : novosDados.data_inicioEvento = data_inicioEvento;
            Evento_ID.data_fimEvento === data_fimEvento ? null : novosDados.data_fimEvento = data_fimEvento;
            Evento_ID.hora_inicioEvento === hora_inicioEvento ? null : novosDados.hora_inicioEvento = hora_inicioEvento;
            Evento_ID.hora_fimEvento === hora_fimEvento ? null : novosDados.hora_fimEvento = hora_fimEvento;

            const { nomeEvento, localEvento, descricaoEvento, modalidadeEvento, data_inicioEvento, data_fimEvento, hora_inicioEvento, hora_fimEvento } = novosDados;
            const Executar = nomeEvento || localEvento || descricaoEvento || modalidadeEvento || data_inicioEvento || data_fimEvento || hora_inicioEvento || hora_fimEvento;
            if(Executar){
                await Evento.update(novosDados, { where: { ID_evento: id } });
                const Resposta = new RespostaHTTP(true, "Dados de evento atualizados com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            }


        } else{
            const Resposta = new RespostaHTTP(false, "Não há evento registrado relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const excluiEvento = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(id);
        if(Evento_ID){
            await Jogadores_Evento.destroy({ where: { ID_evento: id } });
            await Equipes_Evento.destroy({ where: { ID_evento: id } });
            await Evento.destroy({ where: { ID_evento: id } });

            const Resposta = new RespostaHTTP(true, "Evento excluido do sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());

        } else{
            const Resposta = new RespostaHTTP(false, "Não há evento registrado relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de dados de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaEvento, lista_nomesEventos, listaEventoID, cadastraEvento, inscricaoJogador_Evento, inscricaoEquipe_Evento, atualizaEvento, excluiEvento };