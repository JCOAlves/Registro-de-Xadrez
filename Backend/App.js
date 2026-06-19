import express from "express";
import dotenv from "dotenv";
import CORS from "./Config/CORS.js";
import Session from "./Config/Session.js";
import SincronizacaoBD from "./Config/SincronizacaoBD.js";
import RouterJogada from "./Routers/RouterJogada.js";
import RouterJogador from "./Routers/RouterJogador.js";
import RouterPartida from "./Routers/RouterPartida.js";
import RouterUsuario from "./Routers/RouterUsuario.js";
import RouterEvento from "./Routers/RouterEvento.js";
import RouterEquipe from "./Routers/RouterEquipe.js";
import RouterLogin from "./Routers/RouterLogin.js";

const app = express();

dotenv.config();
const Aplicacao = {
    HOST: process.env.HOST_BACK,
    PORT: process.env.PORT_BACK,
    EnderecoServidor: `http://${process.env.HOST_BACK}:${process.env.PORT_BACK}`,
    EnderecoSite: `http://${process.env.HOST_FRONT}:${process.env.PORT_FRONT}`
};

const dataAtual = new Date();
const dia = dataAtual.getDate() < 10 ? `0${dataAtual.getDate()}` : dataAtual.getDate()
const mes = dataAtual.getMonth()+1 < 10 ? `0${dataAtual.getMonth()+1}` : dataAtual.getMonth()+1
const ano = dataAtual.getFullYear();
const hora = dataAtual.getHours() < 10 ? `0${dataAtual.getHours()}` : dataAtual.getHours();
const minuto = dataAtual.getMinutes() < 10 ? `0${dataAtual.getMinutes()}` : dataAtual.getMinutes();
const segundo = dataAtual.getSeconds() < 10 ? `0${dataAtual.getSeconds()}` : dataAtual.getSeconds();
const dataServidor = `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;

app.use(express.json()); // Para sua API aceitar JSON no corpo das requisições

app.use(CORS);
app.use(Session);

app.get("/", (req, res) => {
    res.send(`<div style='max-width: 600px; min-width: 300px; margin: 20px auto;'>
        <h1 style='text-align: center;'>Servidor Web.</h1>
        <p style='text-align: center;'>Servidor iniciado em ${dataServidor}</p>

        <h2 style='text-align: center;'>Endpoints</h2>
        <ul style='max-width: 300px; min-width: 100px; margin: 20px auto;'>
            <li><a>/usuarios</a></li>
            <li><a>/equipes</a></li>
            <li><a>/eventos</a></li>
            <li><a>/partidas</a></li>
            <li><a>/jogadas</a></li>
        </ul>
    </div>`);
}); // Adcionar endereços de href

SincronizacaoBD(); // Sincronização das tabelas
app.use("/", RouterLogin);
app.use("/usuarios", RouterUsuario);
app.use("/jogadores", RouterJogador);
app.use("/partidas", RouterPartida);
app.use("/jogadas", RouterJogada);
app.use("/equipes", RouterEquipe);
app.use("/eventos", RouterEvento);

const { PORT, EnderecoServidor, EnderecoSite } = Aplicacao;
app.listen(PORT, () => {
    console.log("--------------------------------------------------");
    console.log(`|   Servidor iniciado em ${dataServidor}   |`);
    console.log("--------------------------------------------------");
    console.log(`Servidor: ${EnderecoServidor}`);
    console.log(`Site: ${EnderecoSite}`);
    
    // Intervalo para aparecer as mensagens referentes ao banco de dados
    setTimeout(() => console.log("--------------------------------------------------"), 3000);
});
