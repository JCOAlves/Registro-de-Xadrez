import connectionDB from "../Config/db.js";
import Usuario from "./Usuario.js";
import Jogador from "./Jogador.js";
import Jogada from "./Jogada.js";
import Partida from "./Partida.js";
import Evento from "./Evento.js";
import Equipe from "./Equipe.js";

// Relacionamento de Jogadores a Partidas
Partida.belongsTo(Jogador, { foreignKey: "timeBranco" });
Partida.belongsTo(Jogador, { foreignKey: "timePreto" });

Partida.belongsTo(Evento, { foreignKey: "ID_evento" });


// Relacionamento de Jogador a Usuario
Jogador.belongsTo(Usuario, { foreignKey: 'ID_usuario' });


// Relacionamento Jogada a Partida
Jogada.belongsTo(Partida, { foreignKey: "ID_partida" });


const Equipe_Jogador = connectionDB.define("equipe_jogador", {
    ID_relacionamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
}, { timestamps: false });

// Tabela de Relacionamento Equipes e Jogadores
Equipe.belongsToMany(Jogador, { through: Equipe_Jogador });
Jogador.belongsToMany(Equipe, { through: Equipe_Jogador });


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


async function IniciacaoBD(params) {
    try {
        // sync({ alter: true }) tenta ajustar as tabelas se elas já existirem
        await connectionDB.sync(); 
        console.log("Todos os modelos foram sincronizados na ordem correta!");
    } catch (error) {
        console.error("Erro ao sincronizar o banco:", error);
    }
}