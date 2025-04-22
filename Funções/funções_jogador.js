import {Jogador} from "../Objetos/objeto_jogador.js";

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

export default {criarJogador, lista_ID_jogadores, lista_jogadores};