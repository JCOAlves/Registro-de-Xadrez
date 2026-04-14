import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";

const Equipe = connectionDB.define("equipe", {
    ID_equipe: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEquipe: { type: DataTypes.STRING, allowNull: false, unique: true },
    dataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEquipe: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: "equipe",
    freezeTableName: true,
    timestamps: false
});

const Equipe_Jogador = connectionDB.define("equipe_jogador", {
    ID_relacionamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, { 
    tableName: "equipe_jogador",
    freezeTableName: true,
    timestamps: false
});

// Tabela de Relacionamento Equipes e Jogadores
Equipe.belongsToMany(Jogador, { through: Equipe_Jogador });
Jogador.belongsToMany(Equipe, { through: Equipe_Jogador });

export default Equipe;
export { Equipe_Jogador };
