import {Partida, Jogador, Jogada} from "./objetos.js";

let lista_ID_partidas = [];
let lista_partidas = [];

let lista_ID_jogadores = [];
let lista_jogadores = [];

const criarPartida = () => {
    let ID_partida = 1;
    if(lista_ID_partidas.includes(ID_partida)){
        ID_partida += 1;
    }

    const dia = new Date().getDay();
    const mes = new Date().getMonth();
    const ano = new Date().getFullYear();
    const data = `${dia}/${mes}/${ano}`;

    const hora = new Date().getHours();
    const minuto = new Date().getMinutes();
    const horario = `${hora}:${minuto}`;

    let partida = new Partida(ID_partida, data, horario, );
    lista_partidas.push(partida);
};
    
const criarJogador = () => {
    let ID_jogador = 1;

    const nome = document.getElementById('nome').value;
  
    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }
    let jogador = new Jogador(ID_jogador, nome, 'Branco', ['peão','peão','peão','peão','peão','peão','peão','peão','peão', 'torre','torre', 'cavalo','cavalo', 'bispo','bispo', 'rainha', 'rei'], [], 0, 0, []);
    lista_ID_jogadores.push(ID_jogador)

    lista_jogadores.push(jogador);
 
    alert('Jogadores cadastrados com sucesso.')
    alert(lista_ID_jogadores)
    exibirTexto(tela_inicial)
};


//Funções de exibição de texto
const exibirTexto = (texto) => {
    document.getElementById('conteudo').innerHTML = texto;
};

let opção_jogadores = `<option value="">-----</option>`;
for(let x = 0; x<lista_jogadores.length; x++){
    const nome_jogador = lista_jogadores[x].returnNome();
    opção_jogadores = opção_jogadores+`<option value="">${nome_jogador}</option>`
}
const tela_seleciona_jogadores = `<select>${opção_jogadores}</select><select>${opção_jogadores}</select>`
