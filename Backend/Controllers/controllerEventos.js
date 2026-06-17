import Equipe from "../Models/Equipe.js";
import Evento, { Jogadores_Evento, Equipes_Evento } from "../Models/Evento.js";
import Jogador from "../Models/Jogador.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

// Funções CRUD de eventos

const listaEvento = async (req, res) => {
    try {
        const { filtro="", tipoFiltro="nomeEvento" } = req.query;

        let listaEventos = await Evento.findAll({ order: [['dataInicio', 'ASC']] });

        if(filtro != ""){
            switch(tipoFiltro){
                case "nomeEvento":
                    listaEventos = listaEventos.filter(evt => evt.nomeEvento.startsWith(filtro));
                    break;
                case "localEvento":
                    listaEventos = listaEventos.filter(evt => evt.localEvento.startsWith(filtro));
                    break;
                case "dataInicio":
                    listaEventos = listaEventos.filter(evt => evt.dataInicio.startsWith(filtro));
                    break;
                case "descricaoEvento":
                    listaEventos = listaEventos.filter(evt => evt.descricaoEvento.includes(filtro));
                    break;
                default:
                    listaEventos = listaEventos.filter(evt => evt.nomeEvento.startsWith(filtro));
                    break;
            };
        };

        if(listaEventos.length > 0){
            const Resposta = new RespostaHTTP(true, "Eventos listados com sucesso", null, listaEventos);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há eventos cadastrados no sistema", null, listaEventos);
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta('returnListDados'));
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de eventos", error.message || error);
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

// Adcionar das de inscrição
const cadastraEvento = async (req, res) => {
    try {
        const { nomeEvento, localEvento, descricaoEvento="", modalidadeEvento, dataInicio, dataFim, horaInicio, horaFim, data_inicioInscricao, data_fimInscricao } = req.body;
        
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

        if(!modalidadeEvento || !['Individual', 'Equipes', 'Individual e Equipes'].includes(modalidadeEvento)){
            const Resposta = new RespostaHTTP(false, "Não foi fornecida uma modalidade valida de evento");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!dataInicio){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido data de inicio de evento ou data fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!horaInicio){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido hora de inicio de evento ou hora fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!horaFim){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido hora de fim de evento ou hora fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        // Adicionar formatação de data e hora
        const dadosEvento = {
            nomeEvento: nomeEvento, 
            localEvento: localEvento,
            modalidadeEvento: modalidadeEvento,
            descricaoEvento: descricaoEvento,
            dataInicio: dataInicio, 
            dataFim: dataFim,
            horaInicio: horaInicio, 
            horaFim: horaFim,
            data_inicioInscricao: data_inicioInscricao,
            data_fimInscricao: data_fimInscricao
        };

        const eventoCadastrado = await Evento.create(dadosEvento);
        if(eventoCadastrado){
            const Resposta = new RespostaHTTP(true, "Evento cadastrado no sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaInscricoes_Evento = async (req, res) => {
    try {
        const { tipoInscricao="" } = req.query;
        const { id } = req.params;

        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!["", "individual", "equipes"].includes(tipoInscricao)){
            const Resposta = new RespostaHTTP(false, "Tipo de inscrição em evento invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        let Inscricoes = [];
        switch(tipoInscricao){
            case "Individual":
                Inscricoes = await Jogadores_Evento.findAll({ where: { ID_evento: id } });
                if(!Inscricoes.length > 0){
                    const Resposta = new RespostaHTTP(false, "Não há inscrições do tipo individual no evento");
                    Resposta.ExibiMensagem();
                    return res.status(404).json(Resposta.RetornaResposta());

                } else{
                    const Resposta = new RespostaHTTP(true, "Inscrições individuais de evento listadas com sucesso", null, Inscricoes);
                    Resposta.ExibiMensagem();
                    return res.status(200).json(Resposta.RetornaResposta('returnDado'));
                }
                break;

            case "Equipes":
                Inscricoes = await Equipes_Evento.findAll({ where: { ID_evento: id } });
                if(!Inscricoes.length > 0){
                    const Resposta = new RespostaHTTP(false, "Não há inscrições do tipo equipes no evento");
                    Resposta.ExibiMensagem();
                    return res.status(404).json(Resposta.RetornaResposta());

                } else{
                    const Resposta = new RespostaHTTP(true, "Inscrições de equipes de evento listadas com sucesso", null, Inscricoes);
                    Resposta.ExibiMensagem();
                    return res.status(200).json(Resposta.RetornaResposta('returnDado'));
                }
                break;

            default:
                const inscricoesIndividuais = await Jogadores_Evento.findAll({ where: { ID_evento: id } });
                inscricoesIndividuais.forEach(inscri => Inscricoes.push(inscri));

                const inscricoesEquipes = await Equipes_Evento.findAll({ where: { ID_evento: id } });
                inscricoesEquipes.forEach(inscri => Inscricoes.push(inscri));

                if(!inscricoesIndividuais.length > 0 && !inscricoesEquipes.length > 0){
                    const Resposta = new RespostaHTTP(false, "Não há inscrições no evento");
                    Resposta.ExibiMensagem();
                    return res.status(404).json(Resposta.RetornaResposta());

                } else{
                    const Resposta = new RespostaHTTP(true, "Inscrições de evento listado com sucesso", null, Inscricoes);
                    Resposta.ExibiMensagem();
                    return res.status(200).json(Resposta.RetornaResposta('returnDado'));
                }
                break;
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de inscrições de evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const inscreveEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { tipoInscricao="" } = req.query;
        const { ID_jogador=null, ID_equipe=null } = req.body;

        if (!id) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de evento na requisição ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Evento_ID = await Evento.findByPk(id);
        if(!Evento_ID){
            const Resposta = new RespostaHTTP(false, "Não há evento cadastrado relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        switch(tipoInscricao){
            case "Equipes":
                if (!ID_equipe) {
                    const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de equipe na requisição ou ID fornecido invalido");
                    Resposta.ExibiMensagem();
                    return res.status(400).json(Resposta.RetornaResposta());
                }

                const Equipe_ID = await Equipe.findByPk(ID_jogador);
                if(!Equipe_ID){
                    const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID");
                    Resposta.ExibiMensagem();
                    return res.status(404).json(Resposta.RetornaResposta());
                }

                const InscricaoEquipe = await Equipes_Evento.create({ ID_equipe: ID_equipe, ID_evento: id });
                if(InscricaoEquipe){
                    const Resposta = new RespostaHTTP(true, "Equipe inscrita no evento com sucesso", null);
                    Resposta.ExibiMensagem();
                    return res.status(200).json(Resposta.RetornaResposta());
                }
                break;

            case "Individual":
                if (!ID_jogador) {
                    const Resposta = new RespostaHTTP(false, "Não foi fornecido nenhum ID de jogador na requisição ou ID fornecido invalido");
                    Resposta.ExibiMensagem();
                    return res.status(400).json(Resposta.RetornaResposta());
                }

                const Jogador_ID = await Jogador.findByPk(ID_jogador);
                if(!Jogador_ID){
                    const Resposta = new RespostaHTTP(false, "Não há jogador cadastrado relacionado ao ID");
                    Resposta.ExibiMensagem();
                    return res.status(404).json(Resposta.RetornaResposta());
                }

                const InscricaoJogador = await Jogadores_Evento.create({ ID_jogador: ID_jogador, ID_evento: id });
                if(InscricaoJogador){
                    const Resposta = new RespostaHTTP(true, "Jogador inscrito no evento com sucesso", null);
                    Resposta.ExibiMensagem();
                    return res.status(200).json(Resposta.RetornaResposta());
                }
                break;

            default:
                const Resposta = new RespostaHTTP(false, "Tipo de inscrição fornecida invalida");
                Resposta.ExibiMensagem();
                return res.status(400).json(Resposta.RetornaResposta());
                break;
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na inscrição em evento", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const atualizaEvento = async (req, res) => {
    try {
        const { nomeEvento, localEvento, descricaoEvento, modalidadeEvento, dataInicio, dataFim, horaInicio, horaFim } = req.body;
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
            Evento_ID.dataInicio === dataInicio ? null : novosDados.dataInicio = dataInicio;
            Evento_ID.dataFim === dataFim ? null : novosDados.dataFim = dataFim;
            Evento_ID.horaInicio === horaInicio ? null : novosDados.horaInicio = horaInicio;
            Evento_ID.horaFim === horaFim ? null : novosDados.horaFim = horaFim;

            const { nomeEvento, localEvento, descricaoEvento, modalidadeEvento, dataInicio, dataFim, horaInicio, horaFim } = novosDados;
            const Executar = nomeEvento || localEvento || descricaoEvento || modalidadeEvento || dataInicio || dataFim || horaInicio || horaFim;
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

export { listaEvento, listaEventoID, cadastraEvento, atualizaEvento, excluiEvento, listaInscricoes_Evento, inscreveEvento };