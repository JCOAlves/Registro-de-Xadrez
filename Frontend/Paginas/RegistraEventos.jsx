import { useState, useEffect } from "react";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function RegistraEvento({ setMensagem, setLogado }) {
    const [nomeEvento, setNome] = useState(["", null]);
    const [modalidadeEvento, setModalidade] = useState(["", null]);
    const [localEvento, setLocal] = useState(["", null]);
    const [diasEvento, setDias] = useState([["", null], ["", null]]);
    const [horarioEvento, setHoras] = useState([["", null], ["", null]]);
    const [datasIncricao, setInscricoes] = useState([["", null], ["", null]]);
    const [descricaoEvento, setDescricao] = useState("");
    const [submitDesabilitado, setDesabilitado] = useState(true);

    // Implementar validação de campo
    function ValidaCampo(dado, id){
        switch(id){
            case "nomeEvento":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setNome([dado, "Nome de evento não fornecido ou invalido"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setNome([dado, null]);
                    setDesabilitado(false);
                }
                break;

            case "modalidadeEvento":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setModalidade([dado, "Tipo de modalidade de evento não selecionado"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setModalidade([dado, null]);
                    setDesabilitado(false);
                }
                break;

            case "localEvento":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setLocal([dado, "Local de evento não fornecido ou invalido"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setLocal([dado, null]);
                    setDesabilitado(false);
                }
                break;

            case "dataInicio":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setDias([[dado, "Dia de inicio de evento não fornecido ou invalido"], diasEvento[1]]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setDias([[dado, null], diasEvento[1]]);
                    setDesabilitado(false);
                }
                break;

            case "dataFim":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setDias([diasEvento[0], [dado, "Dia de fim de evento não fornecido ou invalido"]]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setDias([diasEvento[0], [dado, null]]);
                    setDesabilitado(false);
                }
                break;

            case "horaInicio":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setHoras([[dado, "Hora de inicio de evento não fornecido ou invalido"], horarioEvento[1]]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setHoras([[dado, null], horarioEvento[1]]);
                    setDesabilitado(false);
                }
                break;

            case "horaFim":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setHoras([horarioEvento[0], [dado, "Hora fim de evento não fornecido ou invalido"]]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setHoras([horarioEvento[0], [dado, null]]);
                    setDesabilitado(false);
                }
                break;

            case "inicioInscricoes":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setInscricoes([[dado, "Data de inicio de inscricoes de evento não fornecido ou invalido"], datasIncricao[1]]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setInscricoes([[dado, null], datasIncricao[1]]);
                    setDesabilitado(false);
                }
                break;

            case "fimInscricoes":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setInscricoes([datasIncricao[0], [dado, "Data de fim de inscricoes de evento não fornecido ou invalido"]]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setInscricoes([datasIncricao[0], [dado, null]]);
                    setDesabilitado(false);
                }
                break;
        }
    }

    async function CadastrarEvento(e) {
        try {
            setDesabilitado(true);

            const formulario = e.currentTarget;
            if(!formulario.checkValidity()) return; // Verifica se o formulario é valido pelo navegador

            e.preventDefault();

            const dadosForm = {
                nomeEvento: nomeEvento[0], 
                localEvento: localEvento[0],
                modalidadeEvento: modalidadeEvento[0],
                descricaoEvento: descricaoEvento,
                dataInicio: diasEvento[0][0], 
                dataFim: diasEvento[1][0],
                horaInicio: horarioEvento[0][0], 
                horaFim: horarioEvento[1][0],
                data_inicioInscricao: datasIncricao[0][0],
                data_fimInscricao: datasIncricao[1][0]
            };
            const Requisicao = new RequisicaoHTTP("/eventos", dadosForm);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if(sucesso){
                setMensagem(mensagem);

            } else{
                setMensagem(mensagem);
            }

        } catch (error) {
            setMensagem("Erro no cadastro de novo evento no sistema");
            console.error("Erro no cadastro de novo evento no sistema: ", error.message || error);
        };
    };

    // Adicionar número maximo e minimo de caracteres nos campos
    return (<main className="sm:ml-[60px]">
        <form className="" onSubmit={(e) => {CadastrarEvento(e)}}>
            <h1>Registrar evento</h1>
            <div className="flex flex-col sm:flex-row gap-5">
                <label htmlFor="nomeEvento" className="flex flex-col gap-1">
                    <span>Nome evento<span className="text-red-600">*</span></span>
                    <input type="text" name="nomeEvento" id="nomeEvento" className="w-86 sm:w-95" value={nomeEvento[0]} placeholder="Digite o nome do evento" required autoComplete="off"
                        onInput={(e) => {setNome([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "nomeEvento")}}/>
                    <span className="text-red-600">{nomeEvento[1]}</span>
                </label>

                <label htmlFor="modalidadeEvento" className="flex flex-col gap-1">
                    <span>Modalidade evento<span className="text-red-600">*</span></span>
                    <select name="modalidadeEvento" id="modalidadeEvento" className="w-86 sm:w-auto" required value={modalidadeEvento[0]}
                        onChange={(e) => {setModalidade([e.target.value, null])}} onBlur={(e) => ValidaCampo(e.target.value, "modalidadeEvento")}>
                        <option value="" disabled>Tipo modalidade</option>
                        <option value="Individual">Individual</option>
                        <option value="Equipes">Equipes</option>
                        <option value="Individual e Equipes">Individual e Equipes</option>
                    </select>
                    <span className="text-red-600">{modalidadeEvento[1]}</span>
                </label>
            </div>

            <label htmlFor="localEvento" className="flex flex-col gap-1">
                <span>Local Evento<span className="text-red-600">*</span></span>
                <input type="text" name="localEvento" id="localEvento" className="w-86 sm:w-148" value={localEvento[0]}  placeholder="Digite o local do evento" autoComplete="off"
                    onInput={(e) => {setLocal([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "localEvento")}} required/>
                <span className="text-red-600">{localEvento[1]}</span>
            </label>

            <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-[1.5fr_1.5fr_0.5fr_0.5fr] sm:grid-rows-1 gap-[10px] sm:gap-[22px]">
                <label htmlFor="dataInicio" className="flex flex-col gap-1">
                    <span>Data Inicio<span className="text-red-600">*</span></span>
                    <input type="date" name="dataInicio" id="dataInicio" className="" value={diasEvento[0][0]} required
                        onInput={(e) => {setDias([[e.target.value, null], diasEvento[1]])}} onBlur={(e) => {ValidaCampo(e.target.value, "dataInicio")}}/>
                    <span className="text-red-600">{diasEvento[0][1]}</span>
                </label>

                <label htmlFor="dataFim" className="flex flex-col gap-1">
                    <span>Data fim<span className="text-red-600">*</span></span>
                    <input type="date" name="dataFim" id="dataFim" className="" value={diasEvento[1][0]} required
                        onInput={(e) => {setDias([diasEvento[0], [e.target.value, null]])}} onBlur={(e) => {ValidaCampo(e.target.value, "dataFim")}}/>
                    <span className="text-red-600">{diasEvento[1][1]}</span>
                </label>

                <label htmlFor="horaInicio" className="flex flex-col gap-1">
                    <span>Hora inicio<span className="text-red-600">*</span></span>
                    <input type="time" name="horaInicio" id="horaInicio" className="" value={horarioEvento[0][0]} required
                        onInput={(e) => {setHoras([[e.target.value, null], horarioEvento[1]])}} onBlur={(e) => {ValidaCampo(e.target.value, "horaInicio")}}/>
                    <span className="text-red-600">{horarioEvento[0][1]}</span>
                </label>

                <label htmlFor="horaFim" className="flex flex-col gap-1">
                    <span>Hora fim<span className="text-red-600">*</span></span>
                    <input type="time" name="horaFim" id="horaFim" className="" value={horarioEvento[1][0]} required
                        onInput={(e) => {setHoras([horarioEvento[0], [e.target.value, null]])}} onBlur={(e) => {ValidaCampo(e.target.value, "horaFim")}}/>
                    <span className="text-red-600">{horarioEvento[1][1]}</span>
                </label>
            </div>

            <div className="grid grid grid-cols-2 grid-rows-1  gap-3 sm:gap-4">
                <label htmlFor="inicioInscricoes" className="flex flex-col gap-1">
                    <span>Inicio de Inscrições<span className="text-red-600">*</span></span>
                    <input type="date" name="inicioInscricoes" id="inicioInscricoes" className="sm:w-73" value={datasIncricao[0][0]} required
                        onInput={((e) => {setInscricoes([[e.target.value, null], datasIncricao[1]])})} onBlur={(e) => {ValidaCampo(e.target.value, "inicioInscricoes")}}/>
                    <span className="text-red-600">{datasIncricao[0][1]}</span>
                </label>

                <label htmlFor="fimInscricoes" className="flex flex-col gap-1">
                    <span>Fim de Inscrições<span className="text-red-600">*</span></span>
                    <input type="date" name="fimInscricoes" id="fimInscricoes" className="sm:w-73" value={datasIncricao[1][0]} required
                        onInput={((e) => {setInscricoes([datasIncricao[0], [e.target.value, null]])})} onBlur={(e) => {ValidaCampo(e.target.value, "fimInscricoes")}}/>
                    <span className="text-red-600">{datasIncricao[1][1]}</span>
                </label>
            </div>

            <label htmlFor="descricaoEvento" className="flex flex-col gap-1">
                <span>Descrição</span>
                <textarea name="descricaoEvento" id="descricaoEvento" className="w-87 sm:w-148 h-40" value={descricaoEvento[0]}  placeholder="Escreva a descrição opcional do evento"
                    onInput={(e) => {setDescricao(e.target.value)}}/>
            </label>

            <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
        </form>

    </main>)
};

export default RegistraEvento;