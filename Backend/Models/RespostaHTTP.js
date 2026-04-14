// Classe de resposta de requisições HTTP

class Resposta {
    constructor(sucesso, mensagem, erro){
        this.sucesso = sucesso ? true : false;
        this.mensagem = mensagem;
        this.erro = erro ? erro : null;
    }
};

export default Resposta;
