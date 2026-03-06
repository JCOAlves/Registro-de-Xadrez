import db from "../Config/db.js";

// Funções CRUD de jogadas

const listaJogadas = async (req, res) => {
    try {
        const [listaJogadas] = await db.query("SELECT * FROM jogadas", []);

        if(listaJogadas.length > 0){
            console.log("Jogadas listadas com sucesso.");
            res.status(200).json({
                sucesso: true,
                mensagem: "Jogadas listadas com sucesso.",
                quantidade: listaJogadas.length,
                dados: listaJogadas,
                erro: null
            });

        } else{
            console.log("Não há jogadas registradas no sistema.");
            res.status(404).json({
                sucesso: false,
                mensagem: "Não há jogadas registradas no sistema.",
                quantidade: listaJogadas.length,
                erro: "Não há jogadas registradas no sistema."
            });
        }

    } catch (error){
        console.error(`Erro na listagem de jogadas: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de jogadas.",
            erro: error.message || error
        });
    }
}

const listaJogadasPartida = async (req, res) => {
    try {
        const { ID_partida } = req.params;

        const [listaJogadas] = await db.query(`SELECT jogadas.*, partidas.ID_partida FROM jogadas 
            INNER JOIN partida_jogada ON jogadas.ID_jogada = partida_jogada.Jogada 
            INNER JOIN partidas ON partida_jogada.Partida = partidas.ID_partida 
            WHERE partida_jogada.Partida = ?`, 
            [ID_partida]);

        if(listaJogadas.length > 0){
            console.log("Jogadas de partida específica listadas com sucesso.")
            res.status(200).json({
                sucesso: true,
                mensagem: "Jogadas de partida específica listadas com sucesso.",
                quantidade: listaJogadas.length,
                dados: listaJogadas,
                erro: null
            });

        } else{
            console.log("Não há jogadas registradas relacionada a partida.")
            res.status(404).json({
                sucesso: false,
                mensagem: "Não há jogadas registradas relacionada a partida.",
                quantidade: listaJogadas.length,
                erro: "Não há jogadas registradas relacionada a partida."
            });
        }

    } catch (error){
        console.error(`Erro na listagem de jogadas de partida específica: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de jogadas de partida específica.",
            erro: error.message || error
        });
    }

}

const listaJogadaID = async (req, res) => {
    try {
        const { id } = req.params;

        if(id){
            const [Jogada] = await db.query("SELECT * FROM jogadas WHERE ID_jogada = ?", [id]);

            if(Jogada){
                console.log("Listagem de jogada específica por ID com sucesso.")
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Listagem de jogada específica por ID com sucesso.",
                    dados: Jogada,
                    erro: null
                });

            } else{
                console.log("Não há jogada registrada relacionada a esse ID.")
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há jogada registrada relacionada a esse ID.",
                    quantidade: Jogada,
                    erro: "Não há jogada registrada relacionada a esse ID."
                });
            }

        } else{
            console.log("Não foi fornecido o ID de jogada ou ID fornecido invalido.")
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de jogada ou ID fornecido invalido.",
                erro: "Não foi fornecido o ID de jogada ou ID fornecido invalido."
            });
        }

    } catch (error){
        console.error(`Erro na listagem de jogadas por ID: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de jogadas por ID.",
            erro: error.message || error
        });
    }
}

const registraJogada = async (req, res) => {
    try {
        const { timeJogada, pecaJogada, casaJogada, pecaEliminada, ID_partida } = req.body;

        if(!['Branco','Preto'].includes(timeJogada)){
            console.log("Time da jogada não fornecido ou nome de time fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Time da jogada não fornecido ou nome de time fornecido invalido.",
                erro: "Time da jogada não fornecido ou nome de time fornecido invalido."
            });
        } 

        if(!['Peão','Cavalo','Torre','Bispo','Rainha','Rei'].includes(pecaJogada)){
            console.log("Tipo de peça não fornecida ou tipo de peça fornecida invalida.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Tipo de peça não fornecida ou tipo de peça fornecida invalida.",
                erro: "Tipo de peça não fornecida ou tipo de peça fornecida invalida."
            });
        } 

        if(!casaJogada){
            console.log("Casa de jogada não fornecida ou casa fornecida invalida.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Casa de jogada não fornecida ou casa fornecida invalida.",
                erro: "Casa de jogada não fornecida ou casa fornecida invalida."
            });
        } 

        if(!['Peão','Cavalo','Torre','Bispo','Rainha','Rei','Nenhuma'].includes(pecaEliminada)){
            console.log("Tipo de peça eliminida não foi fornecida ou peça fornecida invalida.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Tipo de peça eliminida não foi fornecida ou peça fornecida invalida.",
                erro: "Tipo de peça eliminida não foi fornecida ou peça fornecida invalida."
            });
        }

        await db.query("INSERT INTO jogadas (timeJogada, pecaJogada, casaJogada, pecaEliminada) VALUES (?, ?, ?, ?)", 
            [timeJogada, pecaJogada, casaJogada, pecaEliminada]);
        const [ID_itemCriado] = await db.query("SELECT ID_jogada FROM jogadas ORDER BY ID_jogada DESC LIMIT 1");
        await db.query("INSERT INTO partida_jogada (Partida, Jogada) VALUES (?, ?)", [ID_partida, ID_itemCriado]);

        console.log("Nova jogada registrada no sistema com sucesso.")
        res.status(200).json({
            sucesso: true,
            mensagem: "Nova jogada registrada no sistema com sucesso.",
            erro: null
        });

    } catch (error){
        console.error(`Erro no registro de nova jogada: `, error.message || error);
        res.status(500).json({
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
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há jogada registrada relacionada ao ID fornecido.",
                    erro: "Não há jogada registrada relacionada ao ID fornecido."
                });
            }

        } else{
            console.log("Não foi fornecido o ID de jogada ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de jogada ou ID fornecido invalido.",
                erro: "Não foi fornecido o ID de jogada ou ID fornecido invalido."
            });
        }

        await db.query(`UPDATE jogadas SET ${comandosSQL.join(", ")} WHERE ID_jogada = ?`, listaDados);
        console.log("Dados de jogada atualizados com sucesso.");
        res.status(200).json({
            sucesso: true,
            mensagem: "Dados de jogada atualizados com sucesso.",
            erro: null
        });

    } catch (error){
        console.error(`Erro na atualização de dados de jogada: `, error.message || error);
        res.status(500).json({
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
                res.status(404).json({
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
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Jogada excluida do sistema com sucesso.",
                    erro: null
                });
            }
            
        } else{
            console.log("Não foi fornecido o ID de jogada ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de jogada ou ID fornecido invalido.",
                erro: "Não foi fornecido o ID de jogada ou ID fornecido invalido."
            });
        }

    } catch (error){
        console.error(`Erro na exclusão de jogada: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na exclusão de jogada.",
            erro: error.message || error
        });
    }
}

export { listaJogadas, listaJogadasPartida, listaJogadaID, registraJogada, atualizaJogada, excluiJogada }