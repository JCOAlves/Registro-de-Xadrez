//Objeto Jogador com os atributos nome, time, peças e jogadas
export class Jogador{
    constructor(id_jogador, nome, nomeUsuario, nascimento, genero, numero_partidas, vitorias, derrotas, partidas){
        this.id_jogador = id_jogador;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.nascimento = nascimento;
        this.genero = genero;
        this.numero_partidas = numero_partidas;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
        this.partidas = partidas;
    }

    returnID_jogador(){
        return this.id_jogador;
    }

    returnNome(){
        return this.nome;
    }

    returnNomeUsuario(){
        return this.nomeUsuario;
    }

    returnNascimento(){
        return this.nascimento;
    }

    returnGenero(){
        return this.genero;
    }

    returnNumero_partidas(){
        return this.numero_partidas;
    }

    returnVitorias(){
        return this.vitorias;
    }

    returnDerrotas(){
        return this.derrotas;
    }

    returnPartidas(){
        return this.partidas;
    }
};

//Listas de IDs e jogadores
export let lista_ID_jogadores = [];
export let lista_jogadores = [];