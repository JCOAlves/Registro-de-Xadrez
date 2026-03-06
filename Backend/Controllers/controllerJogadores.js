import db from "../Config/db.js";

// Funções CRUD de jogadores

const listaJogadores = async (req, res) => {
    try {
        const [listaJogadores] = await db.query("SELECT * FROM jogadores", []);
        if (listaJogadores.length > 0) {
            console.log("Jogadores listados com sucesso.");
            res.status(200).json({
                sucesso: true,
                mensagem: "Jogadores listados com sucesso.",
                quantidade: listaJogadores.length,
                dados: listaJogadores,
                erro: null
            });
        } else {
            console.log("Não há jogadores registrados no sistema.");
            res.status(404).json({
                sucesso: false,
                mensagem: "Não há jogadores registrados no sistema.",
                quantidade: listaJogadores.length,
                erro: "Não há jogadores registrados no sistema."
            });
        }

    } catch (error) {
        console.error(`Erro na listagem de jogadores: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de jogadores",
            erro: error.message || error
        });
    }
}

const lista_nomesUsuario = async (req, res) => {
    try {
        const [nomesUsuarios] = await db.query("SELECT nomeUsuario FROM jogadores ORDER BY nomeUsuario", []);

        if(nomesUsuarios.length > 0){
            let lista_nomesUsuarios = [];

            nomesUsuarios.forEach(nome => {
                !lista_nomesUsuarios.includes(nome) ? lista_nomesUsuarios.push(nome) : null
            });

            console.log("Nomes de usuário de jogadores listados com sucesso.");
            res.status(200).json({
                sucesso: true,
                mensagem: "Nomes de usuário de jogadores listados com sucesso.",
                quantidade: lista_nomesUsuarios.length,
                dados: lista_nomesUsuarios,
                erro: null
            });

        } else{
            console.log("Não há jogadores registrados no sistema.");
            res.status(404).json({
                sucesso: false,
                mensagem: "Não há jogadores registrados no sistema.",
                erro: "Não há jogadores registrados no sistema."
            });
        }


    } catch (error) {
        console.error(`Erro na listagem de nome de usuários: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de nome de usuários.",
            erro: error.message || error
        });
    }
}

const listaJogadorID = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const [Jogador] = await db.query("SELECT * FROM jogadores WHERE ID_jogador = ?", [id]);
            if (Jogador) {
                console.log("Listagem de jogador por ID feita com sucesso.");
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Listagem de jogador por ID feita com sucesso.",
                    dados: Jogador,
                    erro: null
                });
            } else {
                console.log("Não foi encontrado nenhum jogador relacionado ao ID");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não foi encontrado nenhum jogador relacionado ao ID",
                    dados: Jogador,
                    erro: "Não foi encontrado nenhum jogador relacionado ao ID"
                })
            }

        } else {
            console.log("Não foi fornecido nenhum ID na requisição ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido.",
                erro: "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido."
            });
        }

    } catch (error) {
        console.error(`Erro na listagem de jogador por ID: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de jogador por ID",
            erro: error.message || error
        });
    }
}

const registraJogador = async (req, res) => {
    try {
        const { nomeJogador, nomeUsuario, dataNascimento, generoJogador } = req.body;

        if (!nomeJogador) {
            console.log("Não foi fornecido o nome do jogador ou nome fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o nome do jogador ou nome fornecido invalido.",
                erro: "Não foi fornecido o nome do jogador ou nome fornecido invalido."
            })
        }

        if (!nomeUsuario) {
            console.log("Não foi fornecido o nome de usuario do sistema ou nome fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o nome de usuario do sistema ou nome fornecido invalido.",
                erro: "Não foi fornecido o nome de usuario do sistema ou nome fornecido invalido."
            })
        }

        if (!dataNascimento) {
            console.log("Não foi fornecido a data de nascimento ou data de nascimento fornecida invalida.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido a data de nascimento ou data de nascimento fornecida invalida.",
                erro: "Não foi fornecido a data de nascimento ou data de nascimento fornecida invalida."
            })
        }

        await db.query("INSERT INTO jogadores (nomeJogador, nomeUsuario, dataNascimento, generoJogador) VALUES (?, ?, ?, ?)",
            [nomeJogador, nomeUsuario, dataNascimento, generoJogador || "Não informado"]);

        console.log("Novo jogador registrado no sistema com sucesso.");
        res.status(200).json({
            sucesso: true,
            mensagem: "Novo jogador registrado no sistema com sucesso.",
            erro: null
        })

    } catch (error) {
        console.error(`Erro no registro de novo jogador: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro no registro de novo jogador.",
            erro: error.message || error
        });
    }
}

