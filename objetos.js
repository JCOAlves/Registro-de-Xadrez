//Objeto Jogada com os atributos peça, casa, peça eliminada
class Jogada{
    constructor(peca, casa, pecaEliminada){
        this.peca = peca;
        this.casa = casa;
        this.pecaEliminada = pecaEliminada;
    }

    returnPeca(){
        return this.peca;
    }

    returncasa(){
        return this.casa;
    }

    returnpecaeliminada(){
        return this.pecaEliminada;
    }
}

//Ojeto Jogador com os atributos nome, time, peças e jogadas
class Jogador{
    constructor(nome, time, pecas, jogadas){
        this.nome = nome;
        this.time = time;
        this.pecas = pecas;
        this.jogadas = [];
    }

    returnNome(){
        return this.nome;
    }

    returnTime(){
        return this.time;
    }

    returnPecas(){
        return this.pecas;
    }

    returnJogadas(){
        return this.jogadas;
    }
}

//Objeto Partida com os atributos data, horario, duracao, jogador_brancas, jogador_pretas, jogadas_partida, vencedor
class Partida{
    constructor(data, horario, duracao, jogador_brancas, jogador_pretas, jogadas_partida, vencedor){
        this.data = data;
        this.horario = horario;
        this.duracao = duracao;
        this.jogador_brancas = jogador_brancas;
        this.jogador_pretas = jogador_pretas;
        this.jogadas_partida = [];
        this.vencedor = vencedor;
    }

    returnData(){
        return this.data;
    }

    returnHorario(){
        return this.horario;
    }

    returnDuracao(){
        return this.duracao;
    }

    returnJogador_brancas(){
        return this.jogador_brancas
    }

    returnJogador_pretas(){
        return this.jogador_pretas;
    }

    returnJogadas_partida(){
        return this.jogadas_partida;
    }

    returnVencedor(){
        return this.vencedor;
    }
}

export default {Partida, Jogada, Jogador};