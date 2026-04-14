import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Usuario from "./Usuario.js";

// Fazer alterações na tabela
const Jogador = connectionDB.define("jogador", {
    ID_jogador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nicknameJogador: { type: DataTypes.STRING, allowNull: false, unique: true },
    pontuacaoJogador: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
}, {
    // Por padrão o Sequelize plurariza o nome das tabelas
    tableName: "jogador", // Nome EXATO da tabela no seu MySQL
    freezeTableName: true, // Impede o Sequelize de pluralizar
    timestamps: false
});

// Relacionamento de Jogador a Usuario
Jogador.belongsTo(Usuario, { foreignKey: 'ID_usuario' });

export default Jogador;