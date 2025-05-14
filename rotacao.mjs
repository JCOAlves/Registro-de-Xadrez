import {tela_menu, tela_cadastro, tela_partida, tela_registro} from "./telas.mjs";
import {validaNome, validaNomeUsuario, validaNascimento, ValidaForm} from "./Scripts/script_cadastro.mjs";

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

            document.getElementById('nome').addEventListener('blur', validaNome);
            document.getElementById('nomeUsuario').addEventListener('blur', validaNomeUsuario);
            document.getElementById('nascimento').addEventListener('blur', validaNascimento);
            document.querySelector('form').addEventListener('submit', ValidaForm);
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

    document.getElementById('nome').addEventListener('blur', validaNome);
    document.getElementById('nomeUsuario').addEventListener('blur', validaNomeUsuario);
    document.getElementById('nascimento').addEventListener('blur', validaNascimento);
    document.querySelector('form').addEventListener('submit', ValidaForm);
    // Use 'submit' no formulário, não 'onclick' no botão (melhor prática)
});

lista_botoesMenu[2].addEventListener('click', () => {
    document.getElementById('conteudo').innerHTML = tela_registro;
    botaoVolta();
});


