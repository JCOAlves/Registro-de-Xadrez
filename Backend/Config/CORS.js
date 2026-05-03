import cors from "cors";
import dotenv from "dotenv";

// Arquivo com configurações do CORS
dotenv.config();

const HOST = process.env.HOST_FRONT || "localhost";
const PORT = process.env.PORT_FRONT || 5173;

const configCORS = {
    origin: `http://${HOST}:${PORT}`, // Somente essa origim pode fazer requisições.
    credentials: true, // Permite o envio e recebimento de cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Para o JWT
    optionsSuccessStatus: 200
}

const CORS = cors(configCORS);

export default CORS;
