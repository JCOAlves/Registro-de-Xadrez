#Objeto Jogador com os atributos nome, time, peças e jogadas
class Jogador:
    def __init__(self, id_jogador, nome, nomeUsuario, nascimento, genero, numero_partidas, vitorias, derrotas, partidas):
        self.id_jogador = id_jogador
        self.nome = nome
        self.nomeUsuario = nomeUsuario
        self.nascimento = nascimento
        self.genero = genero
        self.numero_partidas = numero_partidas
        self.vitorias = vitorias
        self.derrotas = derrotas
        self.partidas = partidas
    

    def returnID_jogador(self):
        return self.id_jogador
    

    def returnNome(self):
        return self.nome
    

    def returnNomeUsuario(self):
        return self.nomeUsuario
    

    def returnNascimento(self):
        return self.nascimento
    

    def returnGenero(self):
        return self.genero
    

    def returnNumero_partidas(self):
        return self.numero_partidas
    

    def returnVitorias(self):
        return self.vitorias
    

    def returnDerrotas(self):
        return self.derrotas
    

    def returnPartidas(self):
        return self.partidas
    


#Listas de IDs e jogadores
lista_ID_jogadores = []
lista_jogadores = []