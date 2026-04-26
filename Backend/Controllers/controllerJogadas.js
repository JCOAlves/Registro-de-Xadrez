import Jogada from "../Models/Jogada.js";
import Partida from "../Models/Partida.js";
import RespostaHTTP from "../Models/RespostaHTTP.js"


// Funções CRUD de jogadas

const listaJogadasPartida = async (req, res) => {
    try {
        const { ID_partida } = req.params;

        const listaJogadas = await Jogada.findAll({ where: { ID_partida: ID_partida } });
        if(listaJogadas.length > 0){
            const Resposta = new RespostaHTTP(true, "Jogadas de partida específica listadas com sucesso", null, listaJogadas);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogadas registradas relacionada a partida", "Não há jogadas registradas relacionada a partida");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error){
        const Resposta = new RespostaHTTP(false, "Erro na listagem de jogadas de partida específica", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }

}

const listaJogadaID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido", "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogada_ID = await Jogada.findByPk(id);
        if(Jogada_ID){
            const Resposta = new RespostaHTTP(true, "Listagem de jogada específica por ID com sucesso", null, Jogada_ID);
            Resposta.ExibiMensagem()
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogada registrada relacionada a esse ID", "Não há jogada registrada relacionada a esse ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }


    } catch (error){
        const Resposta = new RespostaHTTP(false, "Erro na listagem de jogadas por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const registraJogada = async (req, res) => {
    try {
        const { timeJogada, pecaJogada, casaJogada, pecaEliminada, ID_partida } = req.body;

        if(!['Time Branco','Time Preto'].includes(timeJogada)){
            const Resposta = new RespostaHTTP(false, "Time da jogada não fornecido ou nome de time fornecido invalido", "Time da jogada não fornecido ou nome de time fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        } 

        if(!['Peão','Cavalo','Torre','Bispo','Rainha','Rei'].includes(pecaJogada)){
            const Resposta = new RespostaHTTP(false, "Tipo de peça não fornecida ou tipo de peça fornecida invalida", "Tipo de peça não fornecida ou tipo de peça fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        } 

        if(!casaJogada){
            const Resposta = new RespostaHTTP(false, "Casa de jogada não fornecida ou casa fornecida invalida", "Casa de jogada não fornecida ou casa fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        } 

        if(!['Peão','Cavalo','Torre','Bispo','Rainha','Rei','Nenhuma'].includes(pecaEliminada)){
            const Resposta = new RespostaHTTP(false, "Tipo de peça eliminida não foi fornecida ou peça fornecida invalida", "Tipo de peça eliminida não foi fornecida ou peça fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!ID_partida){
            const Resposta = new RespostaHTTP(false, "ID de partida não fornecido ou ID fornecido invalido", "ID de partida não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Partida_ID = await Partida.findByPk(ID_partida);
        if(Partida_ID){
            const dadosJogada = {
                timeJogada: timeJogada, casaJogada: casaJogada,
                pecaJogada: pecaJogada, pecaEliminada: pecaEliminada, 
                ID_partida: ID_partida
            }

            const jogadaCadastrada = await Jogada.create(dadosJogada);
            if(jogadaCadastrada){
                const Resposta = new RespostaHTTP(true, "Nova jogada registrada no sistema com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            }


        } else{
            const Resposta = new RespostaHTTP(false, "Não há partida cadastrada relacionada ao ID", "Não há partida cadastrada relacionada ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }


    } catch (error){
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de nova jogada", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const atualizaJogada = async (req, res) => {
    try {
        const { timeJogada, pecaJogada, casaJogada, pecaEliminada } = req.body;
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido", "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogada_ID = await Jogada.findByPk(id);
        if(Jogada_ID){
            let novosDados = {};
            Jogada_ID.timeJogada === timeJogada ? null : novosDados.timeJogada = timeJogada;
            Jogada_ID.pecaJogada === pecaJogada ? null : novosDados.pecaJogada = pecaJogada;
            Jogada_ID.casaJogada === casaJogada ? null : novosDados.casaJogada = casaJogada;
            Jogada_ID.pecaEliminada === pecaEliminada ? null : novosDados.pecaEliminada = pecaEliminada;

            const Executar = novosDados.timeJogada || novosDados.pecaJogada || novosDados.casaJogada || novosDados.pecaEliminada;
            if(Executar){
                await Jogada.update(novosDados, { where: { ID_jogada: id } });
                const Resposta = new RespostaHTTP(true, "Dados de jogada atualizados com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            }


        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogada registrada relacionada ao ID fornecido", "Não há jogada registrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error){
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de jogada", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const excluiJogada = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido", "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Jogada_ID = await Jogada.findByPk(id);
        if(Jogada_ID){
            await Jogada.destroy({ where: { ID_jogada: id } });
            const Resposta = new RespostaHTTP(true, "Jogada excluida do sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
            
        } else{
            const Resposta = new RespostaHTTP(false, "Não há jogada cadastrada relacionada ao ID fornecido", "Não há jogada cadastrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

    } catch (error){
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de jogada", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

export { listaJogadasPartida, listaJogadaID, registraJogada, atualizaJogada, excluiJogada };