import { useLocation } from "react-router-dom";

//Barra de Navegação da página

function BarraNavegacao({setBarra}){
    const location = useLocation();

    return <nav onScroll={() => {setBarra(false)}} onScrollEnd={() => {setBarra(true)}} className="">{location.pathname}</nav>
}

export default BarraNavegacao;