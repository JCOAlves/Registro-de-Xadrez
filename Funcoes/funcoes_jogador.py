#Funções CRUD de Jogador
from Objetos.objeto_jogador import *

#Função de criação de Jogador
def criarJogador(nome, nomeUsuario, nascimento, genero):
    ID_jogador  = 1
    while ID_jogador in lista_ID_jogadores:
        ID_jogador += 1

    jogador = Jogador(ID_jogador, nome, nomeUsuario, nascimento, genero, 0, 0, 0, [])
    lista_ID_jogadores.append(ID_jogador)
    lista_jogadores.append(jogador)


criarJogador('Júlio César', 'JC_Oliver', '14/12/2005', 'Masculino')

#Função de retorno do jogador
def returnJogador(ID_jogador, lista_jogadores, lista_ID_jogadores):
    jogador = {}
    for usuario in lista_jogadores:
        if int(ID_jogador) in lista_ID_jogadores and usuario.id_jogador == int(ID_jogador):
            jogador = usuario

    return jogador
