import Jogada from "../Models/Jogada.js";
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

        if(!['Branco','Preto'].includes(timeJogada)){
            console.log("Time da jogada não fornecido ou nome de time fornecido invalido.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Time da jogada não fornecido ou nome de time fornecido invalido.",
                erro: "Time da jogada não fornecido ou nome de time fornecido invalido."
            });
        } 

        if(!['Peão','Cavalo','Torre','Bispo','Rainha','Rei'].includes(pecaJogada)){
            console.log("Tipo de peça não fornecida ou tipo de peça fornecida invalida.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Tipo de peça não fornecida ou tipo de peça fornecida invalida.",
                erro: "Tipo de peça não fornecida ou tipo de peça fornecida invalida."
            });
        } 

        if(!casaJogada){
            console.log("Casa de jogada não fornecida ou casa fornecida invalida.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Casa de jogada não fornecida ou casa fornecida invalida.",
                erro: "Casa de jogada não fornecida ou casa fornecida invalida."
            });
        } 

        if(!['Peão','Cavalo','Torre','Bispo','Rainha','Rei','Nenhuma'].includes(pecaEliminada)){
            console.log("Tipo de peça eliminida não foi fornecida ou peça fornecida invalida.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Tipo de peça eliminida não foi fornecida ou peça fornecida invalida.",
                erro: "Tipo de peça eliminida não foi fornecida ou peça fornecida invalida."
            });
        }


        console.log("Nova jogada registrada no sistema com sucesso.")
        return res.status(200).json({
            sucesso: true,
            mensagem: "Nova jogada registrada no sistema com sucesso.",
            erro: null
        });

    } catch (error){
        console.error(`Erro no registro de nova jogada: `, error.message || error);
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro no registro de nova jogada.",
            erro: error.message || error
        });
    }
}

const atualizaJogada = async (req, res) => {
    try {
        const { id } = req.params;
        const { timeJogada, pecaJogada, casaJogada, pecaEliminada } = req.body;

        let comandosSQL = [];
        let listaDados = [];

        if(timeJogada){
            comandosSQL.push("timeJogada = ?");
            listaDados.push(timeJogada);
        } 

        if(pecaJogada){
            comandosSQL.push("pecaJogada = ?");
            listaDados.push(pecaJogada);
        } 
        
        if(casaJogada){
            comandosSQL.push("casaJogada = ?");
            listaDados.push(casaJogada);
        } 

        if(pecaEliminada){
            comandosSQL.push("pecaEliminada = ?");
            listaDados.push(pecaEliminada);
        } 

        if(id){
            const [Jogada] = await db.query("SELECT * FROM jogadas WHERE ID_jogada = ?", [id]);

            if(Jogada){
                listaDados.push(id);
            } else{
                console.log("Não há jogada registrada relacionada ao ID fornecido.");
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há jogada registrada relacionada ao ID fornecido.",
                    erro: "Não há jogada registrada relacionada ao ID fornecido."
                });
            }

        } else{
            console.log("Não foi fornecido o ID de jogada ou ID fornecido invalido.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de jogada ou ID fornecido invalido.",
                erro: "Não foi fornecido o ID de jogada ou ID fornecido invalido."
            });
        }

        await db.query(`UPDATE jogadas SET ${comandosSQL.join(", ")} WHERE ID_jogada = ?`, listaDados);
        console.log("Dados de jogada atualizados com sucesso.");
        return res.status(200).json({
            sucesso: true,
            mensagem: "Dados de jogada atualizados com sucesso.",
            erro: null
        });

    } catch (error){
        console.error(`Erro na atualização de dados de jogada: `, error.message || error);
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro na atualização de dados de jogada.",
            erro: error.message || error
        });
    }
}

const excluiJogada = async (req, res) => {
    try {
        const { id } = req.params;

        if(id){
            let [jogadas_partida] = await db.query("SELECT * FROM partida_jogada WHERE Jogada = ?", [id]);
            let [Jogada] = await db.query("SELECT * FROM jogadas WHERE ID_jogada = ?", [id]);

            if(jogadas_partida === null && Jogada  === null){
                console.log("Não há jogada registrada relacionada ao ID fornecido.");
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há jogada registrada relacionada ao ID fornecido.",
                    erro: "Não há jogada registrada relacionada ao ID fornecido."
                });
            }

            await db.query("DELETE partida_jogada WHERE Jogada = ?", [id]);
            await db.query("DELETE jogadas WHERE ID_jogada = ?", [id]);

            [jogadas_partida] = await db.query("SELECT * FROM partida_jogada WHERE Jogada = ?", [id]);
            [Jogada] = await db.query("SELECT * FROM jogadas WHERE ID_jogada = ?", [id]);

            if(jogadas_partida === null && Jogada === null){
                console.log("Jogada excluida do sistema com sucesso.");
                return res.status(200).json({
                    sucesso: true,
                    mensagem: "Jogada excluida do sistema com sucesso.",
                    erro: null
                });
            }
            
        } else{
            console.log("Não foi fornecido o ID de jogada ou ID fornecido invalido.");
            return res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de jogada ou ID fornecido invalido.",
                erro: "Não foi fornecido o ID de jogada ou ID fornecido invalido."
            });
        }

    } catch (error){
        console.error(`Erro na exclusão de jogada: `, error.message || error);
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro na exclusão de jogada.",
            erro: error.message || error
        });
    }
}

export { listaJogadasPartida, listaJogadaID, registraJogada, atualizaJogada, excluiJogada }