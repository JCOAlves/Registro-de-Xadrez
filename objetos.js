//Objeto Jogada com os atributos peça, casa, peça eliminada
class Jogada{
    constructor(id_jogada, peca, casa, pecaEliminada){
        this.id_jogada = id_jogada;
        this.peca = peca;
        this.casa = casa;
        this.pecaEliminada = pecaEliminada;
    }

    returnID_jogada(){
        return this.id_jogada;
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
    constructor(id_jogador, nome, pecas, partidas, vitorias, derrotas, jogadas){
        this.id_jogador = id_jogador;
        this.nome = nome;
        this.pecas = pecas;
        this.partidas = partidas;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
        this.jogadas = [];
        
    }

    returnID_jogador(){
        return this.id_jogador;
    }

    returnNome(){
        return this.nome;
    }

    returnPecas(){
        return this.pecas;
    }

    returnPartidas(){
        return this.partidas;
    }

    returnVitorias(){
        return this.vitorias;
    }

    returnDerrotas(){
        return this.derrotas;
    }

    returnJogadas(){
        return this.jogadas;
    }
}

//Objeto Partida com os atributos data, horario, duracao, jogador_brancas, jogador_pretas, jogadas_partida, vencedor
class Partida{
    constructor(id_partida, data, horario, jogador_brancas, jogador_pretas, jogadas_partida, vencedor){
        this.id_partida = id_partida;
        this.data = data;
        this.horario = horario;
        this.jogador_brancas = jogador_brancas;
        this.jogador_pretas = jogador_pretas;
        this.jogadas_partida = [];
        this.vencedor = vencedor;
    }
    returnID_partida(){
        return this.id_partida;
    }

    returnData(){
        return this.data;
    }

    returnHorario(){
        return this.horario;
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

export default {Partida, Jogador, Jogada}