//Funções CRUD de Jogador
import { Jogador, lista_ID_jogadores, lista_jogadores } from "../Objetos/objeto_jogador.mjs";

//Função de criação de Jogador
export const criarJogador = (nome, nomeUsuario, nascimento, genero) => {
    let ID_jogador = 1;
    if(lista_ID_jogadores.includes(ID_jogador)){
        ID_jogador += 1;
    }

    let jogador = new Jogador(ID_jogador, nome, nomeUsuario, nascimento, genero, 0, 0, 0, []);
    lista_ID_jogadores.push(ID_jogador)
    lista_jogadores.push(jogador);
};

criarJogador('Júlio César', 'JC_Oliver', '14/12/2005', 'Masculino');

//Função de exibição do jogador
const exibirJogador = () => {
    let jogadores = ``;
    for(let x = 0; x<lista_jogadores.length; x++){
        jogadores = jogadores + `<tr>
            <td>${lista_jogadores[x].id_jogador}</td>
            <td>${lista_jogadores[x].nome}</td>
            <td>${lista_jogadores[x].nomeUsuario}</td>
            <td>${lista_jogadores[x].nascimento}</td>
            <td>${lista_jogadores[x].genero}</td>
            <td>${lista_jogadores[x].numero_partidas}</td>
            <td>${lista_jogadores[x].vitorias}</td>
            <td>${lista_jogadores[x].derrotas}</td>
            <td>${lista_jogadores[x].partidas}</td>
        </tr>`
    }

    const tabela = `<table>
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
            ${jogadores}
        </tbody>
    </table>`;

    return tabela;
}

export const registro = exibirJogador();