import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP";

function RegistraEquipe({ setMensagem, ID_jogador=null }) {
    const [nomeEquipe, setNome] = useState(["", null]);
    const [liderEquipe, setLider] = useState(null)
    const [submitDesabilitado, setDesabilitado] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => { ID_jogador ? setLider(ID_jogador) : navigate("/NEGADO") }, [ID_jogador]);

    function ValidaCampo(dado, id){
        switch (id) {
            case "nomeEquipe":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setNome([dado, "Nome de equipe não fornecido ou invalido"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setNome([dado, null]);
                    setDesabilitado(false);
                }
                break;
        };
    };

    async function CadastraEquipe(e) {
        try {
            setDesabilitado(true);

            const formulario = e.currentTarget;
            if(!formulario.checkValidity()) return;

            e.preventDefault();
            console.log({ nomeEquipe: nomeEquipe[0], liderEquipe: liderEquipe })

            const Requisicao = new RequisicaoHTTP("/equipes", { nomeEquipe: nomeEquipe[0], liderEquipe: liderEquipe });
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem } = Resposta;
            if(sucesso){
                setMensagem(mensagem);
                setNome(["", null]);
                return;

            } else{
                setMensagem(mensagem);
                return;
            }
            
        } catch (error) {
            setMensagem("Erro no cadastro de equipe no sistema");
            console.error("Erro no cadastro de equipe no sistema: ", error.message || error);
        }
    }

    return (<main className="sm:ml-[60px]">
        <form onSubmit={(e) => { CadastraEquipe(e) }}>
            <h1>Cadastro de Equipe</h1>
            <label htmlFor="nomeEquipe" className="flex flex-col gap-1">
                <span>Nome da Equipe <span className="text-red-500">*</span></span>
                <input className="w-80" type="text" name="nomeEquipe" id="nomeEquipe" placeholder="Digite o nome da equipe" value={nomeEquipe[0]} maxLength={100} 
                   onInput={(e) => {setNome([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "nomeEquipe")}} required/>
                <span className="text-red-500">{nomeEquipe[1]}</span>
            </label>
            <button type="submit" disabled={submitDesabilitado} className="mt-5">Cadastrar</button>
        </form>
    </main>)
};

export default RegistraEquipe;