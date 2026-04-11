import connectionDB from "../Config/db";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";

const Equipe = connectionDB.define("Equipe", {
    ID_equipe: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEquipe: { type: DataTypes.STRING, allowNull: false, unique: true },
    descricaoEvento: { type: DataTypes.TEXT, allowNull: false },
    dataCriacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEquipe: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Equipe_Jogador = connectionDB.define("Equipe_Jogador", {
    ID_relacionamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, { timestamps: false });

// Tabela de Relacionamento Equipes e Jogadores
Equipe.belongsToMany(Jogador, { through: Equipe_Jogador }, { timestamp: false });
Jogador.belongsToMany(Equipe, { through: Equipe_Jogador }, { timestamp: false })

(async () => { 
    await Equipe.sync() 
    await Equipe_Jogador.sync()
})();

export default Equipe;