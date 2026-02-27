//Barra de Navegação da página

function BarraNavegacao({children, setBarra}){
    return <nav onScroll={() => {setBarra(false)}} onScrollEnd={() => {setBarra(true)}}>{children}</nav>
}

export default BarraNavegacao;