import express from "express";
import { listaPartidas, listaPartidaID, registraPartida, atualizaPartida, excluiPartida } from "../Controllers/controllerPartidas.js";

const router = express.Router();

router.get("/", listaPartidas);
router.get("/:id", listaPartidaID);
router.post("/", registraPartida);
router.put("/:id", atualizaPartida);
router.delete("/:id", excluiPartida);

export default router;