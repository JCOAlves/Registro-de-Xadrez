import express from "express";
import { listaJogadas, listaJogadaID, registraJogada, atualizaJogada, excluiJogada } from "../Controllers/controllerJogadas.js";

const router = express.Router();

router.get("/", listaJogadas);
router.get("/:id", listaJogadaID);
router.post("/", registraJogada);
router.put("/:id", atualizaJogada);
router.delete("/:id", excluiJogada);

export default router;