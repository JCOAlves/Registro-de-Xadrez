import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RespostaHTTP from "../Models/RespostaHTTP.js";

dotenv.config();

const ValidacaoToken = async (req, res, next) => {
    try {
        const Token = req.session.JWT; // O Token estará no session
        if(!Token){
            const Resposta = new RespostaHTTP(false, "Requisição não autorizada", "Token ausente ou expirado");
            Resposta.ExibiMensagem();
            return res.status(401).json(Resposta.RetornaResposta());
            
        } else{
            const Decodificado = jwt.verify(Token, process.env.ChaveJWT);
            req.session.ID_usuario = Decodificado.ID_usuario;
            
            const Resposta = new RespostaHTTP(true, "Token validado", null);
            Resposta.ExibiMensagem();
            next(); // Continua para a função controller
        }
        
    } catch (error) {
        switch(error.name){
            case "TokenExpiredError":
                const Resposta_ExpiredError = new RespostaHTTP(false, "Sessão de usuário expirou", error.message || error);
                Resposta_ExpiredError.ExibiMensagem('Erro');
                return res.status(500).send(Resposta_ExpiredError.RetornaResposta());

            case "JsonWebTokenError":
                const Resposta_TokenError = new RespostaHTTP(false, "Sessão de usuário expirou", error.message || error);
                Resposta_TokenError.ExibiMensagem('Erro');
                return res.status(500).send(Resposta_TokenError.RetornaResposta());

            default: 
                const Resposta = new RespostaHTTP(false, "Erro na verificação de token", error.message || error);
                Resposta.ExibiMensagem('Erro');
                return res.status(500).send(Resposta.RetornaResposta());
        };
    };
};

export default ValidacaoToken;