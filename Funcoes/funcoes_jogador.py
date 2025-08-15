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

#Função de exibição do jogador

def exibirJogador():
    jogadores = """ """
    for x in lista_jogadores:
        jogadores = jogadores + f"""<tr>
            <td>{x.id_jogador}</td>
            <td>{x.nome}</td>
            <td>{x.nomeUsuario}</td>
            <td>{x.nascimento}</td>
            <td>{x.genero}</td>
            <td>{x.numero_partidas}</td>
            <td>{x.vitorias}</td>
            <td>{x.derrotas}</td>
            <td>{x.partidas}</td>
        </tr>"""
    

    tabela = f"""<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Nome Usuario</th>
                <th>Nascimento</th>
                <th>Gênero</th>
                <th>Número de Partidas</th>
                <th>Número de Vitorias</th>
                <th>Número de Derrotas</th>
                <th>Partidas</th>
            </tr>
        </thead>
        <tbody>
            {jogadores}
        </tbody>
    </table>"""

    return tabela
