import express from "express";
import { listaJogadores, listaJogadorID } from "../Controllers/controllerJogadores.js";

const router = express.Router();
/*
router.get("/", listaJogadores);
router.get("/nomesUsuarios", lista_nomesUsuario);
router.get("/:id", listaJogadorID);
router.post("/", registraJogador);
router.put("/:id", atualizaJogador);
router.put("/numerosJogadores/:id", atualizaNumeroPartidas);
router.delete("/:id", excluiJogador);*/

export default router;