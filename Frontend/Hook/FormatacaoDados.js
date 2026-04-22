//Funções de formatação de dados.

function PronomesJogador(generoJogador) {
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

export { PronomesJogador }