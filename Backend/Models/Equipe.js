import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

const Equipe = connectionDB.define("equipe", {
    ID_equipe: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEquipe: { type: DataTypes.STRING, allowNull: false, unique: true },
    dataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEquipe: { type: DataTypes.INTEGER, defaultValue: 0 }
});


export default Equipe;
