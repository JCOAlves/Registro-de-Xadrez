#Objeto Jogada com os atributos peça, casa, peça eliminada
class Jogada:
    def __init__(self, id_jogada, peca, casa, pecaEliminada):
        self.id_jogada = id_jogada
        self.peca = peca
        self.casa = casa
        self.pecaEliminada = pecaEliminada


    def returnID_jogada(self):
        return self.id_jogada
    

    def returnPeca(self):
        return self.peca
    

    def returncasa(self):
        return self.casa
    

    def returnPecaeliminada(self):
        return self.pecaEliminada
    