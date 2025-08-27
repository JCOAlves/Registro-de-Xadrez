import {RequisiçãoHTTP} from "./requisicaoHTTP.js";

//Função de validação de nome
export function validacao_nome(){
    const nome = document.getElementById('nome').value;
    if(nome.length < 10){
        document.getElementById('nome').style.borderColor = 'red';
        return false;
 
    } else {
        document.getElementById('nome').style.borderColor = 'green';
        return true;
    };
};

//Função de validação de nome de usuario
export async function validacao_nomeUsuario(){
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const lista_nomeUsuario = await RequisiçãoHTTP("/jogadores/nomeUsuarios");
    
    if(nomeUsuario.length < 8 || nomeUsuario.length > 10){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        return false;

    } else if (nomeUsuario.includes(' ' || nomeUsuario === '')){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        return false;

    } else if (lista_nomeUsuario.includes(nomeUsuario)){
        document.getElementById('nomeUsuario').style.borderColor = 'red';
        alert('nome de usuario já existente.')
        return false;

    } else {
        document.getElementById('nomeUsuario').style.borderColor = 'green';
        return true;
    }
}

//função de validação de data de nascimento
export function validacao_nascimento(){
    const data = new Date(document.getElementById('nascimento').value);
    const dia = data.getDate();
    const mes = Number(data.getMonth())+1;
    const ano = data.getFullYear();
    const nascimento = `${dia}/${mes}/${ano}`;

    if(nascimento.includes('NaN')){
        document.getElementById('nascimento').style.borderColor = 'red';
        return false;

    }else{
        document.getElementById('nascimento').style.borderColor = 'green';
        return true;
    };
};

//Função de validação de formulario
export function validacao_form(event){
    event.preventDefault();
    const validade_nome = validacao_nome();
    const validade_nomeUsuario = validacao_nomeUsuario();
    const validade_nascimento = validacao_nascimento();
    //const genero = document.getElementById('genero').value;
        
    if(validade_nome && validade_nomeUsuario && validade_nascimento){
        document.querySelector('form').style.borderColor = 'green';
    }else{
        document.querySelector('form').style.borderColor = 'red';
        alert('Formulario invalido.');
    }
}