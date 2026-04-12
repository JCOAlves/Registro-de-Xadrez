import connectionDB from "../Config/db";
import { DataTypes } from "sequelize";
import Jogador from "./Jogador.js";
import Evento from "./Evento.js";

const Partida = connectionDB.define("partida", {
    ID_partida: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dataPartida: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    timeBranco: { type: DataTypes.INTEGER, allowNull: false  },
    timePreto: { type: DataTypes.INTEGER, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFim: { type: DataTypes.TIME, allowNull: false },
    vencedor: { type: DataTypes.ENUM("Time Branco", "Time Preto", "Empate", "Não defenido"), defaultValue: "Não defenido" },
});

// Relacionamento de Jogadores a Partidas
Jogador.belongsToMany(Partida, { foreignKey: "timeBranco" });
Jogador.belongsToMany(Partida, { foreignKey: "timePreto" });

// Relacionamento de Eventos e Partida
Partida.belongsTo(Evento, { foreignKey: "ID_evento" })

(async () => { await Partida.sync() })();

export default Partida;