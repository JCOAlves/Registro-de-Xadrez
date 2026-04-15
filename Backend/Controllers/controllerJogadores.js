import Jogador from "../Models/Jogador.js";

// Funções CRUD de jogadores

const listaJogadores = async (req, res) => {
    try {
        const listaJogadores = await Jogador.findAll();
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
                quantidade: listaJogadores,
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
};

const lista_nickNames = async (req, res) => {
    try {
        const nomesUsuarios = await Jogador.findAll({ attributes: ['ID_jogador', 'nicknameJogador', 'ID_usuario'] })

        if(nomesUsuarios.length > 0){
            let lista_nicknames = [];
            nomesUsuarios.forEach(nome => {
                !lista_nicknames.includes(nome.nicknameJogador) ? lista_nicknames.push(nome) : null
            });

            console.log("Nomes de usuário de jogadores listados com sucesso.");
            res.status(200).json({
                sucesso: true,
                mensagem: "Nomes de usuário de jogadores listados com sucesso.",
                quantidade: lista_nicknames.length,
                dados: lista_nicknames,
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
};

const listaJogadorID = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const Jogador_ID = await Jogador.findByPk(id);
            if (Jogador_ID) {
                console.log("Listagem de jogador por ID feita com sucesso.");
                res.status(200).json({
                    sucesso: true,
                    mensagem: "Listagem de jogador por ID feita com sucesso.",
                    dados: Jogador_ID,
                    erro: null
                });
            } else {
                console.log("Não foi encontrado nenhum jogador relacionado ao ID");
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Não foi encontrado nenhum jogador relacionado ao ID",
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
};

const listaRanking_Jogadores = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export { listaJogadores, lista_nickNames, listaJogadorID, listaRanking_Jogadores };