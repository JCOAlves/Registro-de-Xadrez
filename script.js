import {criarPartida, lista_ID_partidas, lista_partidas} from "./Funções/funcoes_partida.js";
import {criarJogador, lista_ID_jogadores, lista_jogadores} from "./Funções/funcoes_jogador.js";



//Funções de exibição de texto
const exibirTexto = (texto) => {
    document.getElementById('conteudo').innerHTML = texto;
};


