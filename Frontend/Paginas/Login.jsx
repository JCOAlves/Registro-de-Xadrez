import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function Login({setMensagem, setLogado}){
    const [emailLogin, setEmail] = useState("");
    const [senhaLogin, setSenha] = useState("");
    const [submitHabilitado, setSubmit] = useState(false);
    const navigate = useNavigate();

    // Adcionar desibilitação do botão submit
    async function LoginUsuario(e) {
        try {
            e.preventDefault();
            setSubmit(false);
            
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
                setLogado(false);
            }
            
        } catch (error) {
            setMensagem("Erro no envio de dados para login");
            console.error("Erro no envio de dados para login: ", error.message || error);
        }
    };

    useEffect(() => {
        emailLogin && senhaLogin ? setSubmit(true) : setSubmit(false);

    }, [emailLogin, senhaLogin]);

    return (<main>
        <form onSubmit={(e) => {LoginUsuario(e)}}>
            <h1>Login</h1>
                <br/>
            <label htmlFor="emailUsuario">Endereço de Email<span className="text-red-600">*</span></label>
            <input type="email" name="emailUsuario" id="emailUsuario" placeholder="Digite seu email" 
                value={emailLogin} onInput={(e) => {setEmail(e.target.value)}} required autoComplete="off"/>
                <br/>
            <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
            <input type="password" name="senhaUsuario" id="senhaUsuario" placeholder="Digite sua senha" 
                value={senhaLogin} onInput={(e) => {setSenha(e.target.value)}} required/>
                <br/>
            <button type="submit" disabled={submitHabilitado}>Acessar</button>
        </form>
    </main>)
};

export default Login;