import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Partida from "./Partida.js";

const Jogada = connectionDB.define("jogada", {
    ID_jogada: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pecaJogada: { type: DataTypes.ENUM("Peão", "Cavalo", "Torre", "Bispo", "Rainha", "Rei"), allowNull: false },
    casaJogada: { type: DataTypes.STRING, allowNull: false },
    pecaEliminada: { type: DataTypes.ENUM("Peão", "Cavalo", "Torre", "Bispo", "Rainha", "Rei", "Nenhuma"), defaultValue: "Nenhuma" },
    horaJogada: { type: DataTypes.TIME,  defaultValue: DataTypes.NOW }
});

Jogada.belongsTo(Partida, { foreignKey: "ID_partida" });

(async () => { await Jogada.sync() })();

export default Jogada;