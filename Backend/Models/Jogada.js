import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Partida from "./Partida.js";

const Jogada = connectionDB.define("jogada", {
    ID_jogada: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pecaJogada: { type: DataTypes.ENUM("Peão", "Cavalo", "Torre", "Bispo", "Rainha", "Rei"), allowNull: false },
    timeJogada: { type: DataTypes.ENUM("Time Branco", "Time Preto"), allowNull: false }, 
    casaJogada: { type: DataTypes.STRING, allowNull: false },
    pecaEliminada: { type: DataTypes.ENUM("Peão", "Cavalo", "Torre", "Bispo", "Rainha", "Rei", "Nenhuma"), defaultValue: "Nenhuma" },
    horaJogada: { type: DataTypes.TIME,  defaultValue: DataTypes.NOW }
}, {
    tableName: "jogada",
    freezeTableName: true,
    timestamps: false
});

// Relacionamento Jogada a Partida
Jogada.belongsTo(Partida, { foreignKey: "ID_partida" });

export default Jogada;