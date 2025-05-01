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