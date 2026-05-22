import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function CadastroUsuario({ jogador, setMensagem }){
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [nomeUsuario, setNome] = useState("");
    const [emailUsuario, setEmail] = useState("");
    const [nicknameJogador, setNickname] = useState("");
    const [senhaUsuario, setSenha] = useState("");
    const [habilitarSubimit, setSubimit] = useState(false);

    function ConfirmaSenha(){
        const SenhaUsuario = document.getElementById("senhaUsuario").value;
        const ComfirmaSenha = document.getElementById("confirmaSenha").value;
        SenhaUsuario === ComfirmaSenha ? setSenha(SenhaUsuario) : setSenha("");
    }

    // Adicionar verificação de email e nickname já cadastrados
    async function SubmitCadastro(e){
        try {
            e.preventDEfault();

            if(!nomeUsuario){
                document.getElementById("nomeUsuario").style.borderColor = "red";
                return;
            }

            if(!emailUsuario || !emailUsuario.includes(".com") || !emailUsuario.includes("@")){
                document.getElementById("emailUsuario").style.borderColor = "red";
                return;
            }

            if((!nicknameJogador || !nicknameJogador.length >= 8) && tipoUsuario === "Jogador"){
                document.getElementById("nicknameUsuario").style.borderColor = "red";
                return;
            }

            if(!senhaUsuario || !senhaUsuario.length >= 8){
                document.getElementById("senhaUsuario").style.borderColor = "red";
                document.getElementById("confirmaSenha").style.borderColor = "red";
                return;
            }
    
            let dadosUsuario = {
                nomeUsuario: nomeUsuario, 
                emailUsuario: emailUsuario, 
                senhaUsuario: senhaUsuario,
                tipoUsuario: tipoUsuario
            };
            if(tipoUsuario === "Jogador") dadosUsuario.nicknameJogador = nicknameJogador;

            const Requisicao = new RequisicaoHTTP("/usuarios", dadosUsuario);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if(sucesso){

            } else{

            }
            
        } catch (error) {
            setMensagem("Erro no envio de dados para cadastro de usuário");
            console.error("Erro no envio de dados para cadastro de usuário: ", error.message || error);
        }
    }

    useEffect(() => {
        (nomeUsuario && emailUsuario && senhaUsuario) || nicknameJogador ? setSubimit(true) : setSubimit(false);

    }, [nomeUsuario, emailUsuario, senhaUsuario, nicknameJogador]);

    return (<main>
        <h2 className="text-center">Cadastro de Usuário</h2>
        <form onSubmit={() => {}}>
            <div className="flex content-center">
                <button onClick={() => {setTipoUsuario("Jogador")}}>Jogador</button>
                <button onClick={() => {setTipoUsuario("Administrador")}}>Administrador</button>
            </div>
            
            <label htmlFor="nomeUsuario" className="text-left">Nome completo<span className="text-red-600">*</span></label>
            <input className="w-full max-w-90" type="text" name="nomeUsuario" id="nomeUsuario" placeholder="Nome e sobrenome" minLength={1} required/>
            
            <label htmlFor="emailUsuario">Endereço de Email<span className="text-red-600">*</span></label>
            <input className="w-full max-w-90" type="email" name="emailUsuario" id="emailUsuario" placeholder="Formato: exemplo@email.com" required/>
        
            {tipoUsuario == "Jogador" ? (<>
                <label htmlFor="nicknameUsuario">Nickname (nomeUsuario)<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90" type="text" name="nicknameUsuario" id="nicknameUsuario" placeholder="Nome único no sistema" minLength={8} maxLength={12} required/>
            </>) : null}

            <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
            <input className="w-full max-w-90" type="password" name="senhaUsuario" id="senhaUsuario" placeholder="Minimo de 8 caracteres" minLength={8} required value={senhaUsuario}/>

            <input className="w-full max-w-90" type="password" name="confirmaSenha" id="confirmaSenha" placeholder="Comfirmar senha" minLength={8} required value={senhaUsuario} onInput={() => { ConfirmaSenha() }}/>
            <button type="submit" disabled={habilitarSubimit}>Cadastrar</button>
        </form>
    </main>)
}

export default CadastroUsuario;