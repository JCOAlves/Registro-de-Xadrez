import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../Models/Usuario.js";
import Jogador from "../Models/Jogador.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";
import bcrypt from "bcrypt";

// Script com funções de Login, confirmLogin e Logout
// Session implementado ao JWT

dotenv.config();

const Login = async (req, res) => {
    try {
        const { emailUsuario, senhaUsuario } = req.body;
        
        if(!emailUsuario && !senhaUsuario){
            const Resposta = new RespostaHTTP(false, "Email e senha não foram fornecidos ao login");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!emailUsuario){
            const Resposta = new RespostaHTTP(false, "Email de usuário não foi fornecido para o login");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        };

        if(!senhaUsuario){
            const Resposta = new RespostaHTTP(false, "Senha de usuário não foi fornecido para o login");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        };

        let loginUsuario = await Usuario.findOne({ where: { emailUsuario: emailUsuario } });

        if(loginUsuario){
            let dadosLogin = {
                ID_usuario: loginUsuario.ID_usuario, nomeUsuario: loginUsuario.nomeUsuario,
                emailUsuario: loginUsuario.emailUsuario, tipoUsuario: loginUsuario.tipoUsuario
            };

            if(loginUsuario.tipoUsuario === "Jogador"){
                const Usuario_jogador = await Jogador.findOne({ where: { ID_usuario: loginUsuario.ID_usuario }, attributes: ['ID_jogador', 'nicknameJogador'] });
                if(Usuario_jogador){
                    loginUsuario.dataValues.ID_jogador = Usuario_jogador.ID_jogador;
                    loginUsuario.dataValues.nicknameJogador = Usuario_jogador.nicknameJogador;
                    dadosLogin.ID_jogador = Usuario_jogador.ID_jogador;
                    dadosLogin.nicknameJogador = Usuario_jogador.nicknameJogador;
                };
            };

            const ResultadoComparacao = await bcrypt.compare(senhaUsuario, loginUsuario.senhaUsuario);
            if(!ResultadoComparacao){
                const Resposta = new RespostaHTTP(false, "Email ou senha de usuário incorretos");
                Resposta.ExibiMensagem();
                return res.status(403).json(Resposta.RetornaResposta());
            }

            // Salvamento de Token na Session do servidor para maior segurança
            const Token = jwt.sign(loginUsuario.toJSON(), process.env.ChaveJWT, { expiresIn: '2h' }); // toJSON converte o objeto Sequelize para JSON
            req.session.JWT = Token;

            const Resposta = new RespostaHTTP(true, "Login de usuário feito com sucesso", null, dadosLogin);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(false, "Email ou senha de usuário incorretos");
            Resposta.ExibiMensagem();
            return res.status(403).json(Resposta.RetornaResposta());
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

        let Usuario_ID = await Usuario.findByPk(req.session.ID_usuario, { attributes: ['ID_usuario', 'nomeUsuario', 'emailUsuario', 'tipoUsuario'] });
        if(verificacaoLogado && Usuario_ID){
            if(Usuario_ID.tipoUsuario === "Jogador"){
                const usuario_jogador = await Jogador.findOne({ where: { ID_usuario: req.session.ID_usuario }, attributes: ['ID_jogador', 'nicknameJogador'] });
                Usuario_ID.dataValues.ID_jogador = usuario_jogador.ID_jogador;
                Usuario_ID.dataValues.nicknameJogador = usuario_jogador.nicknameJogador;
            }

            const Resposta = new RespostaHTTP(true, "Usuário logado no sistema", null, Usuario_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuário relaciona do ID cadastrado no sistema", null);
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
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

        if(logout && req.session){
            req.session.destroy((err) => {
                if(err) {
                    const Resposta = new RespostaHTTP(false, "Erro no logout do usuário do sistema", err);
                    Resposta.ExibiMensagem('Erro');
                    return res.status(500).json(Resposta.RetornaResposta());
                }
                res.clearCookie(process.env.NomeCookie);
                
                const Resposta = new RespostaHTTP(true, "Logout de usuário realizado com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            });

        } else{
            const Resposta = new RespostaHTTP(false, "Sessão não existente", "Sessão não existente");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no logout do usuário no sistema", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const VerificaSenha = async (req, res) => {
    try {
        const { senhaUsuario, ID_usuario } = req.body;

        if(!senhaUsuario){
            const Resposta = new RespostaHTTP(false, "Senha de usuário fornecida invalida para comparação ou não foi fornecida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Usuario_ID = await Usuario.findByPk(ID_usuario, { attributes: ['senhaUsuario'] });
        if(!Usuario_ID){
            const Resposta = new RespostaHTTP(false, "Não há usuário cadastrado no sistema relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        const ResultadoComparacao = await bcrypt.compare(senhaUsuario, Usuario_ID.senhaUsuario);
        if(ResultadoComparacao){
            const Resposta = new RespostaHTTP(true, "Senha de usuário fornecida invalida para comparação ou não foi fornecida", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na verificação de senha de usuário", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
}

export { Login, ConfirmLogin, Logout, VerificaSenha };