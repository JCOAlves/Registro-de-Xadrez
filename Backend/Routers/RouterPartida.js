import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { listaPartidas, listaPartidaID, registraPartida, finalizaPartida, atualizaPartida, excluiPartida } from "../Controllers/controllerPartidas.js";

const router = express.Router();

// ValidacaoToken -> Verifica o Token de login do usuário
router.get("/", listaPartidas);
router.get("/:id", listaPartidaID);
router.post("/", ValidacaoToken, registraPartida);
router.put("/finalizaPartida/:id", ValidacaoToken, finalizaPartida);
router.put("/:id", ValidacaoToken, atualizaPartida);
router.delete("/:id", ValidacaoToken, excluiPartida);

export default router;