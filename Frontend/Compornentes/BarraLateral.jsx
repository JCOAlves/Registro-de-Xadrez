import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function BarraLateral({usuario=null}){
    const [exibiBarra, setBarra] = useState(false);
    const [styleBarra, setStyleBarra] = useState({ display: "flex", width: "200px" });

    // Gerencia barra lateral
    useEffect(() => {
        if(exibiBarra){
        setStyleBarra({ display: "flex", width: "200px" });
        return;

        } else{
        setStyleBarra({ display: "none", width: "60px" });
        return;
        }

    }, [exibiBarra]);

    return(
        <nav style={{ width: styleBarra.width }} className='flex flex-col flex-nowrap justify-start'>
        {exibiBarra ? <X size={28} color='red' strokeWidth={1.4} absoluteStrokeWidth={true} onClick={() => {setBarra(false)}}/> 
          : <Menu size={35} color='red' strokeWidth={1.4} absoluteStrokeWidth={true} onClick={() => {setBarra(true)}}/>}

        <div className='flex-col gap-4' style={{ display: styleBarra.display }}>
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
      </nav>
    );
};

export default BarraLateral;