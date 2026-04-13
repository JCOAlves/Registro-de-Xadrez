import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

// Fazer alterações na tabela
const Jogador = connectionDB.define("jogador", {
    ID_jogador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeUsuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    pontuacaoJogador: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
    Usuario: { type: DataTypes.INTEGER, allowNull: false }
});


export default Jogador;