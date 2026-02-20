import db from "../Config/db.js";

// Funções CRUD de jogadores

const listaJogadores = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na listagem de jogadores: `, error.message || error);
    }
}

const listaJogadorID = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na listagem de jogador por ID: `, error.message || error);
    }
}

const registraJogador = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro no registro de novo jogador: `, error.message || error);
    }
}

const atualizaJogador = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na atualizção de dados de jogador: `, error.message || error);
    }
}

const excluiJogador = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na exclusão de jogador: `, error.message || error);
    }
}

export { listaJogadores, listaJogadorID, registraJogador, atualizaJogador, excluiJogador }