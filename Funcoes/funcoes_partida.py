#Funções CRUD de Partida
from Objetos.objeto_partida import *

#Função de criar de partida.
def criarPartida(data, horario, jogador_brancas, jogador_pretas, jogadas_partida, vencedor):
    ID_partida = 1
    while ID_partida in lista_ID_partidas:
        ID_partida += 1

    partida = Partida(ID_partida, data, horario,  jogador_brancas, jogador_pretas, jogadas_partida, vencedor)
    lista_ID_partidas.append(ID_partida)
    lista_partidas.append(partida)


#Função de exibição de partidas
def returnPartida(ID_partida, lista_partidas, lista_ID_partidas):
    partida = {}
    for item in lista_partidas:
        if int(ID_partida) in lista_ID_partidas and item.id_partida == int(ID_partida):
            partida = item

    return partida

