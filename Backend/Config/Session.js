import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const ConfigSession = {
    name: process.env.NomeCookie || "sesssionRX.id", // Nome do cookie
    secret: process.env.ChaveSESSION || "fhertuiretjgir", // Essencial para assinar o cookie. Substitua por uma string segura
    resave: false, // Salva a sessão mesmo se não modificada
    saveUninitialized: false, // Salva sessão para usuários não logados
    cookie: {
        httpOnly: true, // Bloqueia o acesso ao cookie via JavaScript do navegador
        secure: false, // Mantenha false se estiver usando HTTP (localhost)
        maxAge: 60*60*1000*2 // 2 horas de duração sem atividade
    }
};

const Session = session(ConfigSession);

export default Session;