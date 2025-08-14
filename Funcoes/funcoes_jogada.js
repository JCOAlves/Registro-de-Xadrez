//Funções CRUD de Jogada
import { Jogada } from "../Objetos/objeto_jogada.mjs";

export const criarJogada = (id_jogada, peca, casa, pecaEliminada) => {
    return new Jogada(id_jogada, peca, casa, pecaEliminada);
}