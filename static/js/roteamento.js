import {tela_menu, tela_partida, tela_cadastro, tela_registro_jogador, tela_registro_partida} from "./telas.js";

const tela = document.getElementById("conteudo");
document.addEventListener("DOMContentLoaded", function(){
    tela.innerHTML = tela_menu;
});

const sessoes = document.querySelectorAll(".botao_menu");
    sessoes.forEach( elemento => {
        sessoes.forEach( botao => {
                botao.backgroundColor = "blue";
            })
        elemento.style.backgroundColor = "gray";
        
        elemento.addEventListener("click", function(){
            const elementoClicado = elemento.textContent;
            switch (elementoClicado){
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
        });
    });

const botaoVolta = document.querySelector(".botao_volta");
    botaoVolta.addEventListener("click", function(){
        tela.innerHTML = tela_menu;
    })