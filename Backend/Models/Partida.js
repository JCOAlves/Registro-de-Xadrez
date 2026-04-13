import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

const Partida = connectionDB.define("partida", {
    ID_partida: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dataPartida: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFim: { type: DataTypes.TIME, allowNull: false },
    vencedor: { type: DataTypes.ENUM("Time Branco", "Time Preto", "Empate", "Não defenido"), defaultValue: "Não defenido" },
});


export default Partida;