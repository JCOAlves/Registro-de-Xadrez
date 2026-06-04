import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Adicionar configuração para barra inferior
function BarraLateral({usuario=null, tipoBarra="Lateral"}){
    const [exibiBarra, setBarra] = useState(false);
    const [styleBarra, setStyleBarra] = useState({ barraLateral: "none", linksPaginas: "60px" });

    useEffect(() => {
        !exibiBarra ? setStyleBarra({ barraLateral: "hidden", linksPaginas: "60px" }) : setStyleBarra({ barraLateral: "flex", linksPaginas: "200px" });

    }, [exibiBarra, tipoBarra]);

    return(<nav className={`flex flex-col flex-nowrap justify-start gap-25 fixed z-5 top-0 left-0 right-0 w-[${styleBarra.linksPaginas}]`}>
        {exibiBarra ? <X size={28} color='red' strokeWidth={1.4} absoluteStrokeWidth={true} onClick={() => {setBarra(false)}}/> 
          : <Menu size={35} strokeWidth={1.4} absoluteStrokeWidth={true} onClick={() => {setBarra(true)}}/>}

        <div className={`${styleBarra.barraLateral} flex-col gap-4`}>
          <Link to={"/perfil"}>Perfil</Link>
          <Link to={"/jogadores"}>Jogadores</Link>
          <Link to={"/equipes"}>Equipes</Link>
          <Link to={"/eventos"}>Eventos</Link>
          <Link to={"/logout"}>Logout</Link>

          {usuario && usuario.tipoUsuario === "Administrador" ? <>
              <Link to={"/novaPartida"}>Cadastrar Partida</Link>
              <Link to={"/novoEvento"}>Cadastrar Evento</Link>
            </> : <>
              <Link to={"/novaEquipe"}>Cadastrar Equipe</Link>
          </>}
        </div>
      </nav>);
};

export default BarraLateral;