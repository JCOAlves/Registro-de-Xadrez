#Funções CRUD de Partida
from dados.dados_sistema import *

#Função de criar de partida.
def criarPartida(data, horario, jogador_brancas, jogador_pretas, vencedor, lista_ID_partidas, lista_partidas):
    ID_partida = 1
    while ID_partida in lista_ID_partidas:
        ID_partida += 1

    partida = {
        "id_partida": ID_partida, 
        "data": data, "horario": horario,  
        "jogador_brancas": jogador_brancas, 
        "jogador_pretas": jogador_pretas, 
        "vencedor": vencedor
        }
    
    lista_ID_partidas.append(ID_partida)
    lista_partidas.append(partida)


#READ
def returnPartida(ID_partida, lista_partidas, lista_ID_partidas):
    partida = {}
    for item in lista_partidas:
        if int(ID_partida) in lista_ID_partidas and item["id_partida"] == int(ID_partida):
            partida = item

    return partida

