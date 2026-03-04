import db from "../Config/db.js";

// Funções CRUD de partidas

const listaPartidas = async (req, res) => {
    try {
        const [listaPartidas] = await db.query(`SELECT p.*, 
            jb.nomeUsuario AS nomeUsuario_brancas, jb.nomeJogador AS nomeJogador_brancas,
            jp.nomeUsuario AS nomeUsuario_pretas, jp.nomeJogador AS nomeJogador_pretas
            FROM partidas AS p
            INNER JOIN jogadores AS jb ON p.pecasBrancas = jb.ID_jogador
            INNER JOIN jogadores AS jp ON p.pecasPretas = jp.ID_jogador
            WHERE p.pecasBrancas <> p.pecasPretas;`, []);
        if (listaPartidas.length > 0) {
            console.log("Partidas listadas com sucesso");
            res.status(200).json({
                sucesso: true,
                mensagem: "Partidas listadas com sucesso",
                quantidade: listaPartidas.length,
                dados: listaPartidas,
                erro: null
            });
        } else {
            console.log("Não há partidas registradas no sistema.");
            res.status(404).json({
                sucesso: false,
                mensagem: "Não há partidas registradas no sistema.",
                quantidade: listaPartidas.length,
                erro: "Não há partidas registradas no sistema."
            });
        }

    } catch (error) {
        console.error(`Erro na listagem de partidas: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de partidas.",
            erro: error.message || error
        });
    }
}

const listaPartidaID = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const [Partida] = await db.query(`SELECT p.*,
                jb.nomeUsuario AS nomeUsuario_brancas, jb.nomeJogador AS nomeJogador_brancas,
                jp.nomeUsuario AS nomeUsuario_pretas, jp.nomeJogador AS nomeJogador_pretas
                FROM partidas AS p
                INNER JOIN jogadores AS jb ON p.pecasBrancas = jb.ID_jogador
                INNER JOIN jogadores AS jp ON p.pecasPretas = jp.ID_jogador
                WHERE p.ID_partida = ?`, [id]);
            if (Partida) {
                console.log("Listagem de partida por ID com sucesso.");
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Listagem de partida por ID com sucesso.",
                    dados: Partida,
                    erro: null
                });

            } else {
                console.log("Não há registrado uma partida relacionada ao ID fornecido.");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há registrado uma partida relacionada ao ID fornecido.",
                    erro: "Não há registrado uma partida relacionada ao ID fornecido."
                });
            }
        } else {
            console.log("Não foi fornecido ID na requisição ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido ID na requisição ou ID fornecido invalido.",
                erro: "Não foi fornecido ID na requisição ou ID fornecido invalido."
            });
        }


    } catch (error) {
        console.error(`Erro na listagem de partida por ID: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de partida por ID.",
            erro: error.message || error
        });
    }
}

