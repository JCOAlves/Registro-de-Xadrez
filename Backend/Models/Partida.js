import connectionDB from "../Config/db";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";

const Partida = connectionDB.define("Partida", {
    ID_partida: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dataPartida: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    timeBranco: { type: DataTypes.INTEGER, allowNull: false  },
    timePreto: { type: DataTypes.INTEGER, allowNull: false },
    horaInicio: {},
    horaFim: { },
    vencedor: { type: DataTypes.ENUM("Time Branco", "Time Preto", "Empate", "Não defenido"), defaultValue: "Não defenido" },
    Evento: {}
});

// Relacionamento de Jogadores a Partidas
Jogador.belongsToMany(Partida, { foreignKey: "timeBranco" });
Jogador.belongsToMany(Partida, { foreignKey: "timePreto" });

(async () => { await Partida.sync() })();

export default Partida;