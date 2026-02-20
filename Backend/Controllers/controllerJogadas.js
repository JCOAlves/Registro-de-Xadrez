import db from "../Config/db.js";

// Funções CRUD de jogadas

const listaJogadas = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na listagem de jogadas: `, error.message || error);
    }
}

const listaJogadaID = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na listagem de jogadas por ID: `, error.message || error);
    }
}

const registraJogada = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro no registro de nova jogada: `, error.message || error);
    }
}

const atualizaJogada = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na atualização de dados de jogada: `, error.message || error);
    }
}

const excluiJogada = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na exclusão de jogada: `, error.message || error);
    }
}

export { listaJogadas, listaJogadaID, registraJogada, atualizaJogada, excluiJogada }