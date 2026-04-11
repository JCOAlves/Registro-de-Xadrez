import connectionDB from "../Config/db";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";
import Equipe from "./Equipe.js";

const Evento = connectionDB.define("Evento", {
    ID_evento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEvento: { type: DataTypes.STRING, allowNull: false },
    localEvento: { type: DataTypes.STRING, allowNull: false },
    data_inicioEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    data_fimEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    hora_inicioEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
    hora_fimEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
});

// Tabela de intermediaria Jogadores e Evento
const JogadoresEvento = connectionDB.define("JogadoresEvento", {
    dataInscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEvento: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: false });
Jogador.belongsToMany(Evento, { through: JogadoresEvento });
Evento.belongsToMany(Jogador, { through: JogadoresEvento });

// Tabela intermediaria Equipes e Evento
const EquipesEvento = connectionDB.define("EquipesEvento", {
    dataInscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEvento: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: false });
Equipe.belongsToMany(Jogador, { through: EquipesEvento });
Jogador.belongsToMany(Equipe, { through: EquipesEvento });

(async () => { 
    await Evento.sync() 
    await JogadoresEvento.sync()
    await EquipesEvento.sync()
})();

export default Evento;