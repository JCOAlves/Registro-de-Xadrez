import connectionDB from "../Config/db.js";
import { DataTypes } from "sequelize";

const Evento = connectionDB.define("evento", {
    ID_evento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEvento: { type: DataTypes.STRING, allowNull: false },
    localEvento: { type: DataTypes.STRING, allowNull: false },
    descricaoEvento: { type: DataTypes.TEXT, allowNull: false },
    data_inicioEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    data_fimEvento: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    hora_inicioEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW },
    hora_fimEvento: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
});


export default Evento;