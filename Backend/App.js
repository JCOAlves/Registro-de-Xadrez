import express from "express";
import dotenv from "dotenv";
import CORS from "./Config/CORS.js";
import Session from "./Config/Session.js";
import SincronizacaoBD from "./Config/SincronizacaoBD.js";
import RouterJogada from "./Routers/RouterJogada.js";
import RouterJogador from "./Routers/RouterJogador.js";
import RouterPartida from "./Routers/RouterPartida.js";
import RouterUsuario from "./Routers/RouterUsuario.js";
import RouterLogin from "./Routers/RouterLogin.js";

const app = express();

dotenv.config();
const Aplicacao = {
    HOST: process.env.HOST_BACK || "localhost",
    PORT: process.env.PORT_BACK || 3000,
    EnderecoServidor: `http://${process.env.HOST_BACK || "localhost"}:${process.env.PORT_BACK || 3000}`,
    EnderecoSite: `http://${process.env.HOST_FRONT || "localhost"}:${process.env.PORT_FRONT || 5173}`
};

const dataAtual = new Date();
const dia = dataAtual.getDate() < 10 ? `0${dataAtual.getDate()}` : dataAtual.getDate()
const mes = dataAtual.getMonth()+1 < 10 ? `0${dataAtual.getMonth()+1}` : dataAtual.getMonth()+1
const ano = dataAtual.getFullYear();
const hora = dataAtual.getHours() < 10 ? `0${dataAtual.getHours()}` : dataAtual.getHours();
const minuto = dataAtual.getMinutes() < 10 ? `0${dataAtual.getMinutes()}` : dataAtual.getMinutes();
const dataServidor = `${dia}/${mes}/${ano} - ${hora}:${minuto}`;

app.use(express.json()); // Para sua API aceitar JSON no corpo das requisições

app.use(CORS);
console.log(CORS);
app.use(Session);

app.get("/", (req, res) => {
    res.send(`<div style='max-width: 600px; min-width: 300px; margin: 20px auto;'>
        <h1 style='text-align: center;'>Servidor Web.</h1>
    </div>`);
});

SincronizacaoBD(); // Sincronização das tabelas
app.use("/", RouterLogin);
app.use("/usuarios", RouterUsuario);
app.use("/jogadores", RouterJogador);
app.use("/partidas", RouterPartida);
app.use("/jogadas", RouterJogada);

const { PORT, EnderecoServidor, EnderecoSite } = Aplicacao;
app.listen(PORT, () => {
    console.log(`Servidor iniciado em ${dataServidor}.`);
    console.log(`Rodando na porta ${PORT}.`);
    console.log(`Endereço servidor: ${EnderecoServidor}`);
    console.log(`Endereço site: ${EnderecoSite}`);
});
