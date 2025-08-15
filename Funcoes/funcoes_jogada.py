#Funções CRUD de Jogada
from Objetos.objeto_jogada import *

#CREATE
def criarJogada(id_jogada, peca, casa, pecaEliminada):
    return Jogada(id_jogada, peca, casa, pecaEliminada)
