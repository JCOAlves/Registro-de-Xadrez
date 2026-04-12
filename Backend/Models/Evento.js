import connectionDB from "../Config/db";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";
import Equipe from "./Equipe.js";

const Evento = connectionDB.define("evento", {
    ID_evento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEvento: { type: DataTypes.STRING, allowNull: false },
    localEvento: { type: DataTypes.STRING, allowNull: false },
    data_inicioEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    data_fimEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    hora_inicioEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
    hora_fimEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
});

// Tabela de intermediaria Jogadores e Evento
const Jogadores_Evento = connectionDB.define("jogadores_evento", {
    dataInscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEvento: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: false });
Jogador.belongsToMany(Evento, { through: Jogadores_Evento });
Evento.belongsToMany(Jogador, { through: Jogadores_Evento });

// Tabela intermediaria Equipes e Evento
const Equipes_Evento = connectionDB.define("equipes_evento", {
    dataInscricao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    pontuacaoEvento: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: false });
Equipe.belongsToMany(Jogador, { through: Equipes_Evento });
Jogador.belongsToMany(Equipe, { through: Equipes_Evento });

(async () => { 
    await Evento.sync() 
    await Jogadores_Evento.sync()
    await Equipes_Evento.sync()
})();

export default Evento;
export { Equipes_Evento, Jogadores_Evento };