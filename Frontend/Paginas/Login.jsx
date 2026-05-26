import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Login({setMensagem, setLogado}){
    const [emailLogin, setEmail] = useState("");
    const [erroEmail, setErroEmail] = useState(null);
    const [senhaLogin, setSenha] = useState("");
    const [erroSenha, setErroSenha] = useState(null);
    const [submitDesabilitado, setDesabilitado] = useState(true);
    const navigate = useNavigate();

    // Melhorar verificação
    function ValidaCampo(dado, id){
        switch(id){
            case "emailUsuario":
                if(!dado || !dado.includes("@") || !dado.includes(".com")){
                    document.getElementById(id).style.borderColor = "red";
                    setErroEmail("Email não fornecido ou invalido");
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setErroEmail(null);
                    setDesabilitado(false);
                }
                break;
            case "senhaUsuario":
                if(!dado || dado.length < 8){
                    document.getElementById(id).style.borderColor = "red";
                    setErroSenha("Senha não fornecida ou comprimento menor que 8");
                    setDesabilitado(true);
                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setErroSenha(null);
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
            
            if(!emailLogin){
                document.getElementById("emailUsuario").style.borderColor = "red";
                return;
            }

            if(!senhaLogin){
                document.getElementById("senhaUsuario").style.borderColor = "red";
                return;
            }

            const Requisicao = new RequisicaoHTTP("/login", { emailUsuario: emailLogin, senhaUsuario: senhaLogin });
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if(sucesso){
                setMensagem(mensagem);
                setLogado(true);
                setEmail("");
                setSenha("");
                navigate("/");

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
        if(emailLogin && senhaLogin){
            ValidaCampo(emailLogin, "emailUsuario");
            ValidaCampo(senhaLogin, "senhaUsuario");
        }

    }, [emailLogin, senhaLogin]);

    return (<main>
        <form onSubmit={(e) => {LoginUsuario(e)}}>
            <h1>Login</h1>
                <br/>
            <label htmlFor="emailUsuario">Endereço de Email<span className="text-red-600">*</span></label>
            <input type="email" name="emailUsuario" id="emailUsuario" placeholder="Digite seu email" value={emailLogin} 
                onInput={(e) => {setEmail(e.target.value)}} onBlur={() => { ValidaCampo(emailLogin, "emailUsuario") }} required autoComplete="off"/>
            <span className="text-red-600">{erroEmail}</span>
                <br/>
            <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
            <input type="password" name="senhaUsuario" id="senhaUsuario" placeholder="Digite sua senha" 
                value={senhaLogin} onInput={(e) => {setSenha(e.target.value)}} onBlur={() => { ValidaCampo(senhaLogin, "senhaUsuario") }} required/>
            <span className="text-red-600">{erroSenha}</span>
                <br/>
            <button type="submit" disabled={submitDesabilitado}>Acessar</button>
        </form>
    </main>)
};

export default Login;