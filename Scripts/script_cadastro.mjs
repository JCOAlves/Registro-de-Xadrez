import { criarJogador } from "../Funcoes/funcoes_jogador.mjs";
import { lista_jogadores } from "../Objetos/objeto_jogador.mjs";

//Quando usado modulos, as funções não se tornam globais. Para serem ouvidos os eventos e funções utiliza-se: .addEventListener((Tipo do eventi entre aspas), (função a ser chamada pelo evento));
//Funções de validação de campos.

//Nome
export const validaNome = () => {
    const nome = document.getElementById('nome').value;
    if(nome.length < 10){
       document.getElementById('nome').style.borderColor = 'red';

    } else {
       document.getElementById('nome').style.borderColor = 'green';
    }
};

//Nome de Usuario
export const validaNomeUsuario = () => {
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    let lista_nomeUsuario = [];
    for(let y = 0; y < lista_jogadores.length; y++){
        lista_nomeUsuario.push(lista_jogadores[y].nomeUsuario);
    }

    if(nomeUsuario.length < 8 || nomeUsuario.length > 10 || nomeUsuario.includes(' ')){
        document.getElementById('nomeUsuario').style.borderColor = 'red';

    } else if(lista_nomeUsuario.includes(nomeUsuario)){
       alert('nome de usuario já existente.');
        
    } else {
        document.getElementById('nomeUsuario').style.borderColor = 'green';
    }
};

//Nascimento
export const validaNascimento = () =>{
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
};


// Seleciona o formulário para cadastro
export const ValidaForm = () => {
    //event.preventDefault(); --> Imperde o envio do formulario

    const nome = document.getElementById('nome').value;
    const validaNome = () => {
        if(nome.length < 10){
            document.getElementById('nome').style.borderColor = 'red';
            return false;
 
        } else {
            document.getElementById('nome').style.borderColor = 'green';
           return true;
        }
    };
    

    const nomeUsuario = document.getElementById('nomeUsuario').value;
    let lista_nomeUsuario = [];
    for(let y = 0; y < lista_jogadores.length; y++){
        lista_nomeUsuario.push(lista_jogadores[y].nomeUsuario);
    }
    const validaNomeUsuario = () => {
        if(nomeUsuario.length < 8 || nomeUsuario.length > 10 || nomeUsuario.includes(' ') || nomeUsuario === ''){
            document.getElementById('nomeUsuario').style.borderColor = 'red';
            return false;

        } else if(lista_nomeUsuario.includes(nomeUsuario)){
            document.getElementById('nomeUsuario').style.borderColor = 'red';
            alert('nome de usuario já existente.')
            return false;

        } else {
            document.getElementById('nomeUsuario').style.borderColor = 'green';
            return true;
        }
    };
    
    
    const data = new Date(document.getElementById('nascimento').value);
    const nascimento = `${data.getDate()}/${Number(data.getMonth())+1}/${data.getFullYear()}`;
    const validaNascimento = () => {
        if(nascimento.includes('NaN')){
            document.getElementById('nascimento').style.borderColor = 'red';
            return false;

        }else{
            document.getElementById('nascimento').style.borderColor = 'green';
            return true;
        }
    };
    

    const genero = document.getElementById('genero').value;
   
    if(validaNome && validaNomeUsuario && validaNascimento){
        criarJogador(nome, nomeUsuario, nascimento, genero);
        alert(`Jogador ${nomeUsuario} cadastrado com sucesso.`);
       
    }else{
        document.querySelector('form').style.borderColor = 'red';
        alert('Formulario invalido.');
    }
}; 