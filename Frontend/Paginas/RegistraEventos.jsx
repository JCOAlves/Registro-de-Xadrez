import { useState, useEffect } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraEvento({ setMensagem, setLogado }) {
    const [nomeEvento, setNome] = useState(["", null]);
    const [modalidadeEvento, setModalidade] = useState(["", null]);
    const [localEvento, setLocal] = useState(["", null]);
    const [diasEvento, setDias] = useState([["", null], ["", null]]);
    const [horarioEvento, setHoras] = useState([["", null], ["", null]]);
    const [datasIncricao, setInscricoes] = useState([["", null], ["", null]]);
    const [descricaoEvento, setDescricao] = useState(["", null]);
    const [submitDesabilitado, setDesabilitado] = useState(true);

    // Implementar validação de campo
    function ValidaCampo(dado, id){
        switch(id){
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
            case "":
                break;
        }
    } // Exibir erros de validação

    async function CadastrarEvento(e) {
        try {
            setDesabilitado(true);

            const formulario = e.currentTarget;
            if(!formulario.checkValidity()) return; // Verifica se o formulario é valido pelo navegador

            e.preventDefault();

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
                    <input type="text" name="nomeEvento" id="nomeEvento" className="w-86 sm:w-95" value={nomeEvento[0]} required
                        onInput={(e) => {setNome([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "nomeEvento")}}/>
                </label>

                <label htmlFor="modalidadeEvento" className="flex flex-col gap-1">
                    <span>Modalidade evento<span className="text-red-600">*</span></span>
                    <select name="modalidadeEvento" id="modalidadeEvento" className="w-86 sm:w-auto" required value={modalidadeEvento[0]} 
                        onChange={(e) => {setModalidade([e.target.value, null])}} onBlur={(e) => ValidaCampo(e.target.value, "modalidadeEvento")}>
                        <option value="" disabled>Tipo modalidade</option>
                        <option value="Individual">Individual</option>
                        <option value="Equipes">Equipes</option>
                        <option value="Individuis e equipes">Individuis e equipes</option>
                    </select>
                </label>
            </div>

            <label htmlFor="localEvento" className="flex flex-col gap-1">
                <span>Local Evento<span className="text-red-600">*</span></span>
                <input type="text" name="localEvento" id="localEvento" className="w-86 sm:w-148" value={localEvento[0]}
                    onInput={(e) => {setLocal([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "localEvento")}} required/>
            </label>

            <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-[1.5fr_1.5fr_0.5fr_0.5fr] sm:grid-rows-1 gap-[10px] sm:gap-[22px]">
                <label htmlFor="dataInicio" className="flex flex-col gap-1">
                    <span>Data Inicio<span className="text-red-600">*</span></span>
                    <input type="date" name="dataInicio" id="dataInicio" className="" value={diasEvento[0][0]} required
                        onInput={(e) => {setDias([[e.target.value, null], diasEvento[1]])}} onBlur={(e) => {ValidaCampo(e.target.value, "dataInicio")}}/>
                </label>

                <label htmlFor="dataFim" className="flex flex-col gap-1">
                    <span>Data fim<span className="text-red-600">*</span></span>
                    <input type="date" name="dataFim" id="dataFim" className="" value={diasEvento[1][0]} required
                        onInput={(e) => {setDias([diasEvento[0], [e.target.value, null]])}} onBlur={(e) => {ValidaCampo(e.target.value, "dataFim")}}/>
                </label>

                <label htmlFor="horaInicio" className="flex flex-col gap-1">
                    <span>Hora inicio<span className="text-red-600">*</span></span>
                    <input type="time" name="horaInicio" id="horaInicio" className="" value={horarioEvento[0][0]} required
                        onInput={(e) => {setHoras([[e.target.value, null], horarioEvento[1]])}} onBlur={(e) => {ValidaCampo(e.target.value, "horaInicio")}}/>
                </label>

                <label htmlFor="horaFim" className="flex flex-col gap-1">
                    <span>Hora fim<span className="text-red-600">*</span></span>
                    <input type="time" name="horaFim" id="horaFim" className="" value={horarioEvento[1][0]} required
                        onInput={(e) => {setHoras([horarioEvento[0], [e.target.value, null]])}} onBlur={(e) => {ValidaCampo(e.target.value, "horaFim")}}/>
                </label>
            </div>

            <div className="grid grid grid-cols-2 grid-rows-1  gap-3 sm:gap-4">
                <label htmlFor="inicioInscricoes" className="flex flex-col gap-1">
                    <span>Inicio de Inscrições<span className="text-red-600">*</span></span>
                    <input type="date" name="inicioInscricoes" id="inicioInscricoes" className="sm:w-73" value={datasIncricao[0][0]} required
                        onInput={((e) => {setInscricoes([[e.target.value, null], datasIncricao[1]])})} onBlur={(e) => {ValidaCampo(e.target.value, "inicioInscricoes")}}/>
                </label>

                <label htmlFor="fimInscricoes" className="flex flex-col gap-1">
                    <span>Fim de Inscrições<span className="text-red-600">*</span></span>
                    <input type="date" name="fimInscricoes" id="fimInscricoes" className="sm:w-73" value={datasIncricao[1][0]} required
                        onInput={((e) => {setInscricoes([datasIncricao[0]], [e.target.value, null])})} onBlur={(e) => {ValidaCampo(e.target.value, "fimInscricoes")}}/>
                </label>
            </div>

            <label htmlFor="descricaoEvento" className="flex flex-col gap-1">
                <span>Descrição</span>
                <textarea name="descricaoEvento" id="descricaoEvento" className="w-87 sm:w-148 h-40" value={descricaoEvento[0]}
                    onInput={(e) => {setDescricao([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "descricaoEvento")}}/>
            </label>

            <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
        </form>

    </main>)
};

export default RegistraEvento;