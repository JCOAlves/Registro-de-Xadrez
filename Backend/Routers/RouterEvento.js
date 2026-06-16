import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { listaEvento, listaEventoID, listaInscricoes_Evento, cadastraEvento, inscreveEvento, atualizaEvento, excluiEvento } from "../Controllers/controllerEventos.js";


const router = express.Router();

router.get("/", listaEvento);
router.get("/:id", listaEventoID);
router.post("/", ValidacaoToken, cadastraEvento);
router.post("/inscreveEvento/:id", ValidacaoToken, inscreveEvento);
router.put("/:id", ValidacaoToken, atualizaEvento);
router.delete("/:id", ValidacaoToken, excluiEvento);

export default router