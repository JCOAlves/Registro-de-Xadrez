import express from "express";
import { listaRanking_Jogadores, cancelaInscricao_Evento, removeJogador_Equipe, adicionaJogador_Equipe } from "../Controllers/controllerJogadores.js";
import ValidacaoToken from "../Config/ValidacaoToken.js";

const router = express.Router();

router.get("/rankingJogadores", listaRanking_Jogadores);

// Utilizam parâmetros opcionais como obrigatorios para operar
router.post("/adicionaJogador_Equipe", ValidacaoToken, adicionaJogador_Equipe) 
router.delete("/removeJogador_Equipe", ValidacaoToken, removeJogador_Equipe);
router.delete("/cancelarInscricao_Evento", ValidacaoToken, cancelaInscricao_Evento);

export default router;