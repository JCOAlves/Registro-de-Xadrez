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
};

let lista_ID_jogadores = [];
let lista_jogadores = [];

//Função de criação de Jogador
const criarJogador = (nome, partidas, vitorias, derrotas, jogadas) => {
    let ID_jogador = 1;
    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }

    let jogador = new Jogador(ID_jogador, nome, partidas, vitorias, derrotas, jogadas);
    lista_ID_jogadores.push(ID_jogador)
    lista_jogadores.push(jogador);
};

export default {criarJogador};