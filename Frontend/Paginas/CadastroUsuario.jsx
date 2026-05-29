import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function CadastroUsuario({ setMensagem }){
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [nomeUsuario, setNome] = useState("");
    const [erroNome, setErroNome] = useState(null);
    const [emailUsuario, setEmail] = useState("");
    const [erroEmail, setErroEmail] = useState(null);
    const [nicknameJogador, setNickname] = useState("");
    const [erroNickname, setErroNickname] = useState(null);
    const [senhaUsuario, setSenha] = useState("");
    const [senhaConfirmacao, setConfirmacao] = useState("");
    const [erroSenha, setErroSenha] = useState(null);
    const [submitDesabilitado, setDesabilitado] = useState(true);
    const navigate = useNavigate();

    function ConfirmaSenha(){
        if(senhaUsuario === senhaConfirmacao) {
            document.getElementById("senhaUsuario").style.borderColor = "black";
            document.getElementById("confirmaSenha").style.borderColor = "black";
            setErroSenha(null);
            setDesabilitado(false);
        } else{
            document.getElementById("senhaUsuario").style.borderColor = "red";
            document.getElementById("confirmaSenha").style.borderColor = "red";
            setErroSenha("Confirmação de senha retornou invalida");
            setDesabilitado(true);
        };
    };

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
            case "nicknameUsuario":
                if(!dado || dado.length < 8 || dado.length > 12){
                    document.getElementById(id).style.borderColor = "red";
                    setErroNickname("Nickname de jogador não fornecido ou nickname ");
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setErroNickname(null);
                    setDesabilitado(false);
                };
                break;
            case "senhaUsuario":
                if(!dado || dado.length < 8){
                    document.getElementById(id).style.borderColor = "red";
                    setErroSenha("Senha não fornecida ou tamanho inferior a 8 caracteres");
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setErroSenha(null);
                    setDesabilitado(false);
                };
                break;
            case "nomeUsuario":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setErroNome("Nome de usuário não fornecido ou invalido");
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setErroNome(null);
                    setDesabilitado(false);
                };
                break;
        }
    }


    // Adicionar verificação de email e nickname já cadastrados
    async function SubmitCadastro(e){
        try {
            setDesabilitado(true);
            
            const formulario = e.currentTarget;
            if(!formulario.checkValidity()) return; // Verifica se o formulario é valido pelo navegador
            
            e.preventDefault();
    
            let dadosUsuario = {
                nomeUsuario: nomeUsuario, 
                emailUsuario: emailUsuario, 
                senhaUsuario: senhaUsuario,
                tipoUsuario: tipoUsuario
            };
            if(tipoUsuario === "Jogador") dadosUsuario.nicknameJogador = nicknameJogador;
            console.log(dadosUsuario);

            const Requisicao = new RequisicaoHTTP("/usuarios", dadosUsuario);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro, dados } = Resposta;
            if(sucesso){
                setNome("");
                setEmail("");
                setNickname("");
                setSenha("");
                navigate(`/usuarios/${dados}`); // redirecionar para o perfil depois de logar
            } else{
                setMensagem(mensagem);
                setDesabilitado(false);
                if(erro) console.error("ERRO: "+erro);
            }
            
        } catch (error) {
            setMensagem("Erro no envio de dados para cadastro de usuário");
            console.error("Erro no envio de dados para cadastro de usuário: ", error.message || error);
        };
    };

    useEffect(() => {
        if(nomeUsuario && emailUsuario && senhaUsuario || nicknameJogador){
            ValidaCampo(nomeUsuario, "nomeUsuario");
            ValidaCampo(emailUsuario, "emailUsuario");
            if(tipoUsuario === "Jogador") ValidaCampo(nicknameJogador, "nicknameUsuario");
            ValidaCampo(senhaUsuario, "senhaUsuario");
        }

    }, [nomeUsuario, emailUsuario, senhaUsuario, nicknameJogador, tipoUsuario]);

    return (<main>
        <h2 className="text-center">Cadastro de Usuário</h2>
        <form onSubmit={(e) => {SubmitCadastro(e)}}>
            <div className="flex content-center">
                <button onClick={() => {setTipoUsuario("Jogador")}}>Jogador</button>
                <button onClick={() => {setTipoUsuario("Administrador")}}>Administrador</button>
            </div>
                <br />
            
            {tipoUsuario ? (<>
                <label htmlFor="nomeUsuario" className="text-left">Nome completo<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90" type="text" name="nomeUsuario" id="nomeUsuario" placeholder="Nome e sobrenome" minLength={1} value={nomeUsuario} 
                    onInput={(e) => {setNome(e.target.value)}} onBlur={() => {ValidaCampo(nomeUsuario, "nomeUsuario")}} required/>
                <span className="text-red-600">{erroNome}</span>

                <label htmlFor="emailUsuario">Endereço de Email<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90" type="email" name="emailUsuario" id="emailUsuario" placeholder="exemplo@email.com" maxLength={50}
                    onInput={(e) => {setEmail(e.target.value)}} onBlur={() => {ValidaCampo(emailUsuario, "emailUsuario")}} required/>
                <span className="text-red-600">{erroEmail}</span>

                {tipoUsuario == "Jogador" ? (<>
                    <label htmlFor="nicknameUsuario">Nickname<span className="text-red-600">*</span></label>
                    <input className="w-full max-w-90" type="text" name="nicknameUsuario" id="nicknameUsuario" placeholder="Nome único com tamanho entre 8 a 12 caracteres" 
                        onInput={(e) => {setNickname(e.target.value)}} onBlur={() => {ValidaCampo(nicknameJogador, "nicknameUsuario")}} minLength={8} maxLength={12} required/>
                    <span className="text-red-600">{erroNickname}</span>
                </>) : null}

                <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90" type="password" name="senhaUsuario" id="senhaUsuario"
                    placeholder="Minimo de 8 caracteres" minLength={8} required value={senhaUsuario} onInput={(e) => { setSenha(e.target.value) }} onBlur={() => {ValidaCampo(senhaUsuario, "senhaUsuario")}}/>

                <input className="w-full max-w-90" type="password" name="confirmaSenha" id="confirmaSenha"
                    placeholder="Comfirmar senha" minLength={8} required value={senhaConfirmacao} onInput={(e) => { setConfirmacao(e.target.value) }} onBlur={() => {ConfirmaSenha()}}/>
                <span className="text-red-600">{erroSenha}</span>

                <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
            </>) : null}
        </form>
    </main>)
}

export default CadastroUsuario;