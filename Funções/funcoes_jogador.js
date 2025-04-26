//Objeto Jogador com os atributos nome, time, peças e jogadas
class Jogador{
    constructor(id_jogador, nome, nomeUsuario, nascimento, genero, partidas, vitorias, derrotas, jogadas){
        this.id_jogador = id_jogador;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.nascimento = nascimento;
        this.genero = genero;
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

    returnNomeUsuario(){
        return this.nomeUsuario;
    }

    returnNascimento(){
        return this.nascimento;
    }

    returnGenero(){
        return this.genero;
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
const criarJogador = (nome, nomeUsuario, nascimento, genero, partidas, vitorias, derrotas, jogadas) => {
    let ID_jogador = 1;
    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }

    let jogador = new Jogador(ID_jogador, nome, nomeUsuario, nascimento, genero, partidas, vitorias, derrotas, jogadas);
    lista_ID_jogadores.push(ID_jogador)
    lista_jogadores.push(jogador);
};

criarJogador('Júlio César', 'JC_Oliver', '14/12/2005', 'Masculino', 0, 0, 0, []);

export default {criarJogador, lista_jogadores};