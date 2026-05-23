import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Inicial.css";

function Inicial(){
    const navigate = useNavigate();

    return <main className="imagemFundo">
        <h1>Bem-vindo</h1>
        <p>Texto</p>
        <div role="Grupo de botões da página inicial" className="grupoBotoes">
            <Link to={'/partidas/form'}>Registrar Partida</Link>
            <Link to={'/jogadores'}>Jogadores</Link>
            <Link to={'/cadastroUsuario'}>Cadastro jogadores</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={''}></Link>
        </div>
    </main>
}

export default Inicial;