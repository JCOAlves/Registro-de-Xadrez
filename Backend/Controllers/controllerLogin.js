import Usuario from "../Models/Usuario.js";
import Jogador from "../Models/Jogador.js";
import session from "express-session";
import RespostaHTTP from "../Models/RespostaHTTP.js";

// Script com funções de Login, confirmLogin e Logout

const Login = async (req, res) => {
    try {
        const { emailUsuario, senhaUsuario } = req.body;

        if(!emailUsuario){
            const Resposta = new RespostaHTTP(false, "Email de usuário não foi fornecido para o login", "Email de usuário não foi fornecido para o login");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        };

        if(!senhaUsuario){
            const Resposta = new RespostaHTTP(false, "Senha de usuário não foi fornecido para o login", "Senha de usuário não foi fornecido para o login");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        };

        let loginUsuario = await Usuario.findOne({ 
            where: { emailUsuario: emailUsuario, senhaUsuario: senhaUsuario }, 
            attributes: ['ID_usuario', 'nomeUsuario', 'emailUsuario', 'tipoUsuario'] 
        });
        if(loginUsuario){
            req.session.ID_usuario = loginUsuario.ID_usuario;
            req.session.nomeUsuario = loginUsuario.nomeUsuario;
            req.session.emailUsuario = loginUsuario.emailUsuario;
            req.session.tipoUsuario = loginUsuario.tipoUsuario;
            if(loginUsuario.tipoUsuario === "Jogador"){
                const Usuario_jogador = await Jogador.findOne({ where: { ID_usuario: loginUsuario.ID_usuario } });
                if(Usuario_jogador){
                    req.session.nicknameJogador = Usuario_jogador.nicknameJogador;
                    loginUsuario.dataValues.nicknameJogador = Usuario_jogador.nicknameJogador;
                }
            };

            const Resposta = new RespostaHTTP(true, "Login de usuário feito com sucesso", null, loginUsuario);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(true, "Não há usuário cadastrado relacionado ao email e senha fornecidos", null);
            Resposta.ExibiMensagem('Erro');
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no login do usuário ao sistema", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const ConfirmLogin = async (req, res) => {
    try {
        const { verificacaoLogado=true } = req.body;
        
        const { ID_usuario, emailUsuario, tipoUsuario, nomeUsuario } = req.session;
        const dadosSessao = ID_usuario && emailUsuario && emailUsuario && nomeUsuario;

        if(verificacaoLogado && dadosSessao){
            let Usuario_ID = await Usuario.findByPk(ID_usuario, { attributes: ['ID_usuario', 'nomeUsuario', 'emailUsuario', 'tipoUsuario'] });
            if(Usuario_ID.tipoUsuario === "Jogador"){
                const Usuario_jogador = await Jogador.findOne({ where: { ID_usuario: ID_usuario }, attributes: ['nicknameJogador'] });
                Usuario_jogador ? Usuario_ID.dataValues.nicknameJogador = Usuario_jogador.nicknameJogador : null;
            }

            const Resposta = new RespostaHTTP(true, "Usuário logado no sistema", null, Usuario_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuário logado no sistema", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na verificação de login do usuário no sistema", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const Logout = async (req, res) => {
    try {
        const { logout=true } = req.body;

        req.session.destroy((err) => {
            if(err) {
                const Resposta = new RespostaHTTP(false, "Erro no logout do usuário do sistema", err);
                Resposta.ExibiMensagem('Erro');
                return res.status(500).json(Resposta.RetornaResposta());
            }

            res.clearCookie('registerXadrez');
            const Resposta = new RespostaHTTP(true, "Logout de usuário realizado com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(500).json(Resposta.RetornaResposta());
        });
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no logout do usuário no sistema", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { Login, ConfirmLogin, Logout };