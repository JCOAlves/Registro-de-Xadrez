#Objeto Partida com os atributos data, horario, duracao, jogador_brancas, jogador_pretas, jogadas_partida, vencedor
class Partida:
    def __init__(self, id_partida, data, horario, jogador_brancas, jogador_pretas, vencedor):
        self.id_partida = id_partida
        self.data = data
        self.horario = horario
        self.jogador_brancas = jogador_brancas
        self.jogador_pretas = jogador_pretas
        self.vencedor = vencedor
    
    def returnID_partida(self):
        return self.id_partida
    

    def returnData(self):
        return self.data
    

    def returnHorario(self):
        return self.horario
    

    def returnJogador_brancas(self):
        return self.jogador_brancas
    

    def returnJogador_pretas(self):
        return self.jogador_pretas
    

    def returnVencedor(self):
        return self.vencedor
    


#lista de IDs e partidas
lista_ID_partidas = []
lista_partidas = []