const registraPartida = async (req, res) => {
    try {
        const { pecasBrancas, pecasPretas } = req.body;

        if (!pecasBrancas) {
            console.log("Dados do time de branco não foi fornecido ou dados fornecidos invalidos.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Dados do time de branco não foi fornecido ou dados fornecidos invalidos.",
                erro: "Dados do time de branco não foi fornecido ou dados fornecidos invalidos."
            });
        }

        if (!pecasPretas) {
            console.log("Dados do time de preto não foi fornecido ou dados fornecidos invalidos.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Dados do time de preto não foi fornecido ou dados fornecidos invalidos.",
                erro: "Dados do time de preto não foi fornecido ou dados fornecidos invalidos."
            });
        }

        await db.query("INSERT INTO partidas (pecasBrancas, pecasPretas) VALUES (?, ?)", [pecasBrancas, pecasPretas]);
        console.log("Nova partida registrada com sucesso.");
        res.status(200).json({
            sucesso: true,
            mensagem: "Nova partida registrada com sucesso.",
            erro: null
        });

    } catch (error) {
        console.error(`Erro no registro de nova partida: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro no registro de nova partida",
            erro: null
        });
    }
}

const finalizaPartida = async (req, res) => {
    try {
        const { id } = req.params;
        const { horaFinal, vencedor } = req.body;

        if (id) {
            const [Partida] = await db.query("SELECT * FROM partidas WHERE ID_partida = ?", [id]);
            if (!Partida) {
                console.log("Não há partida registrada relacionada ao ID no sistema.");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há partida registrada relacionada ao ID no sistema.",
                    erro: "Não há partida registrada relacionada ao ID no sistema."
                });
            }

            const horarioAtual = new Date();
            const horas = horarioAtual.getHours() < 10 ? `0${horarioAtual.getHours()}` : horarioAtual.getHours()
            const minutos = horarioAtual.getMinutes() < 10 ? `0${horarioAtual.getMinutes()}` : horarioAtual.getMinutes()
            const segundos = horarioAtual.getSeconds() < 10 ? `0${horarioAtual.getSeconds()}` : horarioAtual.getSeconds()

            if (!vencedor) {
                console.log("");
            }

            await db.query("UPDATE partidas SET horaFinal = ?, vencedor = ? WHERE ID_partida = ?",
                [horaFinal || `${horas}:${minutos}:${segundos}`, vencedor, id]);

            console.log("Partida finalizada com sucesso.");
            res.status(200).json({
                sucesso: true,
                mensagem: "Partida finalizada com sucesso.",
                erro: null
            });

        } else {
            console.log("ID de partida não foi fornecida ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "ID de partida não foi fornecida ou ID fornecido invalido.",
                erro: "ID de partida não foi fornecida ou ID fornecido invalido."
            });
        }

    } catch (error) {
        console.error("Erro na ação de finalização de partida", error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na ação de finalização de partida.",
            erro: error.message || error
        });
    }
}

const atualizaPartida = async (req, res) => {
    try {
        const { id } = req.params;
        const { pecasBrancas, pecasPretas, vencedor } = req.body;

        let comandosSQL = [];
        let listaDados = [];

        if (pecasBrancas != null) {
            comandosSQL.push("pecasBrancas = ?");
            listaDados.push(pecasBrancas);
        }

        if (pecasPretas != null) {
            comandosSQL.push("pecasPretas = ?");
            listaDados.push(pecasPretas);
        }

        if (vencedor != null) {
            comandosSQL.push("pecasBrancas = ?");
            listaDados.push(vencedor);
        }

        if (id) {
            const [Partida] = await db.query("SELECT * FROM partidas WHERE ID_partida = ?", [id]);

            if (Partida) {
                listaDados.push(id);
            } else {
                console.log("Não há partida registrada relacionada ao ID no sistema.")
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há partida registrada relacionada ao ID no sistema.",
                    erro: "Não há partida registrada relacionada ao ID no sistema."
                });
            }

        } else {
            console.log("Não foi fornecido ID de partida ou ID fornecido invalido.")
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido ID de partida ou ID fornecido invalido.",
                erro: "Não foi fornecido ID de partida ou ID fornecido invalido."
            });
        }

        await db.query(`UPDATE partidas SET ${comandosSQL.join(", ")} WHERE ID_partida = ?`, listaDados);

        console.log("Dados da partida atualizados com sucesso.");
        res.status(200).json({
            sucesso: true,
            mensagem: "Dados da partida atualizados com sucesso.",
            erro: null
        });

    } catch (error) {
        console.error(`Erro na atualização de dados de partida: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na atualização de dados de partida.",
            erro: "Erro na atualização de dados de partida."
        });
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
                res.status(404).json({
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
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Partida excluida do sistema com sucesso.",
                    erro: null
                });
            }

        } else {
            console.log("Não foi fornecido o ID de partida ou ID de fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o ID de partida ou ID de fornecido invalido.",
                erro: "Não foi fornecido o ID de partida ou ID de fornecido invalido."
            });
        }

    } catch (error) {
        console.error(`Erro na exclusão de partida: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na exclusão de partida.",
            erro: error.message || error
        });
    }
}

export { listaPartidas, listaPartidaID, registraPartida, finalizaPartida, atualizaPartida, excluiPartida }