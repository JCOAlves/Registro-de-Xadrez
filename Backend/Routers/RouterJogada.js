import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { listaJogadasPartida, listaJogadaID, registraJogada, atualizaJogada, excluiJogada } from "../Controllers/controllerJogadas.js";

const router = express.Router();

router.get("/:id", listaJogadaID);
router.get("/partida/:ID_partida", listaJogadasPartida);
router.post("/", ValidacaoToken, registraJogada);
router.put("/:id", ValidacaoToken, atualizaJogada);
router.delete("/:id", ValidacaoToken, excluiJogada);

export default router;