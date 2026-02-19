import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const BD_config = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Máximo de 10 conexões simultâneas
    queueLimit: 0
}

const pool = mysql.createPool(BD_config);

try {
    const connection = await pool.getConnection();
    console.log("Banco de dados MySQL conectado com sucesso.");
    connection.release() // Devolve a conexão para o pool

} catch (error){
    console.error(`Erro na conexão do banco de dados MySQL: ${error.message || error}`)
}

export default pool;