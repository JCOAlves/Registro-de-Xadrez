import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Inicial.css";

function Inicial(){
    const navigate = useNavigate();

    return <main className="imagemFundo">
        <h1>Bem-vindo ao Chessnet</h1>
        <p> um plataforma para jogadores e administradores de eventos de xadrez</p>
        <div role="Grupo de botões da página inicial" className="grupoBotoes">
            <Link to={'/cadastroUsuario'} className="">Cadastro jogadores</Link>
            <Link to={'/login'} className="">Login</Link>
        </div>
    </main>
}

export default Inicial;