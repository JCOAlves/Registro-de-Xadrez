import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";
import Evento from "./Evento.js";

const Partida = connectionDB.define("partida", {
    ID_partida: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dataPartida: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFim: { type: DataTypes.TIME, allowNull: false },
    vencedor: { type: DataTypes.ENUM("Time Branco", "Time Preto", "Empate", "Não defenido"), defaultValue: "Não defenido" },
});

// Relacionamento de Jogadores a Partidas
Partida.belongsTo(Jogador, { foreignKey: "timeBranco" });
Partida.belongsTo(Jogador, { foreignKey: "timePreto" });

// Relacionamento de Eventos e Partida
Partida.belongsTo(Evento, { foreignKey: "ID_evento" })

(async () => { 
    await Jogador.sync()
    await Evento.sync()
    await Partida.sync() 
})();

export default Partida;