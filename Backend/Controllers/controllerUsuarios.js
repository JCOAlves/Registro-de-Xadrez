import Jogador from "../Models/Jogador.js";
import Usuario from "../Models/Usuario.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";

const listaUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuario.findAll();
        if(listaUsuarios.length > 0){
            const Resposta = new RespostaHTTP(true, "Usuários listados com sucesso", null, listaUsuarios);
            Resposta.ExibiMensagem();
            res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuários cadastrados no sistema", "Não há usuários cadastrados no sistema");
            Resposta.ExibiMensagem();
            res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuários no sistema", error.message | error);
        Resposta.ExibiMensagem('Erro');
        res.status(500).json(Resposta.RetornaResposta());
    }
};

const lista_tipoUsuarios = async (req, res) => {
    try {
        const { tipoUsuario } = req.params;
        if(!["Jogador", "Administrador"].includes(tipoUsuario)){
            const Resposta = new RespostaHTTP(false, "Tipo de usuário fornecido invalido", "Tipo de usuário fornecido invalido");
            Resposta.ExibiMensagem();
            res.status(400).json(Resposta.RetornaResposta());
        }
        
        let parametrosConsulta = {};
        switch(tipoUsuario){
            case "Jogador":
                parametrosConsulta = {
                    where: { tipoUsuario: "Jogador" },
                    include: {
                        model: Jogador,
                        required: true, // Força o INNER JOIN
                        attributes: ['ID_jogador', 'nicknameJogador']
                    }
                };
                break;
            case "Administrador":
                parametrosConsulta = {
                    where: { tipoUsuario: "Administrador" }
                };
                break;
        }

        const listaUsuario = await Usuario.findAll(parametrosConsulta);
        if(listaUsuario.length > 0){
            const Resposta = new RespostaHTTP(true, "Usuários listados por tipo feito com sucesso", null, listaUsuario);
            Resposta.ExibiMensagem();
            res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuários desse tipo cadastrados no sistema", "Não há usuários desse tipo cadastrados no sistema");
            Resposta.ExibiMensagem();
            res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuários por tipo", error.message | error);
        Resposta.ExibiMensagem('Erro');
        res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaUsuarioID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){

        }

        const Usuario_ID = await Usuario.findByPk(id);
        if(Usuario_ID){

        } else{

        }

    } catch (error) {
        
    }
};

const cadastraUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

const atualizaUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

const excluiUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export { listaUsuarios, lista_tipoUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, excluiUsuario };