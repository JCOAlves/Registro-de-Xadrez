import Usuario from "../Models/Usuario.js";
import Jogador from "../Models/Jogador.js";

// Script com funções de Login, confirmLogin e Logout

const Login = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const ConfirmLogin = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const Logout = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { Login, ConfirmLogin, Logout };