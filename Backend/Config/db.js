import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const BD_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    typeDB: process.env.DB_TYPE
};

const { database, port, user, password, host, typeDB } = BD_config;
const connectionDB = new Sequelize(database, user, password, {
    host: host, 
    dialect: typeDB,
    port: port, // Não obrigatorio quando segue a porta padrão do banco
    logging: false, // Opcional: desativa o log de SQL no console
    pool: {
        max: 10, // Número máximo de conexões simultâneas
        min: 0, // Número mínimo de conexões que o pool mantém abertas mesmo quando ninguém está usando
        acquire: 30000, // Tempo máximo (em milissegundos) que o Sequelize vai tentar conectar antes de lançar um erro (1000ms = 1s).
        idle: 10000 // Tempo (em milissegundos) que uma conexão pode ficar "ociosa" antes de ser fechada 
    }
});

try {
    await connectionDB.authenticate();
    //Atraso da exibição de mensagem em 1000 milisegundos (1 segundo) no terminal
    setTimeout(() => console.log("Banco de dados MySQL conectado com sucesso."), 1000);

} catch (error){
    setTimeout(() => console.error(`Erro na conexão do banco de dados MySQL: `, error.message || error), 1000);
};

export default connectionDB;