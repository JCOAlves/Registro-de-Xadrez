import {renderizaDados} from "./renderizacaoDados.js";
import {formularios} from "./formularios.js";

async function roteamentoMenu(tela, sessoes){
    sessoes.forEach(elemento => {
        elemento.style.backgroundColor = "blue";   
    })

    sessoes.forEach( elemento => {       
        elemento.addEventListener("click", async function(){
        const elementoClicado = elemento.textContent;
            switch (elementoClicado){
                case "Inicial":
                    await renderizaDados(tela, "inicial");
                    elemento.style.backgroundColor = "gray";
                    break;

                case "Partidas":
                    await renderizaDados(tela, "partidas");
                    elemento.style.backgroundColor = "gray";
                    break;
            
                case "Jogadores":
                    await renderizaDados(tela, "jogadores");
                    elemento.style.backgroundColor = "gray";
                    break;

                default:
                    await renderizaDados(tela, "inicial");
                    break;
            };
        });
    });
};

document.addEventListener("DOMContentLoaded", async function(){
    const tela = document.getElementById("conteudo");
    await renderizaDados(tela, "inicial");

    const sessoes = document.querySelectorAll(".botao_menu");
    await roteamentoMenu(tela, sessoes); 

    const botaoOpcoes = document.querySelectorAll(".botaoOpcao");
    botaoOpcoes.forEach( botao => {
        botao.addEventListener("click", function(){
            const botaoClicado = botao.textContent;
            formularios(tela, botaoClicado);
        })
    })
});