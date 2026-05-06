import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { listaEquipes, lista_nomesEquipes, listaEquipeID, listaRanking_Equipes, cadastraEquipe, atualizaEquipe, excluiEquipe } from "../Controllers/controllerEquipes.js";


const router = express.Router();

router.get("/", listaEquipes);
router.get("/:id", listaEquipeID);
router.get("/nomesEquipes", lista_nomesEquipes);
router.get("/rankingEquipe", listaRanking_Equipes);
router.post("/", ValidacaoToken, cadastraEquipe);
router.put("/:id", ValidacaoToken, atualizaEquipe);
router.delete("/:id", ValidacaoToken, excluiEquipe);

export default router