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

export default {Partida};