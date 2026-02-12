import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const dataAtual = new Date();
const dia = dataAtual.getDate() < 10 ? `0${dataAtual.getDate()}` : dataAtual.getDate()
const mes = dataAtual.getMonth()+1 < 10 ? `0${dataAtual.getMonth()+1}` : dataAtual.getMonth()+1
const ano = dataAtual.getFullYear();
const hora = dataAtual.getHours() < 10 ? `0${dataAtual.getHours()}` : dataAtual.getHours();
const minuto = dataAtual.getMinutes() < 10 ? `0${dataAtual.getMinutes()}` : dataAtual.getMinutes();
const dataServidor = `${dia}/${mes}/${ano} - ${hora}:${minuto}`

app.use(express.json()); // Para sua API aceitar JSON no corpo das requisições

app.get("/", (req, res) => {
    res.send(`
        <h1 style='text-align: center; margin: 20px;'>Servidor Web.</h1>
            <hr/>
        <ul style='margin: 20px;'>
            <li>GET /</li>
            <li>POST /</li>
            <li>PUT /</li>
            <li>DELETE /</li>
        </ul>
    `);
});


app.listen(PORT, () => {
    console.log(`Servidor iniciado em ${dataServidor}.`)
    console.log(`Rodando na porta ${PORT}.`);
});
