//Objeto Jogada com os atributos peça, casa, peça eliminada
class Jogada{
    constructor(id_jogada, peca, casa, pecaEliminada){
        this.id_jogada = id_jogada;
        this.peca = peca;
        this.casa = casa;
        this.pecaEliminada = pecaEliminada;
    }

    returnID_jogada(){
        return this.id_jogada;
    }

    returnPeca(){
        return this.peca;
    }

    returncasa(){
        return this.casa;
    }

    returnpecaeliminada(){
        return this.pecaEliminada;
    }
}

//Ojeto Jogador com os atributos nome, time, peças e jogadas
class Jogador{
    constructor(id_jogador, nome, time, pecas, partidas, vitorias, derrotas, jogadas){
        this.id_jogador = id_jogador;
        this.nome = nome;
        this.time = time;
        this.pecas = pecas;
        this.partidas = partidas;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
        this.jogadas = [];
        
    }

    returnID_jogador(){
        return this.id_jogador;
    }

    returnNome(){
        return this.nome;
    }

    returnTime(){
        return this.time;
    }

    returnPecas(){
        return this.pecas;
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

    returnJogadas(){
        return this.jogadas;
    }
}

//Objeto Partida com os atributos data, horario, duracao, jogador_brancas, jogador_pretas, jogadas_partida, vencedor
class Partida{
    constructor(id_partida, data, horario, jogador_brancas, jogador_pretas, jogadas_partida, vencedor){
        this.id_partida = id_partida;
        this.data = data;
        this.horario = horario;
        this.jogador_brancas = jogador_brancas;
        this.jogador_pretas = jogador_pretas;
        this.jogadas_partida = [];
        this.vencedor = vencedor;
    }
    returnID_partida(){
        return this.id_partida;
    }

    returnData(){
        return this.data;
    }

    returnHorario(){
        return this.horario;
    }

    returnJogador_brancas(){
        return this.jogador_brancas
    }

    returnJogador_pretas(){
        return this.jogador_pretas;
    }

    returnJogadas_partida(){
        return this.jogadas_partida;
    }

    returnVencedor(){
        return this.vencedor;
    }
}

let lista_ID_partidas = [];
let lista_ID_jogadores = [];
let lista_ID_jogadas = [];

let lista_jogadores = [];
let lista_partidas = [];

const criarPartida = () => {
    let partida = new Partida();
    lista_partidas.push(partida);
};
    
const criarJogador = () => {
    let ID_jogador = 1;

    const nome_branco = document.getElementById('nome_branco').value;
    const nome_preto = document.getElementById('nome_preto').value;

    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }
    let jogador_branco = new Jogador(ID_jogador, nome_branco, 'Branco', ['peão','peão','peão','peão','peão','peão','peão','peão','peão', 'torre','torre', 'cavalo','cavalo', 'bispo','bispo', 'rainha', 'rei'], [], 0, 0, []);
    lista_ID_jogadores.push(ID_jogador)

    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }
    let jogador_preto = new Jogador(ID_jogador, nome_preto, 'Preto', ['peão','peão','peão','peão','peão','peão','peão','peão','peão', 'torre','torre', 'cavalo','cavalo', 'bispo','bispo', 'rainha', 'rei'], [], 0, 0, []);
    lista_ID_jogadores.push(ID_jogador)

    lista_jogadores.push(jogador_branco);
    lista_jogadores.push(jogador_preto);
    alert('Jogadores cadastrados com sucesso.')
    alert(lista_ID_jogadores)
    exibirTexto(tela_partida)
};


//Funções de exibição de texto
const exibirTexto = (texto) => {
    document.getElementById('conteudo').innerHTML = texto;
};

const tela_partida = `
<div class='caixa1'>
    <div class='caixa2 branco'>
        <h1>Branco</h1>
        <span class='text'>Peça: </span> <select>
            <option>----</option>
            <option>Peão</option>
            <option>Cavalo</option>
            <option>Torre</option>
            <option>Bispo</option>
            <option>Rainha</option>
            <option>Rei</option>
        </select>
            <br><br>
        <span class='text'>Casa: </span> <select>
            <option>-</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>E</option>
            <option>F</option>
            <option>G</option>
            <option>H</option>
        </select>
        <select>
            <option>-</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
        </select>
            <br><br>
        <span class='text'>Peça Advesaria Eliminada: </span> <select>
            <option>----</option>
            <option>Peão</option>
            <option>Cavalo</option>
            <option>Torre</option>
            <option>Bispo</option>
            <option>Rainha</option>
            <option>Rei</option>
        </select>
            <br><br>
        <input type='checkbox' id='xeque'>
        <label for='xeque'>Xeque</label>
    </div>

    <div class='caixa2 preto'>
        <h1>Preto</h1>
        <span class='text'>Peça: </span> <select class='seletor_preto'>
            <option>----</option>
            <option>Peão</option>
            <option>Cavalo</option>
            <option>Torre</option>
            <option>Bispo</option>
            <option>Rainha</option>
            <option>Rei</option>
        </select>
            <br><br>
        <span class='text'>Casa: </span> <select>
            <option>-</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>E</option>
            <option>F</option>
            <option>G</option>
            <option>H</option>
        </select>
        <select>
            <option>-</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
        </select>
            <br><br>
        <span class='text'>Peça Advesaria Eliminada: </span> <select>
            <option>----</option>
            <option>Peão</option>
            <option>Cavalo</option>
            <option>Torre</option>
            <option>Bispo</option>
            <option>Rainha</option>
            <option>Rei</option>
        </select>
            <br><br>
        <input type='checkbox' id='xeque-preto'>
        <label for='xeque-preto'>Xeque</label>
    </div>
</div>`;

const tela_cadastro = `<h1>Cadastro de Jogadores</h1>
    <form>
        <span class='text'>Peças Brancas:</span> <input type="text" placeholder = 'Nome do Jogador' class='cadastro_nome' id="nome_branco">
            <br>
        <span class='text'>Peças Pretas:</span> <input type="text" placeholder = 'Nome do Jogador'  class='cadastro_nome' id="nome_preto">
            <br>
        <button onclick="criarJogador()">Cadastrar</button>
    </form>`;

const tela_inicial = `<h1>Registrador de Xadrez</h1>
<p>Registe partidas de xadrez com facilidade.</p>
<button onclick="exibirTexto(tela_cadastro)">Registrar partida.</button>`;

exibirTexto(tela_inicial);