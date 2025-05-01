import { criarJogador } from "../Funcoes/funcoes_jogador.mjs";
import { lista_jogadores } from "../Objetos/objeto_jogador.mjs";

//Funções de validação de campos.
const validaNome = () => {
    const nome = document.getElementById('nome').value;
    if(nome.length < 10){
        document.getElementById('nome').style.borderColor = 'red';
    }else{
        document.getElementById('nome').style.borderColor = 'green';
    }
}

const validaNomeUsuario = () => {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    let lista_nomeUsuario = [];
    for(let y = 0; y < lista_jogadores.length; y++){
        lista_nomeUsuario.push(lista_jogadores[y].nomeUsuario);
    }

    if(nomeUsuario.length < 8 || nomeUsuario.length > 10 || nomeUsuario.includes(' ')){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
       
    } else if(lista_nomeUsuario.includes(nomeUsuario)){
        alert('nome de usuario já existente.')
    }else{
        document.getElementById('nomeUsuario').style.borderColor = 'green';
    }
}

const validaNascimento = () =>{
    const nascimento = new Date(document.getElementById('nascimento').value);
    if(isNaN(nascimento)){
        document.getElementById('nascimento').style.borderColor = 'red';
    }else{
        alert(nascimento)
    }
}

const cadastroJogador = (event) => {
    event.preventDefault();
    criarJogador();
}