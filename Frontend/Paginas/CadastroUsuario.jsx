import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function CadastroUsuario({ jogador, setMensagem }){
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [nomeUsuario, setNome] = useState("");
    const [emailUsuario, setEmail] = useState("");
    const [nicknameJogador, setNickname] = useState("");
    const [senhaUsuario, setSenha] = useState("");
    const [senhaConfirmacao, setConfirmacao] = useState("");
    const [submitDesabilitado, setDesabilitado] = useState(true);
    const navigate = useNavigate();

    function ConfirmaSenha(){
        if(senhaUsuario === senhaConfirmacao) {
            document.getElementById("senhaUsuario").style.borderColor = "black";
            document.getElementById("confirmaSenha").style.borderColor = "black";
        } else{
            setMensagem("Validação de senha retornou invalida");
            document.getElementById("senhaUsuario").style.borderColor = "red";
            document.getElementById("confirmaSenha").style.borderColor = "red";
        };
    };


    // Adicionar verificação de email e nickname já cadastrados
    async function SubmitCadastro(e){
        try {
            const formulario = e.currentTarget;
            if(!formulario.checkValidity()) return; // Verifica se o formulario é valido pelo navegador
            
            e.preventDefault();
            setDesabilitado(true);
    
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
                setNome("");
                setEmail("");
                setNickname("");
                setSenha("");
                navigate(`/`);
            } else{
                setMensagem(mensagem);
                setDesabilitado(false);
            }
            
        } catch (error) {
            setMensagem("Erro no envio de dados para cadastro de usuário");
            console.error("Erro no envio de dados para cadastro de usuário: ", error.message || error);
        };
    };

    useEffect(() => {
        (nomeUsuario && emailUsuario && senhaUsuario) || nicknameJogador ? setDesabilitado(false) : setDesabilitado(true);

    }, [nomeUsuario, emailUsuario, senhaUsuario, nicknameJogador]);

    return (<main>
        <h2 className="text-center">Cadastro de Usuário</h2>
        <form onSubmit={(e) => {CadastroUsuario(e)}}>
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
                <input className="w-full max-w-90" type="text" name="nicknameUsuario" id="nicknameUsuario" 
                    placeholder="Nome único no sistema" minLength={8} maxLength={12} required/>
            </>) : null}

            <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
            <input className="w-full max-w-90" type="password" name="senhaUsuario" id="senhaUsuario" 
                placeholder="Minimo de 8 caracteres" minLength={8} required value={senhaUsuario} onInput={(e) => { setSenha(e.target.value) }} onBlur={() => {ConfirmaSenha()}}/>

            <input className="w-full max-w-90" type="password" name="confirmaSenha" id="confirmaSenha" 
                placeholder="Comfirmar senha" minLength={8} required value={senhaConfirmacao} onInput={(e) => { setConfirmacao(e.target.value) }} onBlur={() => {ConfirmaSenha()}}/>
            <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
        </form>
    </main>)
}

export default CadastroUsuario;