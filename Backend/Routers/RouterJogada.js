import express from "express";
import { listaJogadas, listaJogadasPartida, listaJogadaID, registraJogada, atualizaJogada, excluiJogada } from "../Controllers/controllerJogadas.js";

const router = express.Router();

router.get("/", listaJogadas);
router.get("/:id", listaJogadaID);
router.get("/partida/:ID_partida", listaJogadasPartida);
router.post("/", registraJogada);
router.put("/:id", atualizaJogada);
router.delete("/:id", excluiJogada);

export default router;