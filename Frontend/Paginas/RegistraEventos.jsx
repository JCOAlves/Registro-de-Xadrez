import { useState, useEffect } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraEvento({ setMensagem, setLogado }) {
    const [nomeEvento, setNome] = useState("");
    const [modalidadeEvento, setModalidade] = useState("");
    const [localEvento, setLocal] = useState("");
    const [diasEvento, setDias] = useState(["", ""]);
    const [horarioEvento, setHoras] = useState(["", ""]);
    const [descricaoEvento, setDescricao] = useState("");
    const [submitDesabilitado, setDesabilitado] = useState(true);

    async function CadastrarEvento() {
        try {

        } catch (error) {
            console.error("ERRO: ", error.message || error);
        };
    };

    // Adicionar número maximo e minimo de caracteres nos campos
    return (<main className="sm:ml-[60px]">
        <form className="gap-4" onSubmit={() => { }}>
            <h1>Registrar evento</h1>
            <div className="flex flex-col sm:flex-row gap-5">
                <label htmlFor="nomeEvento" className="flex flex-col gap-1">
                    <span>Nome evento<span className="text-red-600">*</span></span>
                    <input type="text" name="nomeEvento" id="nomeEvento" className="w-86 sm:w-95" value={nomeEvento} required/>
                </label>

                <label htmlFor="modalidadeEvento" className="flex flex-col gap-1">
                    <span>Modalidade evento<span className="text-red-600">*</span></span>
                    <select name="modalidadeEvento" id="modalidadeEvento" className="w-86 sm:w-auto" required>
                        <option value="" disabled>Tipo modalidade</option>
                        <option value="">Individual</option>
                        <option value="">Equipes</option>
                        <option value="">Individuis e equipes</option>
                    </select>
                </label>
            </div>

            <label htmlFor="localEvento" className="flex flex-col gap-1">
                <span>Local Evento<span className="text-red-600">*</span></span>
                <input type="text" name="localEvento" id="localEvento" className="w-86 sm:w-148" value={localEvento} required/>
            </label>

            <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-[1.5fr_1.5fr_0.5fr_0.5fr] sm:grid-rows-1 gap-[10px] sm:gap-[22px]">
                <label htmlFor="dataInicio" className="flex flex-col gap-1">
                    <span>Data Inicio<span className="text-red-600">*</span></span>
                    <input type="date" name="dataInicio" id="dataInicio" className="" value={diasEvento[0]} required/>
                </label>

                <label htmlFor="dataFim" className="flex flex-col gap-1">
                    <span>Data fim<span className="text-red-600">*</span></span>
                    <input type="date" name="dataFim" id="dataFim" className="" value={diasEvento[1]} required/>
                </label>

                <label htmlFor="horaInicio" className="flex flex-col gap-1">
                    <span>Hora inicio<span className="text-red-600">*</span></span>
                    <input type="time" name="horaInicio" id="horaInicio" className="" value={horarioEvento[0]} required/>
                </label>

                <label htmlFor="horaFim" className="flex flex-col gap-1">
                    <span>Hora fim<span className="text-red-600">*</span></span>
                    <input type="time" name="horaFim" id="horaFim" className="" value={horarioEvento[1]} required/>
                </label>
            </div>

            <label htmlFor="descricaoEvento" className="flex flex-col gap-1">
                <span>Descrição</span>
                <textarea name="descricaoEvento" id="descricaoEvento" className="w-86 sm:w-148 h-40" value={descricaoEvento}/>
            </label>

            <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
        </form>

    </main>)
};

export default RegistraEvento;