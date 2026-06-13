import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../Hook/RequisicaoHTTP.js";

function CadastroUsuario({ setMensagem, setLogado }){
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [nomeUsuario, setNome] = useState(["", null]);
    const [emailUsuario, setEmail] = useState(["", null]);
    const [nicknameJogador, setNickname] = useState(["", null]);
    const [senhaUsuario, setSenha] = useState(["", "", null]);
    const [submitDesabilitado, setDesabilitado] = useState(true);
    const navigate = useNavigate();

    function ConfirmaSenha(){
        if(senhaUsuario[0] === senhaUsuario[1]) {
            document.getElementById("senhaUsuario").style.borderColor = "black";
            document.getElementById("confirmaSenha").style.borderColor = "black";
            setSenha([senhaUsuario[0], senhaUsuario[1], null]);
            setDesabilitado(false);
        } else{
            document.getElementById("senhaUsuario").style.borderColor = "red";
            document.getElementById("confirmaSenha").style.borderColor = "red";
            setSenha([senhaUsuario[0], senhaUsuario[1], "Confirmação de senha retornou invalida"]);
            setDesabilitado(true);
        };
    };

    function ValidaCampo(dado, id){
        switch(id){
            case "emailUsuario":
                if(!dado || !dado.includes("@") || !dado.includes(".com")){
                    document.getElementById(id).style.borderColor = "red";
                    setEmail([dado, "Email não fornecido ou invalido"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setEmail([dado, null]);
                    setDesabilitado(false);
                }
                break;
            case "nicknameUsuario":
                if(!dado || dado.length < 8 || dado.length > 12){
                    document.getElementById(id).style.borderColor = "red";
                    setNickname([dado, "Nickname de jogador não fornecido ou nickname"])
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setNickname([dado, null]);
                    setDesabilitado(false);
                };
                break;
            case "senhaUsuario":
                if(!dado || dado.length < 8){
                    document.getElementById(id).style.borderColor = "red";
                    setSenha([dado, senhaUsuario[1], "Senha não fornecida ou tamanho inferior a 8 caracteres"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setSenha([dado, senhaUsuario[1], null]);
                    setDesabilitado(false);
                };
                break;
            case "nomeUsuario":
                if(!dado){
                    document.getElementById(id).style.borderColor = "red";
                    setNome([dado, "Nome de usuário não fornecido ou invalido"]);
                    setDesabilitado(true);

                } else{
                    document.getElementById(id).style.borderColor = "black";
                    setNome([dado, null]);
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
                nomeUsuario: nomeUsuario[0], 
                emailUsuario: emailUsuario[0], 
                senhaUsuario: senhaUsuario[0],
                tipoUsuario: tipoUsuario
            };
            if(tipoUsuario === "Jogador") dadosUsuario.nicknameJogador = nicknameJogador[0];

            const Requisicao = new RequisicaoHTTP("/usuarios", dadosUsuario);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem, erro } = Resposta;
            if(sucesso){
                setNome(["", null]);
                setEmail(["", null]);
                setNickname(["", null]);
                setSenha(["", "", null]);
                setLogado(true);
                navigate("/perfil");
                
            } else{
                setLogado(false);
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
        

    }, [nomeUsuario, emailUsuario, senhaUsuario, nicknameJogador, tipoUsuario]);

    return (<main>
        <h2 className="text-center">Cadastro de Usuário</h2>
        <form onSubmit={(e) => {SubmitCadastro(e)}}>
            <div className="flex content-center gap-4">
                <button onClick={() => {setTipoUsuario("Jogador")}} className="w-30 h-10">Jogador</button>
                <button onClick={() => {setTipoUsuario("Administrador")}} className="w-30 h-10">Administrador</button>
            </div>
                <br />
            
            {tipoUsuario ? (<>
                <label htmlFor="nomeUsuario" className="text-left">Nome completo<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90" type="text" name="nomeUsuario" id="nomeUsuario" placeholder="Nome e sobrenome" minLength={1} value={nomeUsuario[0]} 
                    onInput={(e) => {setNome([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "nomeUsuario")}} required/>
                <span className="text-red-600">{nomeUsuario[1]}</span>

                <label htmlFor="emailUsuario">Endereço de Email<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90" type="email" name="emailUsuario" id="emailUsuario" placeholder="exemplo@email.com" maxLength={50}
                    onInput={(e) => {setEmail([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "emailUsuario")}} value={emailUsuario[0]} required/>
                <span className="text-red-600">{emailUsuario[1]}</span>

                {tipoUsuario == "Jogador" ? (<>
                    <label htmlFor="nicknameUsuario">Nickname<span className="text-red-600">*</span></label>
                    <input className="w-full max-w-90" type="text" name="nicknameUsuario" id="nicknameUsuario" placeholder="Nome único com tamanho entre 8 a 12 caracteres" 
                        onInput={(e) => {setNickname([e.target.value, null])}} onBlur={(e) => {ValidaCampo(e.target.value, "nicknameUsuario")}} value={nicknameJogador[0]} minLength={8} maxLength={12} required/>
                    <span className="text-red-600">{nicknameJogador[1]}</span>
                </>) : null}

                <label htmlFor="senhaUsuario">Senha<span className="text-red-600">*</span></label>
                <input className="w-full max-w-90 mb-4" type="password" name="senhaUsuario" id="senhaUsuario"
                    placeholder="Minimo de 8 caracteres" minLength={8} required value={senhaUsuario[0]} onInput={(e) => { setSenha([e.target.value, "", null]) }} onBlur={(e) => {ValidaCampo(e.target.value, "senhaUsuario")}}/>

                <input className="w-full max-w-90" type="password" name="confirmaSenha" id="confirmaSenha"
                    placeholder="Comfirmar senha" minLength={8} required value={senhaUsuario[1]} onInput={(e) => { setSenha([senhaUsuario[0], e.target.value, null]) }} onBlur={() => {ConfirmaSenha()}}/>
                <span className="text-red-600">{senhaUsuario[2]}</span>

                <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
            </>) : null}
        </form>
    </main>)
}

export default CadastroUsuario;