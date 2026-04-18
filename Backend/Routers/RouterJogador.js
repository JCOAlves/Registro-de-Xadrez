import express from "express";
import { listaJogadores, lista_nickNames, listaJogadorID, listaRanking_Jogadores } from "../Controllers/controllerJogadores.js";


const router = express.Router();

router.get("/", listaJogadores);
router.get("/nickNames", lista_nickNames);
router.get("/rankingJogadores", listaRanking_Jogadores);
router.get("/:id", listaJogadorID);
/*router.post("/", registraJogador);
router.put("/:id", atualizaJogador);
router.put("/numerosJogadores/:id", atualizaNumeroPartidas);
router.delete("/:id", excluiJogador);*/

export default router;