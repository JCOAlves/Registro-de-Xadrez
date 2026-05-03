import Equipe, { Equipe_Jogador } from "../Models/Equipe.js";
import { Equipes_Evento } from "../Models/Evento.js";
import Jogador from "../Models/Jogador.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Adicionar números de participantes em equipes
const listaEquipes = async (req, res) => {
    try {
        const lista_Equipes = await Equipe.findAll();
        if(lista_Equipes.length > 0){
            const Resposta = new RespostaHTTP(true, "Listagem de equipes feita com sucesso", null, lista_Equipes);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há equipes cadastradas no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de equipes", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    };
};

const lista_nomesEquipes = async (req, res) => {
    try {
        const lista_Equipes = await Equipe.findAll({ attributes: ['ID_equipe', 'nomeEquipe'] });
        if(lista_Equipes.length > 0){
            const Resposta = new RespostaHTTP(true, "Listagem de nomes de equipes feita com sucesso", null, lista_Equipes);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else{
            const Resposta = new RespostaHTTP(false, "Não há equipes cadastradas no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de nomes de equipes", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

// Adicionar números de participantes em equipes
const listaEquipeID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        let Equipe_ID = await Equipe.findByPk(id);
        if(Equipe_ID){
            const JogadoresEquipe = await Equipe_Jogador.findAll({ where: { ID_equipe: id } });
            let Jogadores = [];
            if(JogadoresEquipe.length > 0){
                Equipe_ID.dataValues.quantidadeMembros = JogadoresEquipe.length;
                JogadoresEquipe.forEach(j => {
                    const Joga = await Jogador.findByPk(j.ID_jogador);
                    Joga ? Jogadores.push(Joga) : null;
                });
                Equipe_ID.dataValues.jogadoresEquipe = Jogadores;

            } else{
                Equipe_ID.dataValues.quantidadeMembros = 0;
                Equipe_ID.dataValues.jogadoresEquipe = Jogadores;
            }

            const Resposta = new RespostaHTTP(true, "Equipe listado por ID com sucesso", null, Equipe_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));
            
        } else{
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de equipe por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaRanking_Equipes = async (req, res) => {
    try {
        const rankingEquipes = await Equipe.findAll({ order: [['pontuacaoEquipe', 'DESC']] });
        if(rankingEquipes.length > 0){
            const Resposta = new RespostaHTTP(true, "Listagem de ranking de equipes feita com sucesso", null, rankingEquipes);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há equipes cadastradas no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ranking de equipes", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const cadastraEquipe = async (req, res) => {
    try {
        const { nomeEquipe, membros=[], liderEquipe } = req.params;

        if(!nomeEquipe){
            const Resposta = new RespostaHTTP(false, "Nome de equipe não fornecido ou nome fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        };

        const nomeCadastrado = await Equipe.findOne({ where: { nomeEquipe: nomeEquipe } });
        if(nomeCadastrado){
            const Resposta = new RespostaHTTP(false, "Nome de equipe já registrado no sistema");
            Resposta.ExibiMensagem();
            return res.status(409).json(Resposta.RetornaResposta());
        }

        if(!liderEquipe){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID do jogador lider de equipe ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        };

        const equipeCadastrada = await Equipe.create({ nomeEquipe: nomeEquipe, liderEquipe: liderEquipe });
        if(equipeCadastrada){
            if(membros.length > 0){
                membros.forEach(jogador => {
                    await Equipe_Jogador.create({ ID_equipe: equipeCadastrada.ID_equipe, ID_jogador: jogador.ID_jogador });
                });
            }

            const Resposta = new RespostaHTTP(true, "Equipe cadastrada no sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const atualizaEquipe = async (req, res) => {
    try {
        const { nomeEquipe } = req.body;
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(id);
        if(Equipe_ID){
            let novosDados = {};
            Equipe_ID.nomeEquipe === nomeEquipe ? null : novosDados.nomeEquipe = nomeEquipe;
            if(novosDados.nomeEquipe){
                await Equipe.update(novosDados, { where: { ID_equipe: id } });
                const Resposta = new RespostaHTTP(true, "Dados de equipe atualizados com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            }

        } else{
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const excluiEquipe = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Equipe_ID = await Equipe.findByPk(id);
        if(Equipe_ID){
            await Equipes_Evento.destroy({ where: { ID_equipe: id } });
            await Equipe.destroy({ where: { ID_equipe: id } });

            const Resposta = new RespostaHTTP(true, "Equipe excluida do sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());

        } else{
            const Resposta = new RespostaHTTP(false, "Não há equipe cadastrada relacionada ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de dados de equipe", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaEquipes, lista_nomesEquipes, listaEquipeID, listaRanking_Equipes, cadastraEquipe, atualizaEquipe, excluiEquipe };