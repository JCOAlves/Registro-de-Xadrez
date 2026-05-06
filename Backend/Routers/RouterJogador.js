import express from "express";
import { listaJogadores, lista_nickNames, listaJogadorID, listaRanking_Jogadores, cancelaInscricao_Evento, removeJogador_Equipe, adicionaJogador_Equipe } from "../Controllers/controllerJogadores.js";
import ValidacaoToken from "../Config/ValidacaoToken.js";

const router = express.Router();

router.get("/", listaJogadores);
router.get("/nickNames", lista_nickNames);
router.get("/rankingJogadores", listaRanking_Jogadores);
router.get("/:id", listaJogadorID);

// Utilizam parâmetros opcionais como obrigatorios para operar
router.post("/adicionaJogador_Equipe", ValidacaoToken, adicionaJogador_Equipe) 
router.post("/removeJogador_Equipe", ValidacaoToken, removeJogador_Equipe);
router.post("/cancelarInscricao_Evento", ValidacaoToken, cancelaInscricao_Evento);

export default router;