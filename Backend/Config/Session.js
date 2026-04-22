import session from "express-session";

const ConfigSession = {
    name: 'registerXadrez', // Nome do cookie
    secret: 'breut5y498t754ugh857t94308tru354yht9348trerh984r329rt4', // Essencial para assinar o cookie. Substitua por uma string segura
    resave: true, // Salva a sessão mesmo se não modificada
    saveUninitialized: true, // Salva sessão para usuários não logados
    cookie: { secure: true } // Em produção, use secure: true e HTTPOnly. Defina como true se usar HTTPS
};

const Session = session(ConfigSession);

export default Session;