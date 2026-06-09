import Jogada from "../Models/Jogada.js";
import Partida from "../Models/Partida.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

// Funções CRUD de partidas

const listaPartidas = async (req, res) => {
    try {
        const listaPartidas = await Partida.findAll();
        if (listaPartidas.length > 0) {
            const Resposta = new RespostaHTTP(true, "Partidas listadas com sucesso", listaPartidas);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else {
            const Resposta = new RespostaHTTP(false, "Não há partidas registradas no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de partidas", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const listaPartidaID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Partida_ID = await Partida.findByPk(id);
        if (Partida_ID) {
            const Resposta = new RespostaHTTP(true, "Listagem de partida por ID com sucesso", null, Partida_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDados'));

        } else {
            const Resposta = new RespostaHTTP(false, "Não há registrado uma partida relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de partida por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const registraPartida = async (req, res) => {
    try {
        const { pecasBrancas, pecasPretas, ID_evento } = req.body;

        /*if(!ID_evento){
            const Resposta = new RespostaHTTP(false, "ID de evento não fornecido ou id fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }*/

        if (!pecasBrancas) {
            const Resposta = new RespostaHTTP(false, "Dados do time de branco não foi fornecido ou dados fornecidos invalidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if (!pecasPretas) {
            const Resposta = new RespostaHTTP(false, "Dados do time de preto não foi fornecido ou dados fornecidos invalidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const dadosPartida = { timeBranco: pecasBrancas, timePreto: pecasPretas, ID_evento: ID_evento, horaFim: "" };
        const partidaRegistrada = await Partida.create(dadosPartida);
        if(partidaRegistrada){
            const Resposta = new RespostaHTTP(true, "Nova partida registrada com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no registro de nova partida", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const finalizaPartida = async (req, res) => {
    try {
        const { id } = req.params;
        const { horaFinal, vencedor } = req.body;

        if(!id){
            const Resposta = new RespostaHTTP(false, "ID de partida não foi fornecida ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!vencedor || !['Time Preto', 'Time Branco', 'Empate'].includes(vencedor)){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido vencedor ou vencedor fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const Partida_ID = await Partida.findByPk(id)
        if (!Partida_ID) {
            const Resposta = new RespostaHTTP(false, "Não há partida registrada relacionada ao ID no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const horarioAtual = new Date();
        const horas = horarioAtual.getHours() < 10 ? `0${horarioAtual.getHours()}` : horarioAtual.getHours()
        const minutos = horarioAtual.getMinutes() < 10 ? `0${horarioAtual.getMinutes()}` : horarioAtual.getMinutes()
        const segundos = horarioAtual.getSeconds() < 10 ? `0${horarioAtual.getSeconds()}` : horarioAtual.getSeconds()

        const novosDados = { 
            horaFim: horaFinal ? horaFinal : `${horas}:${minutos}:${segundos}`,
            vencedor: vencedor
        };
        await Partida.update(novosDados, { where: { ID_partida: id } });
        const Resposta = new RespostaHTTP(true, "Partida finalizada com sucesso", null);
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta());

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na ação de finalização de partida", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const atualizaPartida = async (req, res) => {
    try {
        const { id } = req.params;
        const { pecasBrancas, pecasPretas, vencedor } = req.body;

        if(!id){
            const Resposta = new RespostaHTTP(true, "Não foi fornecido ID de partida ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }
        
        const Partida_ID = await Partida.findByPk(id);
        if (Partida_ID) {
            let novosDados = {};
            Partida_ID.timeBranco === pecasBrancas ? null : novosDados.timeBranco = pecasBrancas;
            Partida_ID.timePreto === pecasPretas ? null : novosDados.timePreto = pecasPretas;
            Partida_ID.vencedor === vencedor ? null : novosDados.vencedor = vencedor;

            const Executar = Partida_ID.timeBranco || Partida_ID.timePreto || Partida_ID.vencedor;
            if(Executar){
                await Partida.update(novosDados, { where: { ID_partida: id } });
                const Resposta = new RespostaHTTP(true, "Dados da partida atualizados com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            }

            
        } else{
            const Resposta = new RespostaHTTP(false, "Não há partida registrada relacionada ao ID no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de partida", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const excluiPartida = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "Não foi fornecido ID de partida ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Partida_ID = await Partida.findByPk(id);
        if(Partida_ID){
            await Jogada.destroy({ where: { ID_partida: id } })
            await Partida.destroy({ where: { ID_partida: id } });
            const Resposta = new RespostaHTTP(true, "Partida excluida do sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());

        } else{
            const Resposta = new RespostaHTTP(false, "Não há partida registrada relacionada ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de partida", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

export { listaPartidas, listaPartidaID, registraPartida, finalizaPartida, atualizaPartida, excluiPartida };