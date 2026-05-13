import { useState, useEffect } from "react";

// Compornente que fica por cida dos outros compornentes
function Sobriposicao({ elemento=null, exibir=true }){
    const [exibiElemento, setElemento] = useState(exibir);

    return (<>
        {elemento && exibiElemento ? 
        <main>
            <button onClick={() => {setElemento(false)}}>X</button>
            {elemento}
        </main> : null}
    </>)
}

export default Sobriposicao;