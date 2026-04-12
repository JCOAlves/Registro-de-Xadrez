import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

// Criar tabela Usuario no MySQL
const Usuario = connectionDB.define("usuario", {
    ID_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeUsuario: { type: DataTypes.STRING, allowNull: false },
    emailUsuario: { type: DataTypes.STRING, allowNull: false },
    senhaUsuario: { type: DataTypes.STRING, allowNull: false },
    tipoUsuario: { type: DataTypes.ENUM("Jogador", "Administrador"), allowNull: false }
});

// Teste se a tabela existe, senão ela cria.
(async () => { await Usuario.sync() })();

export default Usuario;