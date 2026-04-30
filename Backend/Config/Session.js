import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const ConfigSession = {
    name: process.env.NomeCookie, // Nome do cookie
    secret: process.env.ChaveSESSION, // Essencial para assinar o cookie. Substitua por uma string segura
    resave: false, // Salva a sessão mesmo se não modificada
    saveUninitialized: true, // Salva sessão para usuários não logados
    cookie: {
        httpOnly: true, // Bloqueia o acesso ao cookie via JavaScript do navegador
        secure: true,
        maxAge: 60*60*1000*2 // 2 horas
    }
};

const Session = session(ConfigSession);

export default Session;