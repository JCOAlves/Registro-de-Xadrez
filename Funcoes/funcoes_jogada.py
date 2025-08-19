#Funções CRUD de Jogada
from dados.dados_sistema import *

#CREATE
def criarJogada(ID_partida, time, peca, casa, pecaEliminada, lista_ID_jogadas, lista_jogadas):
    ID_jogada = 1
    while ID_jogada in lista_ID_jogadas:
        ID_jogada += 1

    jogada = { 
        "id_jogada": ID_jogada, "partida": ID_partida, 
        "time": time, "peca": peca, 
        "casa": casa, "pecaEliminada": pecaEliminada
    }

    lista_ID_jogadas.append(ID_jogada)
    lista_jogadas.append(jogada)

#READ
def returnJogadas(ID_partida, lista_ID_partida, lista_jogadas):
    jogadas = []

    for item in lista_jogadas:
        if int(ID_partida) in lista_ID_partida and int(ID_partida) == item["partida"]:
            jogadas.append(item)
    
    return jogadas
