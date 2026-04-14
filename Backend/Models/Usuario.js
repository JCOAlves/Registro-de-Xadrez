import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

// Criar tabela Usuario no MySQL
const Usuario = connectionDB.define("usuario", {
    ID_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeUsuario: { type: DataTypes.STRING, allowNull: false },
    emailUsuario: { type: DataTypes.STRING, allowNull: false },
    senhaUsuario: { type: DataTypes.STRING, allowNull: false },
    tipoUsuario: { type: DataTypes.ENUM("Jogador", "Administrador"), allowNull: false }
}, {
    // Por padrão o Sequelize plurariza o nome das tabelas
    tableName: "usuario", // Nome EXATO da tabela no seu MySQL
    freezeTableName: true, // Impede o Sequelize de pluralizar
    timestamps: false // Isso impede o Sequelize de tentar criar as colunas de data automaticamente
});


export default Usuario;