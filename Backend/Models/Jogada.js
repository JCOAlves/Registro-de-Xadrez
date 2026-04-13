import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

const Jogada = connectionDB.define("jogada", {
    ID_jogada: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pecaJogada: { type: DataTypes.ENUM("Peão", "Cavalo", "Torre", "Bispo", "Rainha", "Rei"), allowNull: false },
    casaJogada: { type: DataTypes.STRING, allowNull: false },
    pecaEliminada: { type: DataTypes.ENUM("Peão", "Cavalo", "Torre", "Bispo", "Rainha", "Rei", "Nenhuma"), defaultValue: "Nenhuma" },
    horaJogada: { type: DataTypes.TIME,  defaultValue: DataTypes.NOW }
});


export default Jogada;