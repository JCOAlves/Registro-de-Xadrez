import {tela_menu, tela_cadastro, tela_partida, tela_registro} from "./telas.mjs";

document.getElementById('conteudo').innerHTML = tela_menu;

const botaoVolta = () => {
    const botao_volta = document.querySelector('.botao_volta');
    botao_volta.addEventListener('click', () => {
        document.getElementById('conteudo').innerHTML = tela_menu;
        const lista_botoesMenu = document.querySelectorAll('.botao_menu');

        lista_botoesMenu[0].addEventListener('click', () => {
            document.getElementById('conteudo').innerHTML = tela_partida;
            botaoVolta();
        });

        lista_botoesMenu[1].addEventListener('click', () => {
            document.getElementById('conteudo').innerHTML = tela_cadastro;
            botaoVolta();
        });

        lista_botoesMenu[2].addEventListener('click', () => {
            document.getElementById('conteudo').innerHTML = tela_registro;
            botaoVolta();
        });
    });
};

const lista_botoesMenu = document.querySelectorAll('.botao_menu');

lista_botoesMenu[0].addEventListener('click', () => {
    document.getElementById('conteudo').innerHTML = tela_partida;
    botaoVolta();
});

lista_botoesMenu[1].addEventListener('click', () => {
    document.getElementById('conteudo').innerHTML = tela_cadastro;
    botaoVolta();
});

lista_botoesMenu[2].addEventListener('click', () => {
    document.getElementById('conteudo').innerHTML = tela_registro;
    botaoVolta();
});


