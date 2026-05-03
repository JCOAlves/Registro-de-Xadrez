//Funções de formatação e validação de dados.

class ValidacaoDados {
    Formata_PronomesJogador(generoJogador){
        switch (generoJogador) {
            case "Masculino":
                return "ele/dele";
            case "Feminino":
                return "ela/dela";
            case "Não-Binario":
                return "elu/delu";
            default:
                return null;
        }
    };

    ValidaEmail(email, validacao){
        if(email.includes("@") && email.includes(".com")){
            return validacao(true);

        } else{
            return validacao(false);
        }
    };

    ValidaData(data, validacao){
        if(data){

        } else{

        }
    };

}

export default ValidacaoDados;