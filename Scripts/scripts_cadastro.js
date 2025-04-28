//import { criarJogador, lista_jogadores } from "../Funções/funcoes_jogador.js";

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
    let lista_nomeUsuario = [];
    /*for(let y = 0; y < lista_jogadores.length; y++){
        lista_nomeUsuario.push(lista_jogadores[y].nomeUsuario);
    }*/

    if(nomeUsuario.length < 8 || nomeUsuario.length > 10 || nomeUsuario.includes(' ')){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        alert('Nome de Usuario invalido.');
    } else if(lista_nomeUsuario.includes(nomeUsuario)){
        alert('nome de usuario já existente.')
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

const data = () => {
    document.getElementById('data_nascimento').innerHTML = `<input type="date"  class="cadastro_nome" id="nascimento" min="1925-12-31" max="2025-04-28">`;
}

data();

const cadastroJogador = (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const nascimento = new Date(document.getElementById('nascimento').value);
    const genero = document.getElementById('genero').value;
    criarJogador(nome, nomeUsuario, nascimento, genero, 0, 0, 0, []);
};