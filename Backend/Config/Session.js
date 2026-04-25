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
        maxAge: process.env.TempoDuracao_Cookie
    } // Em produção, use secure: true e HTTPOnly. Defina como true se usar HTTPS
};

const Session = session(ConfigSession);

export default Session;