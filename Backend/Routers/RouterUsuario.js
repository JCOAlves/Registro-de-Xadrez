import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { listaUsuarios, lista_tipoUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, excluiUsuario } from "../Controllers/controllerUsuarios.js";

const router = express.Router();

// Cannot GET /usuarios
router.get("/", listaUsuarios);
router.get("/:id", listaUsuarioID);
router.get("/tipoUsuario/:tipoUsuario", lista_tipoUsuarios);
router.post("/", cadastraUsuario);
router.put("/:id", ValidacaoToken, atualizaUsuario);
router.delete("/:id", ValidacaoToken, excluiUsuario);

export default router;