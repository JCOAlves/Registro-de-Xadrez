//Objeto Jogador com os atributos nome, time, peças e jogadas
class Jogador{
    constructor(id_jogador, nome, nomeUsuario, nascimento, genero, partidas, vitorias, derrotas, jogadas){
        this.id_jogador = id_jogador;
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.nascimento = nascimento;
        this.genero = genero;
        this.partidas = partidas;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
    }

    returnID_jogador(){
        return this.id_jogador;
    }

    returnNome(){
        return this.nome;
    }

    returnNomeUsuario(){
        return this.nomeUsuario;
    }

    returnNascimento(){
        return this.nascimento;
    }

    returnGenero(){
        return this.genero;
    }

    returnPartidas(){
        return this.partidas;
    }

    returnVitorias(){
        return this.vitorias;
    }

    returnDerrotas(){
        return this.derrotas;
    }
};

//Listas de IDs e jogadores
let lista_ID_jogadores = [];
let lista_jogadores = [];

//Função de criação de Jogador
const criarJogador = (nome, nomeUsuario, nascimento, genero) => {
    let ID_jogador = 1;
    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }

    let jogador = new Jogador(ID_jogador, nome, nomeUsuario, nascimento, genero, [], 0, 0);
    lista_ID_jogadores.push(ID_jogador)
    lista_jogadores.push(jogador);
};

criarJogador('Júlio César', 'JC_Oliver', '14/12/2005', 'Masculino');









//Funções de validação de campos
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
    const nome = document.getElementById('nome').value;
    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const nascimento = new Date(document.getElementById('nascimento').value);
    const genero = document.getElementById('genero').value;
    criarJogador(nome, nomeUsuario, nascimento, genero, );
};

