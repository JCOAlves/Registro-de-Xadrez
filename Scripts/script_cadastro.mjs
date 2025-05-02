import { criarJogador } from "../Funcoes/funcoes_jogador.mjs";
import { lista_jogadores } from "../Objetos/objeto_jogador.mjs";


//Funções de validação de campos.
const validaNome = () => {
    const nome = document.getElementById('nome').value;
    if(nome.length < 10){
       document.getElementById('nome').style.borderColor = 'red';

    } else {
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
    } else {
        document.getElementById('nomeUsuario').style.borderColor = 'green';
    }
}

const validaNascimento = () =>{
    const data = new Date(document.getElementById('nascimento').value);
    const dia = data.getDate();
    const mes = Number(data.getMonth())+1;
    const ano = data.getFullYear();
    const nascimento = `${dia}/${mes}/${ano}`;

    if(nascimento.includes('NaN')){
        document.getElementById('nascimento').style.borderColor = 'red';

    }else{
        document.getElementById('nascimento').style.borderColor = 'green';
    }
}


const cadastroJogador = (event) => {
    event.preventDefault();
    const validadeForm = '';

    const nome = document.getElementById('nome').value;
    if(nome.length < 10){
        document.getElementById('nome').style.borderColor = 'red';
        validadeForm = false;
 
    } else {
        document.getElementById('nome').style.borderColor = 'green';
        validadeForm = true;
    }

    const nomeUsuario = document.getElementById('nomeUsuario').value;
    let lista_nomeUsuario = [];
    for(let y = 0; y < lista_jogadores.length; y++){
        lista_nomeUsuario.push(lista_jogadores[y].nomeUsuario);
    }

    if(nomeUsuario.length < 8 || nomeUsuario.length > 10 || nomeUsuario.includes(' ')){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        validadeForm = false;

    } else if(lista_nomeUsuario.includes(nomeUsuario)){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        alert('nome de usuario já existente.')
        validadeForm = false;

    } else {
        document.getElementById('nomeUsuario').style.borderColor = 'green';
        validadeForm = true;
    }
    

    const data = new Date(document.getElementById('nascimento').value);
    const nascimento = `${data.getDate()}/${Number(data.getMonth())+1}/${data.getFullYear()}`;
    if(nascimento.includes('NaN')){
        document.getElementById('nascimento').style.borderColor = 'red';
        validadeForm = false;

    }else{
        document.getElementById('nascimento').style.borderColor = 'green';
        validadeForm = true;
    }
    
    const genero = document.getElementById('genero').value;
    


    criarJogador(nome, nomeUsuario, nascimento, genero);
}


// Quando usado modulos, as funções não se tornam globais. Para serem ouvidos os eventos e funções utiliza-se: .addEventListener((Tipo do eventi entre aspas), (função a ser chamada pelo evento));
document.getElementById('nome').addEventListener('blur', validaNome);
document.getElementById('nomeUsuario').addEventListener('blur', validaNomeUsuario);
document.getElementById('nascimento').addEventListener('blur', validaNascimento);

const formulario = document.querySelector('button'); // Seleciona o formulário
formulario.addEventListener('click', cadastroJogador); // Use 'submit' no formulário, não 'onclick' no botão (melhor prática)