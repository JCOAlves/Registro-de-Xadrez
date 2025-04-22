//Objeto Jogador com os atributos nome, time, peças e jogadas
class Jogador{
    constructor(id_jogador, nome, partidas, vitorias, derrotas, jogadas){
        this.id_jogador = id_jogador;
        this.nome = nome;
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

export default {Jogador};