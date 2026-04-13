import connectionDB from "../Config/db.js";
import "./Usuario.js";
import "./Jogador.js";
import "./Jogada.js";
import "./Partida.js";
import "./Evento.js";
import "./Equipe.js";

async function SincronizacaoBD() {
    try {
        // sync({ alter: true }) tenta ajustar as tabelas se elas já existirem
        await connectionDB.sync({ alter: true }); 
        console.log("Todos os modelos foram sincronizados na ordem correta!");
    } catch (error) {
        console.error("Erro ao sincronizar o banco:", error);
    }
};

export default SincronizacaoBD;