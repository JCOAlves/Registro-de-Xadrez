import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RespotaHTTP from "../Models/RespostaHTTP";

dotenv.config();

const ValidacaoToken = async (req, res, next) => {
    try {
        const Token = req.session.JWT; // O Token estará no session
        if(Token){
            const Decodificado = jwt.verify(Token, process.env.ChaveJWT, (err) => {
                if(err){
                    const Resposta = new RespotaHTTP(false, "Session expirou", "Session expirou");
                    Resposta.ExibiMensagem();
                    return res.status(403).send(Resposta.mensagem);
                };
            });
            req.ID_usuario = Decodificado.ID_usuario;
            
            const Resposta = new RespotaHTTP(true, "Token validado", null);
            Resposta.ExibiMensagem();
            next(); // Continua para a função controller

        } else{
            const Resposta = new RespotaHTTP(false, "Não autorizado", "Não autorizado");
            Resposta.ExibiMensagem();
            return res.status(401).send(Resposta.mensagem);
        }
        
    } catch (error) {
        const Resposta = new RespotaHTTP(false, "Erro na verificação de token", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).send(Resposta.mensagem);
    }
};

export default ValidacaoToken;