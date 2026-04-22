import express from "express";
import { Login, ConfirmLogin, Logout } from "../Controllers/controllerLogin.js";

const router = express.Router();

router.post("/login", Login);
router.post("/confirmLogin", ConfirmLogin);
router.post("/logout", Logout);


export default router;