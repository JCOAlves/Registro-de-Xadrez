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

// Relaciona Lider jogador a equipe
Equipe.belongsTo(Jogador, { foreignKey: "liderTime" })

// Tabela de Relacionamento Equipes e Jogadores
Equipe.belongsToMany(Jogador, { 
    through: Equipe_Jogador,
    foreignKey: 'ID_equipe',
    otherKey: 'ID_jogador'
});
Jogador.belongsToMany(Equipe, { 
    through: Equipe_Jogador,
    foreignKey: 'ID_jogador',  
    otherKey: 'ID_equipe'
});

export default Equipe;
export { Equipe_Jogador };