const atualizaJogador = async (req, res) => {
    try {
        const { id } = req.params;
        const { nomeJogador, nomeUsuario, dataNascimento, generoJogador } = req.body;

        let comandosSQL = [];
        let listaDados = [];

        if (nomeJogador) {
            comandosSQL.push("nomeJogador = ?");
            listaDados.push(nomeJogador);
        }

        if (nomeUsuario) {
            comandosSQL.push("nomeUsuario = ?");
            listaDados.push(nomeUsuario);
        }

        if (dataNascimento) {
            comandosSQL.push("dataNascimento = ?");
            listaDados.push(dataNascimento);
        }

        if (generoJogador) {
            comandosSQL.push("generoJogador = ?");
            listaDados.push(generoJogador);
        }

        if (id) {
            const [Jogador] = await db.query("SELECT * FROM jogadores WHERE ID_jogador = ?", [id]);

            if (Jogador) {
                listaDados.push(id);
            } else {
                console.log("Não há jogador relacionado ao ID fornecido.");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há jogador relacionado ao ID fornecido.",
                    erro: "Não há jogador relacionado ao ID fornecido."
                });
            }

        } else {
            console.log("Não foi fornecido ID ou o ID fornecido é invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido ID ou o ID fornecido é invalido.",
                erro: "Não foi fornecido ID ou o ID fornecido é invalido."
            });
        }

        await db.query(`UPDATE jogadores SET ${comandosSQL.join(", ")} WHERE ID_jogador = ?`, listaDados);

        console.log("Dados de jogador atualizados com sucesso.");
        res.status(200).json({
            sucesso: true,
            mensagem: "Dados de jogador atualizados com sucesso.",
            erro: null
        });


    } catch (error) {
        console.error(`Erro na atualizção de dados de jogador: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na atualizção de dados de jogador.",
            erro: error.message || error
        });
    }
}

const atualizaNumeroPartidas = async (req, res) => {
    try {
        const { id } = req.params;
        const { posicaoJogador } = req.body;

        if (posicaoJogador && ["Vitoria", "Derrota", "Empate"].includes(posicaoJogador)) {
            const [Jogador] = await db.query("SELECT * FROM jogadores WHERE ID_jogador = ?", [id]);

            if(Jogador){
                let comandosSQL = [];
                comandosSQL.push("numeroPartidas = numeroPartidas+1");
    
                switch (posicaoJogador) {
                    case "Vitoria":
                        comandosSQL.push("numeroVitorias = numeroVitorias+1");
                        break;
                    case "Derrota":
                        comandosSQL.push("numeroDerrotas = numeroDerrotas+1");
                        break;
                    case "Empate":
                        comandosSQL.push("numeroEmpates = numeroEmpates+1");
                        break;
                };

                await db.query(`UPDATE jogadores SET ${comandosSQL.join(", ")} WHERE ID_jogador = ?`, [id]);

                console.log("Número de partidas atualizados com sucesso.");
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Número de partidas atualizados com sucesso.",
                    erro: null
                });

            } else {
                console.log("Não há um jogador relacionado ao ID fornecido.");
                res.status(400).json({
                    sucesso: false,
                    mensagem: "Não há um jogador relacionado ao ID fornecido.",
                    erro: "Não há um jogador relacionado ao ID fornecido."
                });
            }


        } else {
            console.log("Tipo de posição de jogador não fornecido ou invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Tipo de posição de jogador não fornecido ou invalido.",
                erro: "Tipo de posição de jogador não fornecido ou invalido."
            });
        };

    } catch (error) {
        console.error(`Erro na atualizção de dados de números de partidas, vitorias, derrotas e empates: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na atualizção de dados de números de partidas, vitorias, derrotas e empates.",
            erro: error.message || error
        });
    }
}

const excluiJogador = async (req, res) => {
    try {
        const { id } = req.params;

        if(id){
            let [Partidas] = await db.query("SELECT * FROM partidas WHERE pecasBrancas = ? OR pecasPretas = ?", [id, id]);
            let [Jogador] = await db.query("SELECT * FROM jogadores WHERE ID_jogador = ?", [id]);

            if(Partidas.length === 0 && Jogador === null){
                console.log("Não há jogador registrado relacionado ao ID fornecido.");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não há jogador registrado relacionado ao ID fornecido.",
                    erro: "Não há jogador registrado relacionado ao ID fornecido."
                });
            }

            await db.query("DELETE partidas WHERE pecasBrancas = ? OR pecasPretas = ?", [id, id]);
            await db.query("DELETE jogadores WHERE ID_jogadores = ?", [id]);

            [Partidas] = await db.query("SELECT * FROM partidas WHERE pecasBrancas = ? OR pecasPretas = ?", [id, id]);
            [Jogador] = await db.query("SELECT * FROM jogadores WHERE ID_jogador = ?", [id]);

            if(Partidas.length === 0 && Jogador === null){
                console.log("Jogador excluido do sistema com sucesso.");
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Jogador excluido do sistema com sucesso.",
                    erro: null
                });

            } else{
                console.log("Erro na exclusão de jogador do sistema.");
                res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro na exclusão de jogador do sistema.",
                    erro: "Erro na exclusão de jogador do sistema."
                });
            }

        } else{
            console.log("Não foi fornecido ID de jogador ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido ID de jogador ou ID fornecido invalido.",
                erro: "Não foi fornecido ID de jogador ou ID fornecido invalido."
            });
        }

    } catch (error) {
        console.error(`Erro na exclusão de jogador: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na exclusão de dados de jogador.",
            erro: error.message || error
        });
    }
}

export { listaJogadores, lista_nomesUsuario, listaJogadorID, registraJogador, atualizaJogador, atualizaNumeroPartidas, excluiJogador }