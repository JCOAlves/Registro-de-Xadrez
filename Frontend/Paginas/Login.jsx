import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Login({setMensagem, setLogado}){
    const [emailLogin, setEmail] = useState(["", null]);
    const [senhaLogin, setSenha] = useState(["", null]);
    const [submitDesabilitado, setDesabilitado] = useState(true);
    const navigate = useNavigate();

    // Melhorar verificação
    function ValidaCampo(dado, id){
        switch(id){
            case "emailUsuario":
                if(!dado || !dado.includes("@") || !dado.includes(".com")){
                    document.getElementById(id).style.borderColor = "red";
                    setEmail([emailLogin[0], "Email não fornecido ou invalido"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setEmail([emailLogin[0], null]);
                    setDesabilitado(false);
                }
                break;
            case "senhaUsuario":
                if(!dado || dado.length < 8){
                    document.getElementById(id).style.borderColor = "red";
                    setSenha([senhaLogin[0], "Senha não fornecida ou comprimento menor que 8"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setSenha([senhaLogin[0], null]);
                    setDesabilitado(false);
                }
                break;
        }
    }

    // Adcionar desibilitação do botão submit
    async function LoginUsuario(e) {
        try {
            setDesabilitado(false);
            
            const formulario = e.currentTarget;
            if(!formulario.checkValidity()) return; // Verifica se o formulario é valido pelo navegador

            e.preventDefault();

            const Requisicao = new RequisicaoHTTP("/login", { emailUsuario: emailLogin[0], senhaUsuario: senhaLogin[0] });
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if(sucesso){
                setMensagem(mensagem);
                setLogado(true);
                setEmail(["", null]);
                setSenha(["", null]);
                navigate("/perfil");

            } else{
                setMensagem(mensagem);
                setDesabilitado(true);
                setLogado(false);
                if(erro) console.error("ERRO: "+erro);
            }
            
        } catch (error) {
            setMensagem("Erro no envio de dados para login");
            console.error("Erro no envio de dados para login: ", error.message || error);
        }
    };

    useEffect(() => {
        
    }, [emailLogin, senhaLogin]);

    return (<main>
        <form onSubmit={(e) => {LoginUsuario(e)}}>
            <h1>Login</h1>
                <br/>
            <label htmlFor="emailUsuario">Endereço de Email<span className="text-red-600">*</span></label>
            <input type="email" name="emailUsuario" id="emailUsuario" placeholder="Digite seu email" value={emailLogin[0]} 
                onInput={(e) => {setEmail([e.target.value, null])}} onBlur={(e) => { ValidaCampo(e.target.value, "emailUsuario") }} required autoComplete="off"/>
            <span className="text-red-600">{emailLogin[1]}</span>
                <br/>
            <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
            <input type="password" name="senhaUsuario" id="senhaUsuario" placeholder="Digite sua senha" 
                value={senhaLogin[0]} onInput={(e) => {setSenha([e.target.value, null])}} onBlur={(e) => { ValidaCampo(e.target.value, "senhaUsuario") }} required/>
            <span className="text-red-600">{senhaLogin[1]}</span>
                <br/>
            <button type="submit" disabled={submitDesabilitado}>Acessar</button>
        </form>
    </main>)
};

export default Login;