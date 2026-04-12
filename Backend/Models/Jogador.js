import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Usuario from "./Usuario.js";

// Fazer alterações na tabela
const Jogador = connectionDB.define("jogador", {
    ID_jogador: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeUsuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    pontuacaoJogador: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 0 },
    Usuario: { type: DataTypes.INTEGER, allowNull: false }
});

// Relacionamento de Jogador a Usuario
Jogador.belongsTo(Usuario, { foreignKey: 'ID_usuario' });

(async () => { await Jogador.sync() })();

export default Jogador;