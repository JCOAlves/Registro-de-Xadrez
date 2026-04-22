import { useState, useEffect } from "react";
import FormPartida from "../Compornentes/FormPartida.jsx"
import RequisicaoHTTP from "../hook/RequisicaoHTTP.js";

function RegistraPartida({setMensagem}) {
    return <main>
        <FormPartida setMensagem={setMensagem}/>
    </main>
}

export default RegistraPartida;