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
def exibirPartidas():
    partidas = """"""
    for x in lista_partidas:
        partidas = partidas + f"""<tr>
            <td>{x.id_partida}</td>
            <td>{x.data}</td>
            <td>{x.horario}</td>
            <td>{x.jogador_brancas}</td>
            <td>{x.jogador_pretas}</td>
            <td>{x.jogadas_partida}</td>
            <td>{x.vencedor}</td>
        </tr>"""
    

    tabela = f"""<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Horario</th>
                <th>Peças Brancas</th>
                <th>Peças Pretas</th>
                <th>Jogadas da Partida</th>
                <th>Vencedor</th>
            </tr>
        </thead>
        <tbody>
            {partidas}
        </tbody>
    </table>"""

    return tabela
