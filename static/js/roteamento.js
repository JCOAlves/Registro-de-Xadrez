import {tela_menu, tela_registro_jogador, tela_registro_partida} from "./telas.js";

document.addEventListener("DOMContentLoaded", function(){
    alert("ola mundo");
})

function carregaElementos(tela, tipo){
    switch (tipo){
        case "Inicial":
            tela.innerHTML = tela_menu;
            break;

        case "Partidas":
            tela.innerHTML = tela_registro_partida;
            break;
            
        case "Jogadores":
            tela.innerHTML = tela_registro_jogador;
            break;

        default:
            tela.innerHTML = tela_menu;
            break;
    }
}

const tela = document.getElementById("conteudo");
carregaElementos(tela, "Inicial");

const sessoes = document.querySelectorAll(".botao_menu");
sessoes.forEach( elemento => {        
    elemento.addEventListener("click", function(){
        const elementoClicado = elemento.textContent;
        carregaElementos(tela, elementoClicado);
    });
});