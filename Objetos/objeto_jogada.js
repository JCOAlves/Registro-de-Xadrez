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

    returnPecaeliminada(){
        return this.pecaEliminada;
    }
}

export default {Jogada};