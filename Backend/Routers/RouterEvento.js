import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { listaEvento, lista_nomesEventos, listaEventoID, cadastraEvento, inscricaoJogador_Evento, inscricaoEquipe_Evento, atualizaEvento, excluiEvento } from "../Controllers/controllerEventos.js";


const router = express.Router();

router.get("/eventos", listaEvento);
router.get("/nomesEventos", lista_nomesEventos);
router.get("/eventos/:id", listaEventoID);
router.post("/", ValidacaoToken, cadastraEvento);
router.post("/inscricaoEvento/Jogador", ValidacaoToken, inscricaoJogador_Evento);
router.post("/inscricaoEvento/equipe", ValidacaoToken, inscricaoEquipe_Evento);
router.put("/:id", ValidacaoToken, atualizaEvento);
router.delete("/:id", ValidacaoToken, excluiEvento);

export default router