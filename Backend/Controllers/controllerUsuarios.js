import Jogador from "../Models/Jogador.js";
import Usuario from "../Models/Usuario.js";

const listaUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuario.findAll();
        if(listaUsuarios.length > 0){
            res.status(404).json()
        } else{
            res.status(404).json()
        }
        
    } catch (error) {
        res.status(500).json()
    }
};

const lista_tipoUsuarios = async (req, res) => {
    try {
        const { tipoUsuario } = req.params;
        if(!["Jogador", "Administrador"].includes(tipoUsuario)){
            
        } 
        
        let listaUsuario = [];
        switch(tipoUsuario){
            case "Jogador":
                listaUsuario = await Usuario.findAll({
                    where: { tipoUsuario: "Jogador" },
                    include: {
                        model: Jogador,
                        required: true, // Força o INNER JOIN
                        attributes: ['ID_jogador', 'nicknameJogador']
                    }
                });
                break;
            case "Administrador":
                listaUsuario = await Usuario.findAll({
                    where: { tipoUsuario: "Administrador" }
                });
                break;
        }

        if(listaUsuario.length > 0){

        } else{

        }

    } catch (error) {
        
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