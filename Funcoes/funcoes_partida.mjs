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

