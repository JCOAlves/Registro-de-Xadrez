//Funções CRUD de Partida
import { Partida, lista_ID_partidas, lista_partidas } from "../Objetos/objeto_partida.mjs"

//Função de criar de partida.
export const criarPartida = (data, horario, jogador_brancas, jogador_pretas, jogadas_partida, vencedor) => {
    let ID_partida = 1;
    if(lista_ID_partidas.includes(ID_partida)){
        ID_partida += 1;
    };

    let partida = new Partida(ID_partida, data, horario,  jogador_brancas, jogador_pretas, jogadas_partida, vencedor);
    lista_ID_partidas.push(ID_partida);
    lista_partidas.push(partida);
};

//Função de exibição de partidas
const exibirPartidas = () => {
    let partidas = ``;
    for(let x = 0; x<lista_partidas.length; x++){
        partidas = partidas + `<tr>
            <td>${lista_partidas[x].id_partida}</td>
            <td>${lista_partidas[x].data}</td>
            <td>${lista_partidas[x].horario}</td>
            <td>${lista_partidas[x].jogador_brancas}</td>
            <td>${lista_partidas[x].jogador_pretas}</td>
            <td>${lista_partidas[x].jogadas_partida}</td>
            <td>${lista_partidas[x].vencedor}</td>
        </tr>`
    }

    const tabela = `<table>
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
            ${partidas}
        </tbody>
    </table>`;

    return tabela;
}

export const registro = exibirPartidas();