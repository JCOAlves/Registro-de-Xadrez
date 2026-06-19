import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, User, Users, ChessRook, CalendarDays, LogOut, Swords, CalendarPlus, ShieldHalf, LayoutDashboard } from "lucide-react";
import LogoutSistema from '../Hook/LogoutSistema.js';


// Adicionar configuração para barra inferior
function BarraLateral({ tipoUsuario }){
    const [exibiBarra, setBarra] = useState(false);

    return(<nav className={`flex flex-row sm:flex-col justify-center content-center sm:justify-start gap-10 fixed z-5 w-full  h-[60px] bottom-0 sm:top-0 sm:left-0 ${exibiBarra ? "sm:w-[240px]" : "sm:w-[60px]"} sm:h-full`}>
        {exibiBarra ? <X size={28} color='red' strokeWidth={1.4} absoluteStrokeWidth={true} onClick={() => {setBarra(false)}} className='hidden ml-[180px] sm:flex'/> 
          : <Menu size={35} strokeWidth={1.4} absoluteStrokeWidth={true} onClick={() => {setBarra(true)}} className='hidden sm:flex'/>}

        <div className={`flex flex-row sm:flex-col gap-10 sm:gap-5`} role='Conjunto de links da páginas'>
          <Link to={"/perfil"} className={`${exibiBarra ? "sm:flex" : "sm:hidden"} flex-row gap-3`}>
            <User size={25}/> 
            <span className={'hidden sm:flex'}>Perfil</span>
          </Link>
          <Link to={"/mural"} className={`${exibiBarra ? "sm:flex" : "sm:hidden"} flex-row gap-3`}>
            <LayoutDashboard size={25}/> 
            <span className='hidden sm:flex'>Mural</span>
          </Link>

          {tipoUsuario === "Administrador" ? <>
              <Link to={"/novaPartida"} className={`${exibiBarra ? "sm:flex" : "sm:hidden"} flex-row gap-3`}>
                <Swords size={25}/> 
                <span className='hidden sm:flex'>Cadastrar Partida</span>
              </Link>
              <Link to={"/novoEvento"} className={`${exibiBarra ? "sm:flex" : "sm:hidden"} flex-row gap-3`}>
                <CalendarPlus size={25}/> 
                <span className='hidden sm:flex'>Cadastrar Evento</span>
              </Link>
            </> : <>
                <Link to={"/novaEquipe"} className={`${exibiBarra ? "sm:flex" : "sm:hidden"} flex-row gap-3`}>
                  <ShieldHalf size={25}/> 
                  <span className='hidden sm:flex'>Cadastrar Equipe</span>
                </Link>
          </>}

          <span onClick={() => {LogoutSistema()}} className={`${exibiBarra ? "sm:flex" : "sm:hidden"} flex-row gap-3`}>
            <LogOut size={25}/>
            <span className='hidden sm:flex'>Logout</span>
          </span>
        </div>
      </nav>);
};

export default BarraLateral;