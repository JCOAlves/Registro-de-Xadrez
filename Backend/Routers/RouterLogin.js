import express from "express";
import ValidacaoToken from "../Config/ValidacaoToken.js";
import { Login, ConfirmLogin, Logout } from "../Controllers/controllerLogin.js";

const router = express.Router();

router.post("/login", Login);
router.post("/confirmLogin", ValidacaoToken, ConfirmLogin);
router.post("/logout", Logout);


export default router;