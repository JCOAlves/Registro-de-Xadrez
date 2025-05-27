import {tela_menu, tela_cadastro, tela_partida, tela_registro_jogador, tela_registro_partida} from "./telas.mjs";
import {validaNome, validaNomeUsuario, validaNascimento, ValidaForm} from "./Scripts/script_cadastro.mjs";
import {exibirPartidas} from "./Funcoes/funcoes_partida.mjs";
import {exibirJogador} from "./Funcoes/funcoes_jogador.mjs";

document.getElementById('conteudo').innerHTML = tela_menu;

const botaoVolta = () => {
    const botao_volta = document.querySelector('.botao_volta');
    botao_volta.addEventListener('click', () => {
        document.getElementById('conteudo').innerHTML = tela_menu;
        const lista_botoesMenu = document.querySelectorAll('.botao_menu');

        lista_botoesMenu[0].addEventListener('click', () => {
            const partida = exibirPartidas();
            const tabelaPartida = tela_registro_partida.replace('<area partida>', partida)
            document.getElementById('conteudo').innerHTML = tabelaPartida;
            botaoVolta();

            document.querySelector(".cadastraPartida").addEventListener('click', () => {
                document.getElementById('conteudo').innerHTML = tela_partida;
                botaoVolta();
            });
        });

        
        lista_botoesMenu[1].addEventListener('click', () => {
            const jogador = exibirJogador();
            const tabelaJogador = tela_registro_jogador.replace('<area jogador>', jogador)
            document.getElementById('conteudo').innerHTML = tabelaJogador;
            botaoVolta();

            document.querySelector(".cadastraJogador").addEventListener('click', () => {
                document.getElementById('conteudo').innerHTML = tela_cadastro;
                botaoVolta();
        
                document.getElementById('nome').addEventListener('blur', validaNome);
                document.getElementById('nomeUsuario').addEventListener('blur', validaNomeUsuario);
                document.getElementById('nascimento').addEventListener('blur', validaNascimento);
                document.querySelector('form').addEventListener('submit', ValidaForm);
            });
        });
    });
};

const rotacao = () => {
    const lista_botoesMenu = document.querySelectorAll('.botao_menu');

    lista_botoesMenu[0].addEventListener('click', () => {
        const partida = exibirPartidas();
        const tabelaPartida = tela_registro_partida.replace('<area partida>', partida)
        document.getElementById('conteudo').innerHTML = tabelaPartida;
        botaoVolta();

        document.querySelector(".cadastraPartida").addEventListener('click', () => {
            document.getElementById('conteudo').innerHTML = tela_partida;
            botaoVolta();
        });
    });

    lista_botoesMenu[1].addEventListener('click', () => {
        const jogador = exibirJogador();
        const tabelaJogador = tela_registro_jogador.replace('<area jogador>', jogador)
        document.getElementById('conteudo').innerHTML = tabelaJogador;
        botaoVolta();

        document.querySelector(".cadastraJogador").addEventListener('click', () => {
            document.getElementById('conteudo').innerHTML = tela_cadastro;
            botaoVolta();

            document.getElementById('nome').addEventListener('blur', validaNome);
            document.getElementById('nomeUsuario').addEventListener('blur', validaNomeUsuario);
            document.getElementById('nascimento').addEventListener('blur', validaNascimento);
            document.querySelector('form').addEventListener('submit', ValidaForm);
        });
    });
};

rotacao();
