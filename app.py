from flask import Flask
from flask import redirect, render_template
from flask import jsonify, request
from dados.dados_sistema import *
from Funcoes.funcoes_jogador import *
from Funcoes.funcoes_partida  import *
from Funcoes.funcoes_jogada import *

app = Flask(__name__)

@app.route("/")
def inicio():
    return redirect("/menu")

@app.route("/menu")
def menu():
    return render_template("inicio.html")

@app.route("/inicial")
def inicial():
    #Rota usada para redirecionar para a página princial do projeto.
    return jsonify({"mensagem": "bem-vindo ao registrador de xadrez."})

@app.route("/jogadores")
def Jogadores():
    return jsonify(lista_jogadores)

@app.route("/jogadores/<int:id_jogador>")
def Jogador(id_jogador):
    jogador = returnJogador(id_jogador, lista_jogadores, lista_ID_jogadores)
    return jsonify(jogador)

@app.route("/jogadores/nomeUsuarios")
def nomeUsuarios():
    lista_nomeUsuarios = []
    for usuario in lista_jogadores:
        lista_nomeUsuarios.append(usuario["nomeUsuario"])
    
    if len(lista_nomeUsuarios) == 0:
        return {"mensagemServidor": "404 - Nomes de usuarios não encontrados."}
    else:
        return lista_nomeUsuarios

@app.route("/submitJogador", methods = ["POST"])
def submitJogador():
    Requisicao = request.method
    match Requisicao:
        case "POST":
            return "Método POST"

@app.route("/partidas")
def partidas():
    return jsonify(lista_partidas)

@app.route("/partidas/<int:id_partida>")
def partida(id_partida):
    partida = returnPartida(id_partida, lista_partidas, lista_ID_partidas)
    return jsonify(partida)

@app.route("/submitPartida", methods = ["POST"])
def submitPartida():
    Requisicao = request.method
    match Requisicao:
        case "POST":
            return "Método POST"

@app.route("/partidas/<int:id_partida>/jogadas")
def jogadas(id_partida):
    jogadas = returnJogadas(id_partida, lista_jogadas, lista_ID_partidas)
    return jsonify(jogadas)

"""
@app.route("/partidas/<int:id_partida>/jogadas/<int:id_jogada>")
def jogada(id_partida, id_jogada):
    jogada = returnJogada(id_partida, id_jogada, lista_jogadas, lista_ID_jogadas, lista_ID_partidas)
    return jsonify(jogada)
"""

if __name__ == '__main__':
    app.run(debug=True)