import {criaJogador} from "../Funções/funcoes_jogador.js";

//Funções de validação dos campos
const validaNome = () => {
    const nome = document.getElementById('nome').value;
    if(nome.length < 10){
        document.getElementById('nome').style.borderColor = 'red';
        alert('Nome invalido.');
    }
}

const validaNomeUsuario = () => {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    if(nomeUsuario.length < 8 || nomeUsuario.length > 10 || nomeUsuario.includes(' ')){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        alert('Nome de Usuario invalido.');
    }
}

/*const validaNascimento = () =>{
    const data = new Date(document.getElementById('nascimento').value);
    let dia = Number(data.getUTCDate());
    if(dia < 10){
        dia = "0"+dia
    }

    let mes = Number(data.getUTCMonth())+1;
    if(mes < 10){
        mes = "0"+mes
    }

    let ano = data.getUTCFullYear();

    const nascimento = `${dia}/${mes}/${ano}`;
    alert(nascimento);
}*/

const cadastroJogador = (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const nascimento = new Date(document.getElementById('nascimento').value);
    const genero = document.getElementById('genero').value;
    criaJogador()
}


