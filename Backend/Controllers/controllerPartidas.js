import db from "../Config/db.js";

// Funções CRUD de partidas

const listaPartidas = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na listagem de partidas: `, error.message || error);
    }
}

const listaPartidaID = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na listagem de partida por ID: `, error.message || error);
    }
}

const registraPartida = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro no registro de nova partida: `, error.message || error);
    }
}

const atualizaPartida = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na atualização de dados de partida: `, error.message || error);
    }
}

const excluiPartida = async (req, res) => {
    try {

    } catch (error){
        console.error(`Erro na exclusão de partida: `, error.message || error);
    }
}

export { listaPartidas, listaPartidaID, registraPartida, atualizaPartida, excluiPartida }