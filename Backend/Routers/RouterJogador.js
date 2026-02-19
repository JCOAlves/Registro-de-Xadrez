import express from "express";
import { listaJogadores, listaJogadorID, registraJogador, atualizaJogador, excluiJogador } from "../Controllers/controllerJogadores.js";

const router = express.Router();

router.get("/", listaJogadores);
router.get("/:id", listaJogadorID);
router.post("/", registraJogador);
router.put("/:id", atualizaJogador);
router.delete("/:id", excluiJogador);

export default router;