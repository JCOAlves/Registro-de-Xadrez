import connectionDB from "./db.js";
import "../Models/Usuario.js";
import "../Models/Jogador.js";
import "../Models/Jogada.js";
import "../Models/Partida.js";
import "../Models/Evento.js";
import "../Models/Equipe.js";

async function SincronizacaoBD() {
    try {
        // 'alter' tenta ajustar as tabelas se elas já existirem
        await connectionDB.sync({ alter: true }); 
        setTimeout(() => console.log("Modelos Sequelize sincronizados."), 2000);
       
    } catch (error) {
        setTimeout(() => console.error("Erro ao sincronizar o banco:", error), 2000);
    }
};

export default SincronizacaoBD;