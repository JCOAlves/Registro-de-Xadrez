import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Inicial.css";

function Inicial(){
    const navigate = useNavigate();

    return <main className="imagemFundo">
        <h1>Bem-vindo</h1>
        <p>Texto</p>
        <div role="Grupo de botões da página inicial" className="grupoBotoes">
            <button onClick={() => { navigate("/partidas/form"); }} className="">Registrar Partida</button>
            <button onClick={() => { navigate("/jogadores"); }} className="">Jogadores</button>
            <button onClick={() => { navigate("/partidas"); }} className="">Partidas</button>
        </div>
    </main>
}

export default Inicial;