import db from "../Config/db.js";

// Funções CRUD de jogadores

const listaJogadores = async (req, res) => {
    try {
        const listaJogadores = await db.query("SELECT * FROM jogadores", []);
        if(listaJogadores.length > 0){
            console.log("Jogadores listados com sucesso.");
            res.status(200).json({
                sucesso: true,
                mensagem: "Jogadores listados com sucesso.",
                quantidade: listaJogadores.length,
                dados: listaJogadores
            });
        } else{
            console.log("Não há jogadores listados no sistema..");
            res.status(404).json({
                sucesso: false,
                mensagem: "Não há jogadores listados no sistema.",
                quantidade: listaJogadores.length
            });
        }

    } catch (error){
        console.error(`Erro na listagem de jogadores: `, error.message || error);
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro na listagem de jogadores",
            erro: error.message || error
        });
    }
}

const listaJogadorID = async (req, res) => {
    try {
        const { id } = req.params;
        if(id){
            const [Jogador] = await db.query("SELECT * FROM jogadores WHERE ID_jogador = ?", [id]);
            if(Jogador){
                console.log("Listagem de jogador por ID feita com sucesso.");
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Listagem de jogador por ID feita com sucesso.",
                    dados: Jogador
                });
            } else{
                console.log("Não foi encontrado nenhum jogador relacionado ao ID");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não foi encontrado nenhum jogador relacionado ao ID",
                    dados: Jogador
                })
            }

        } else{
            console.log("Não foi fornecido nenhum ID na requisição ou ID fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido nenhum ID na requisição ou ID fornecido invalido."
            });
        }

    } catch (error){
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

        if(nomeJogador){
            console.log("Não foi fornecido o nome do jogador ou nome fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o nome do jogador ou nome fornecido invalido."
            })
        }

        if(nomeUsuario){
            console.log("Não foi fornecido o nome de usuario do sistema ou nome fornecido invalido.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido o nome de usuario do sistema ou nome fornecido invalido."
            })
        }

        if(dataNascimento){
            console.log("Não foi fornecido a data de nascimento ou data de nascimento fornecida invalida.");
            res.status(400).json({
                sucesso: false,
                mensagem: "Não foi fornecido a data de nascimento ou data de nascimento fornecida invalida."
            })
        }

        await db.query("INSERT INTO jogadores (nomeJogador, nomeUsuario, dataNascimento, generoJogador) VALUES (?, ?, ?, ?)", 
            [nomeJogador, nomeUsuario, dataNascimento, generoJogador || "Não informado"]);

        res.status(200).json({
            sucesso: true,
            mensagem: "Novo jogador registrado no sistema com sucesso."
        })

    } catch (error){
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
        const { ID_jogador } = req.params;
        const { nomeJogador, nomeUsuario, dataNascimento, generoJogador, statusPartida } = req.body;

        let comandosSQL = "";
        let listaDados = [];

        if(nomeJogador != null){
            comandosSQL = comandosSQL+"nomeJogador = ? ";
            listaDados.push(nomeJogador);
        }

        if(nomeUsuario != null){
            comandosSQL = comandosSQL+"nomeUsuario = ? ";
            listaDados.push(nomeUsuario);
        }

        if(dataNascimento != null){
            comandosSQL = comandosSQL+"dataNascimento = ? ";
            listaDados.push(dataNascimento);
        }

        if(generoJogador != null){
            comandosSQL = comandosSQL+"generoJogador = ? ";
            listaDados.push(generoJogador);
        }

        

    } catch (error){
        console.error(`Erro na atualizção de dados de jogador: `, error.message || error);
    }
}

const atualizaNumeroPartidas = async (req, res) => {
    if(statusPartida){
            const { numeroPartidas, numeroVitorias, numeroDerrotas, numeroEmpates } = await db.query(
                "SELECT numeroPartidas, numeroVitorias, numeroDerrotas, numeroEmpates FROM jogadores WHERE ID_jogador = ?", 
                [ID_jogador]);

            comandosSQL = comandosSQL+"numeroPartidas = numeroPartidas"

            switch(statusPartida){
                case "Vitoria":
                    break;
                case "Derrota":
                    break;
                case "Empate":
                    break;
            }
        }
}

const excluiJogador = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na exclusão de jogador: `, error.message || error);
    }
}

export { listaJogadores, listaJogadorID, registraJogador, atualizaJogador, atualizaNumeroPartidas, excluiJogador }