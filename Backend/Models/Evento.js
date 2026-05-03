import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";
import Equipe from "./Equipe.js";

const Evento = connectionDB.define("evento", {
    ID_evento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEvento: { type: DataTypes.STRING, allowNull: false },
    localEvento: { type: DataTypes.STRING, allowNull: false },
    descricaoEvento: { type: DataTypes.TEXT, allowNull: false },
    modalidadeEvento: { type: DataTypes.ENUM('Individual', 'Equipes', 'Individual e Equipes'), allowNull: false },
    data_inicioEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    data_fimEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    hora_inicioEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
    hora_fimEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
}, {
    tableName: "evento",
    freezeTableName: true,
    timestamps: false
});

// Tabela de intermediaria Jogadores e Evento
const Jogadores_Evento = connectionDB.define("jogadores_evento", {
    ID_relacionamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dataInscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEvento: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { 
    tableName: "jogadores_evento",
    freezeTableName: true,
    timestamps: false
});

Jogador.belongsToMany(Evento, { 
    through: Jogadores_Evento,
    foreignKey: 'ID_jogador', 
    otherKey: 'ID_evento'
});
Evento.belongsToMany(Jogador, { 
    through: Jogadores_Evento,
    foreignKey: 'ID_evento',
    otherKey: 'ID_jogador'
});

// Tabela intermediaria Equipes e Evento
const Equipes_Evento = connectionDB.define("equipes_evento", {
    ID_relacionamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dataInscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEvento: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { 
    tableName: "equipes_evento",
    freezeTableName: true,
    timestamps: false
});

Equipe.belongsToMany(Jogador, { 
    through: Equipes_Evento,
    foreignKey: 'ID_equipe', 
    otherKey: 'ID_jogador'
});
Jogador.belongsToMany(Equipe, { 
    through: Equipes_Evento,
    foreignKey: 'ID_jogador', 
    otherKey: 'ID_equipe'
});

export default Evento;
export { Jogadores_Evento, Equipes_Evento };