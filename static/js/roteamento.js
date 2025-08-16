import {tela_menu, tela_partida, tela_cadastro} from "./telas.js";

const tela = document.getElementById("conteudo");
document.addEventListener("DOMContentLoaded", function(){
    tela.innerHTML = tela_menu;
});

const sessoes = document.querySelectorAll(".botao_menu");
    sessoes.forEach( elemento => {
        elemento.addEventListener("click", function(){
            const elementoClicado = elemento.textContent;
            switch (elementoClicado){
                case "Partidas":
                    tela.innerHTML = tela_partida;
                    break;
            
                case "Jogadores":
                    tela.innerHTML = tela_cadastro;
                    break;

                default:
                    tela.innerHTML = tela_menu;
                    break;
            }
        });
    });

const botaoVolta = document.querySelector(".botao_volta");
    botaoVolta.addEventListener("click", function(){
        tela.innerHTML = tela_menu;
    })