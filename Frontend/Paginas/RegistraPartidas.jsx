import { useState, useEffect } from "react";
import FormPartida from "../Compornentes/FormPartida.jsx"
import { POST } from "../FuncoesJS/MetodosHTTP.js";

function RegistraPartida({setMensagem}) {
    return <main>
        <FormPartida setMensagem={setMensagem}/>
    </main>
}

export default RegistraPartida;