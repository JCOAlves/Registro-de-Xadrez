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
def returnJogadas(ID_partida, lista_jogadas, lista_ID_partidas):
    jogadas = []
    for item in lista_jogadas:
        if int(ID_partida) in lista_ID_partidas and int(ID_partida) == item["partida"]:
            jogadas.append(item)

    if len(jogadas) == 0:
        return {"mensagemServidor": "404 - As jogadas dessa partida não foram encontradas"}
    else:
        return jogadas

def returnJogada(ID_partida, ID_jogada, lista_jogadas, lista_ID_jogadas, lista_ID_partidas):
    jogada = ""
    for item in lista_jogadas:
        bool1 = int(ID_partida) in lista_ID_partidas and int(ID_partida) == item["partida"]
        bool2 = int(ID_jogada) in lista_ID_jogadas and int(ID_jogada) == item["id_jogada"]
        if bool1 and bool2:
            jogada = item

    if jogada == "":
        return {"mensagemServidor": "404 - Jogada não encontrada"}
    else:
        return jogada