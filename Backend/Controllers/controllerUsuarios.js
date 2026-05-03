import Jogador from "../Models/Jogador.js";
import Usuario from "../Models/Usuario.js";
import Equipe, { Equipe_Jogador } from "../Models/Equipe.js";
import RespostaHTTP from "../Models/RespostaHTTP.js";
import bcrypt from "bcrypt";

const listaUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuario.findAll();
        if(listaUsuarios.length > 0){
            const Resposta = new RespostaHTTP(true, "Usuários listados com sucesso", null, listaUsuarios);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuários cadastrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuários no sistema", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const lista_tipoUsuarios = async (req, res) => {
    try {
        const { tipoUsuario } = req.params;
        
        if(!["Jogador", "Administrador"].includes(tipoUsuario)){
            const Resposta = new RespostaHTTP(false, "Tipo de usuário fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        let listaUsuario = [];
        switch(tipoUsuario){
            case "Jogador":
                listaUsuario = await Usuario.findAll({ where: { tipoUsuario: "Jogador" } });
                const dadosJogador = await Jogador.findAll();
                listaUsuario.forEach(use => {
                    const { ID_usuario } = use
                    const Jogador_usuario = dadosJogador.find(jog => jog.ID_usuario === ID_usuario);
                    if(Jogador_usuario){
                        use.dataValues.ID_jogador = Jogador_usuario.ID_jogador;
                        use.dataValues.nicknameJogador = Jogador_usuario.nicknameJogador;
                    };
                });
                break;
            case "Administrador":
                listaUsuario = await Usuario.findAll({ where: { tipoUsuario: "Administrador" } });
        }

        if(listaUsuario.length > 0){
            const Resposta = new RespostaHTTP(true, "Usuários listados por tipo feito com sucesso", null, listaUsuario);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnListDados'));
        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuários desse tipo cadastrados no sistema");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuários por tipo", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const listaUsuarioID = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        let Usuario_ID = await Usuario.findByPk(id);
        if(Usuario_ID){
            if(Usuario_ID.tipoUsuario === "Jogador"){
                const Usuario_jogador = await Jogador.findOne({ where: { ID_usuario: id } });
                if(Usuario_jogador){
                    Usuario_ID.dataValues.ID_jogador = Usuario_jogador.ID_jogador;
                    Usuario_ID.dataValues.nicknameJogador = Usuario_jogador.nicknameJogador;
                }
            }

            const Resposta = new RespostaHTTP(true, "Usuário listado por ID com sucesso", null, Usuario_ID);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta('returnDado'));

        } else{
            const Resposta = new RespostaHTTP(false, "Não há usuário relacionado ao ID fornecido");
            Resposta.ExibiMensagem();
            res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuário por ID", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const cadastraUsuario = async (req, res) => {
    try {
        const { tipoUsuario, nomeUsuario, emailUsuario, senhaUsuario, nicknameJogador } = req.body;

        if(!['Jogador', 'Administrador'].includes(tipoUsuario)){
            const Resposta = new RespostaHTTP(false, "Tipo de usuário invalido para o cadastro", error.message || error);
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!nomeUsuario){ 
            const Resposta = new RespostaHTTP(false, "Nome de usuário não fornecido ou nome fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const lista_nomesUsuarios = await Jogador.findAll({ attributes: ['nicknameJogador'] });
        const NomeCadastrado = lista_nomesUsuarios.find(nome => nome.nicknameJogador === nicknameJogador);
        if(NomeCadastrado){
            const Resposta = new RespostaHTTP(false, "Nome de usuário já registrado no sistema");
            Resposta.ExibiMensagem();
            return res.status(409).json(Resposta.RetornaResposta());
        };

        if(!emailUsuario){ 
            const Resposta = new RespostaHTTP(false, "Email de usuário não fornecido ou email fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        if(!senhaUsuario){ 
            const Resposta = new RespostaHTTP(false, "Senha de usuário não fornecida ou senha fornecida invalida");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const saltsRound = 10; // Custo de processamento
        let dadosUsuario = {
            nomeUsuario: nomeUsuario, emailUsuario: emailUsuario, 
            senhaUsuario: senhaUsuario, tipoUsuario: tipoUsuario
        }
        dadosUsuario.senhaUsuario = await bcrypt.hash(senhaUsuario, saltsRound);

        const usuarioCadastrado = await Usuario.create(dadosUsuario);
        if(tipoUsuario === "Jogador" && usuarioCadastrado){
            if(!nicknameJogador){
                const Resposta = new RespostaHTTP(false, "Nickname não fornecido ou nickname fornecido invalido");
                Resposta.ExibiMensagem();
                return res.status(400).json(Resposta.RetornaResposta());
            }
            
            const UsuarioCriado = await Usuario.findOne({ order: [['ID_usuario', 'DESC']] });
            console.log(UsuarioCriado.ID_usuario);
            await Jogador.create({ nicknameJogador: nicknameJogador, ID_usuario: UsuarioCriado.ID_usuario });
            const Resposta = new RespostaHTTP(true, "Usuário jogador cadastrado no sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
            

        } else if(usuarioCadastrado){
            const Resposta = new RespostaHTTP(true, "Usuário administrador cadastrado no sistema com sucesso", null);
            Resposta.ExibiMensagem();
            return res.status(200).json(Resposta.RetornaResposta());
        }
        
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de usuário no sistema", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const atualizaUsuario = async (req, res) => {
    try {
        const { nomeUsuario, emailUsuario, senhaUsuario, nicknameJogador, tipoUsuario } = req.body;
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }
        
        const Usuario_ID = await Usuario.findByPk(id);
        if(Usuario_ID){
            let novosDados = {};
            Usuario_ID.nomeUsuario === nomeUsuario ? null : novosDados.nomeUsuario = nomeUsuario;
            Usuario_ID.emailUsuario === emailUsuario ? null : novosDados.emailUsuario = emailUsuario;
            
            // Comparação de senha antiga com a nova
            const ResultadoComparacao = await bcrypt.compare(senhaUsuario, Usuario_ID.senhaUsuario);
            if(!ResultadoComparacao){
                // Armazena a nova senha de usuário que não é igual a antiga
                const saltsRound = 10;
                novosDados.senhaUsuario = await bcrypt.hash(senhaUsuario_nova, saltsRound);
            }

            const Executar = novosDados.nomeUsuario || novosDados.emailUsuario || novosDados.senhaUsuario;

            if(tipoUsuario === "Jogador" && Executar){
                await Usuario.update(novosDados, { where: { ID_usuario: id } });

                const Jogador_usuario = await Jogador.findAll({ where: { ID_usuario: id } });
                if(!Jogador_usuario){
                    const Resposta = new RespostaHTTP(false, "Não há jogador relacionado ao ID de usuário");
                    Resposta.ExibiMensagem();
                    return res.status(404).json(Resposta.RetornaResposta());
                }
                Jogador_usuario.nicknameJogador === nicknameJogador ? null 
                    : await Jogador.update({ nicknameJogador: nicknameJogador }, { where: { ID_usuario: id } });

                const Resposta = new RespostaHTTP(true, "Dados de usuário atualizados com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
                
            } else if(Executar){
                await Usuario.update(novosDados, { where: { ID_usuario: id } });
                const Resposta = new RespostaHTTP(true, "Dados de usuário atualizados com sucesso", null);
                Resposta.ExibiMensagem();
                return res.status(200).json(Resposta.RetornaResposta());
            }


        } else{
            const Resposta = new RespostaHTTP(true, "Não há usuário cadastrado relacionado ao ID no sistema", null);
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados do usuário", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

const excluiUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            const Resposta = new RespostaHTTP(false, "ID não fornecido ou ID fornecido invalido");
            Resposta.ExibiMensagem();
            return res.status(400).json(Resposta.RetornaResposta());
        }

        const Usuario_ID = await Usuario.findByPk(id);
        if(!Usuario_ID){
            const Resposta = new RespostaHTTP(false, "Não há usuário cadastrado relacionado ao ID");
            Resposta.ExibiMensagem();
            return res.status(404).json(Resposta.RetornaResposta());
        }

        if(Usuario_ID.tipoUsuario === "Jogador"){
            const jogador_usuario = await Jogador.findOne({ where: { ID_usuario: id } });
            if(jogador_usuario){
                await Equipe_Jogador.destroy({ where: { ID_jogador: jogador_usuario.ID_jogador } });
                await Equipe.destroy({ where: { liderEquipe: jogador_usuario.ID_jogador } });
                await Jogador.destroy({ where: { ID_usuario: id } });
            }
        }
        
        await Usuario.destroy({ where: { ID_usuario: id } });

        const Resposta = new RespostaHTTP(true, "Usuário excluido do sistema com sucesso", null);
        Resposta.ExibiMensagem();
        return res.status(200).json(Resposta.RetornaResposta());
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de dados do usuário", error.message || error);
        Resposta.ExibiMensagem('Erro');
        return res.status(500).json(Resposta.RetornaResposta());
    }
};

export { listaUsuarios, lista_tipoUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, excluiUsuario };
