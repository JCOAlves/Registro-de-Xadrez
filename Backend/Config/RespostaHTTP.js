// Classe de resposta de requisições HTTP

class RespostaHTTP {
    constructor(sucesso=false, mensagem, erro=mensagem, dados=[], quantidade=1){
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.erro = erro;
        this.dados = dados;
        this.quantidade = dados.length ? dados.length : quantidade;
    }

    RetornaResposta(tipoResposta=""){
        switch(tipoResposta){
            case "returnListDados":
                return {
                    sucesso: this.sucesso, 
                    mensagem: this.mensagem,
                    quantidade: this.quantidade,
                    dados: this.dados, 
                    erro: this.erro
                };
                
            case "returnDado":
                return {
                    sucesso: this.sucesso, 
                    mensagem: this.mensagem,
                    dados: this.dados,
                    erro: this.erro
                };

            default:
                return {
                    sucesso: this.sucesso, 
                    mensagem: this.mensagem,
                    erro: this.erro
                };
        };
    };

    ExibiMensagem(tipoMensagem=""){
        switch(tipoMensagem){
            case "Erro":
                console.error(`${this.mensagem}: ${this.erro}`);
                break;
            default:
                console.log(this.mensagem);
        }
    }

};

export default RespostaHTTP;
