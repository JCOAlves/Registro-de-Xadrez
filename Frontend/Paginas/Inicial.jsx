import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Inicial.css";

function Inicial(){
    const navigate = useNavigate();

    return <main className="imagemFundo">
        <h1>Bem-vindo</h1>
        <p>Texto</p>
        <div role="Grupo de botões da página inicial" className="grupoBotoes">
            <Link to={'/cadastroUsuario'}>Cadastro jogadores</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    </main>
}

export default Inicial;