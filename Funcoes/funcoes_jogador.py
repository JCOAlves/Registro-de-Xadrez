#Funções CRUD de Jogador
from dados.dados_sistema import *

#Função de criação de Jogador
def criarJogador(nome, nomeUsuario, nascimento, genero, lista_ID_jogadores, lista_jogadores):
    ID_jogador  = 1
    while ID_jogador in lista_ID_jogadores:
        ID_jogador += 1

    jogador = {
        "id_jogador": 1, 
        "nome": nome, "nomeUsuario": nomeUsuario, 
        "nascimento": nascimento, "genero": genero, 
        "numeroPartidas": 0,"vitorias": 0, "derrotas": 0
        }
    
    lista_ID_jogadores.append(ID_jogador)
    lista_jogadores.append(jogador)


#READ
def returnJogador(ID_jogador, lista_jogadores, lista_ID_jogadores):
    jogador = ""
    for item in lista_jogadores:
        if int(ID_jogador) in lista_ID_jogadores and item["id_jogador"] == int(ID_jogador):
            jogador = item
    
    if jogador == "":
        return {"mensagemServido": "404 - Jogador não encontrado."}
    else:
        return jogador
