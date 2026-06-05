// Classe de resposta de requisições HTTP

class RespostaHTTP {
    constructor(sucesso=false, mensagem, erro=mensagem, dados=[], quantidade=0){
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
        const DataAtual = new Date();
        const hora = DataAtual.getHours() < 10 ? `0${DataAtual.getHours()}` : DataAtual.getHours();
        const minuto = DataAtual.getMinutes() < 10 ? `0${DataAtual.getMinutes()}` : DataAtual.getMinutes();
        const segundo = DataAtual.getSeconds() < 10 ? `0${DataAtual.getSeconds()}` : DataAtual.getSeconds();
        const Horario = `[${hora}:${minuto}:${segundo}]`;

        switch(tipoMensagem){
            case "Erro":
                console.error(`${Horario} - ${this.mensagem}: ${this.erro}`);
                break;

            default:
                console.log(`${Horario} - ${this.mensagem}`);
                break;
        }
    }

};

export default RespostaHTTP;
