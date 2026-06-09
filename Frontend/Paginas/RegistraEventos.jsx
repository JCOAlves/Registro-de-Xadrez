import { useState, useEffect } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraEvento({setMensagem, setLogado}) {
    const [nomeEvento, setNome] = useState("");
    // Outros states...

    async function CadastrarEvento() {
        try {
            
        } catch (error) {
            console.error("ERRO: ", error.message || error);
        };
    };

    return (<main className="sm:ml-[60px]">
        <form className="" onSubmit={() => {}}>
            <h1>Registrar evento</h1>
            <label htmlFor="">Nome evento</label>
            <input type="text" name="" id="" />

            <label htmlFor="">Local Evento</label>
            <input type="text" name="" id="" />

            <label htmlFor="">Descrição</label>
            <textarea name="" id="" className=""></textarea>

            <label htmlFor="">Modalidade evento</label>
            <select name="" id="">
                <option value="" disabled>Tipo modalidade</option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
            </select>

            <label htmlFor="">Data Inicio</label>
            <input type="date" name="" id="" />

            <label htmlFor="">Data fim</label>
            <input type="date" name="" id="" />

            <label htmlFor="">Hora inicio</label>
            <input type="time" name="" id="" />
            
            <label htmlFor="">Hora fim</label>
            <input type="time" name="" id="" />

            <button type="submit">Cadastrar</button>
        </form>

    </main>)
};

export default RegistraEvento;