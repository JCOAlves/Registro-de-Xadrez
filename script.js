import {criarPartida, lista_ID_partidas, lista_partidas} from "./Funções/funções_partida.js";
import {criarJogador, lista_ID_jogadores, lista_jogadores} from "./Funções/funções_jogador.js"


//Funções de exibição de texto
const exibirTexto = (texto) => {
    document.getElementById('conteudo').innerHTML = texto;
};


