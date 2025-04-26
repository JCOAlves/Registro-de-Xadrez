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
};

let lista_ID_partidas = [];
let lista_partidas = [];

//Função de criar de partida.
const criarPartida = (data, horario, jogador_brancas, jogador_pretas, jogadas_partida, vencedor) => {
    let ID_partida = 1;
    if(lista_ID_partidas.includes(ID_partida)){
        ID_partida += 1;
    };

    let partida = new Partida(ID_partida, data, horario,  jogador_brancas, jogador_pretas, jogadas_partida, vencedor);
    lista_ID_partidas.push(ID_partida);
    lista_partidas.push(partida);
};

export default { criarPartida, lista_partidas };