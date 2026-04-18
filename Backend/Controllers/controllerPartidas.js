import Partida from "../Models/Partida.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Funções CRUD de partidas

const listaPartidas = async (req, res) => {
    try {
        const listaPartidas = await Partida.findAll();
        if (listaPartidas.length > 0) {
            const Resposta = new RespostaHTTP(true, "Partidas listadas com sucesso", listaPartidas);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else {
            const Resposta = new RespostaHTTP(false, "Não há partidas registradas no sistema", "Não há partidas registradas no sistema");
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

        if (id) {
            const Partida_ID = await Partida.findByPk(id);
            if (Partida_ID) {
                const Resposta = new RespostaHTTP(true, "Listagem de partida por ID com sucesso", null, Partida_ID);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta('returnDados'));

            } else {
                const Resposta = new RespostaHTTP(false, "Não há registrado uma partida relacionada ao ID fornecido", "Não há registrado uma partida relacionada ao ID fornecido");
                Resposta.ExibiMensagem();
                return res.status(404).json(Resposta.RetornaResposta());
            }
        } else {
            console.log("Não foi fornecido ID na requisição ou ID fornecido invalido.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido ID na requisição ou ID fornecido invalido.",
                erro: "Não foi fornecido ID na requisição ou ID fornecido invalido."
            });
        }


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de partida por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const registraPartida = async (req, res) => {
    try {
        const { pecasBrancas, pecasPretas } = req.body;

        if (!pecasBrancas) {
            const Resposta = new RespostaHTTP(false, "Dados do time de branco não foi fornecido ou dados fornecidos invalidos", "Dados do time de branco não foi fornecido ou dados fornecidos invalidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if (!pecasPretas) {
            const Resposta = new RespostaHTTP(false, "Dados do time de preto não foi fornecido ou dados fornecidos invalidos", "Dados do time de preto não foi fornecido ou dados fornecidos invalidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const partidaRegistrada = await Partida.create();
        const Resposta = new RespostaHTTP(true, "Nova partida registrada com sucesso", null);
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta());

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
            const Resposta = new RespostaHTTP(false, "ID de partida não foi fornecida ou ID fornecido invalido", "ID de partida não foi fornecida ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Partida = await Partida.findByPk(id)
        if (!Partida) {
            const Resposta = new RespostaHTTP(false, "Não há partida registrada relacionada ao ID no sistema", "Não há partida registrada relacionada ao ID no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const horarioAtual = new Date();
        const horas = horarioAtual.getHours() < 10 ? `0${horarioAtual.getHours()}` : horarioAtual.getHours()
        const minutos = horarioAtual.getMinutes() < 10 ? `0${horarioAtual.getMinutes()}` : horarioAtual.getMinutes()
        const segundos = horarioAtual.getSeconds() < 10 ? `0${horarioAtual.getSeconds()}` : horarioAtual.getSeconds()

        if (!vencedor) {
            const Resposta = new RespostaHTTP(false, "Não foi fornecido os dados do venedor ou dados fornecidos invalidos", "Não foi fornecido os dados do venedor ou dados fornecidos invalidos");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

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
            const Resposta = new RespostaHTTP(true, "Não foi fornecido ID de partida ou ID fornecido invalido", "Não foi fornecido ID de partida ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }
        
        const Partida = await Partida.findByPk(id);
        if (!Partida) {
            const Resposta = new RespostaHTTP(false, "Não há partida registrada relacionada ao ID no sistema", "Não há partida registrada relacionada ao ID no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        

        const Resposta = new RespostaHTTP(true, "Dados da partida atualizados com sucesso", null);
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta());

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de partida", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

const excluiPartida = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            let [Partida_jogadas] = await db.query("SELECT * FROM partida_jogada WHERE Partida = ?", [id]);
            let [Partida] = await db.query("SELECT * FROM partidas WHERE ID_partida = ?", [id]);

            if (Partida_jogadas.length === 0 && Partida === null) {
                console.log("Não há partida registrada relacionada ao ID fornecido.");
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há partida registrada relacionada ao ID fornecido.",
                    erro: "Não há partida registrada relacionada ao ID fornecido."
                });
            }

            await db.query("DELETE partida_jogada WHERE Partida = ?", [id]);
            await db.query("DELETE partidas WHERE ID_partida = ?", [id]);

            [Partida_jogadas] = await db.query("SELECT * FROM partida_jogada WHERE Partida = ?", [id]);
            [Partida] = await db.query("SELECT * FROM partidas WHERE ID_partida = ?", [id]);

            if (Partida_jogadas.length === 0 && Partida === null) {
                console.log("Partida excluida do sistema com sucesso.");
                return res.status(200).json({
                    sucesso: true,
                    mensagem: "Partida excluida do sistema com sucesso.",
                    erro: null
                });
            }

        } else {
            console.log("Não foi fornecido o ID de partida ou ID de fornecido invalido.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de partida ou ID de fornecido invalido.",
                erro: "Não foi fornecido o ID de partida ou ID de fornecido invalido."
            });
        }

    } catch (error) {
        console.error(`Erro na exclusão de partida: `, error.message || error);
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro na exclusão de partida.",
            erro: error.message || error
        });
    }
}

export { listaPartidas, listaPartidaID, registraPartida, finalizaPartida, atualizaPartida, excluiPartida }