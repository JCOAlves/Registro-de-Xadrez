import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { POST, GET, PUT } from "../FuncoesJS/MetodosHTTP.js";

function FormJogador({setMensagem, editarJogador=false}) {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [nomeJogador, setNomeJogador] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [generoJogador, setGenero] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(editarJogador){
            async function buscaDados(id) {
                try {
                    id ? null : () => { return <Navigate to={"/ERRO"}/> };
                    const resposta = await GET(`http://localhost:3000/jogadores/${id}`);
                    const { sucesso, dados } = resposta;
                    if(sucesso){
                        const [Jogador] = dados;
                        const { nomeJogador, nomeUsuario, dataNascimento, generoJogador } = Jogador;
                        setNomeJogador(nomeJogador);
                        setNomeUsuario(nomeUsuario);
                        setDataNascimento(dataNascimento);
                        setGenero(generoJogador);
                    }
                } catch (error) {
                    console.error("", error.message || error);
                    setMensagem("");
                }
            }

            buscaDados(id);
        };

    }, [id]);

    async function RegistrarJogador(e) {
        e.preventDefault();
        try {
            nomeJogador ? null : () => { setMensagem("Nome de jogador não fornecido."); return; };
            nomeUsuario ? null : () => { setMensagem("Nome de usuário de jogador não fornecido."); return; };
            dataNascimento ? null : () => { setMensagem("Data de nascimento de jogador não fornecido."); return; };
            generoJogador ? null : setGenero("Não informado");

            const dadosJogador = {
                nomeJogador: nomeJogador, nomeUsuario: nomeUsuario,
                dataNascimento: dataNascimento, generoJogador: generoJogador
            };
    
            const resposta = await POST("http://localhost:3000/jogadores", dadosJogador);
            const { mensagem } = resposta;
            setMensagem(mensagem);
            navigate("/jogadores");
            
        } catch (error) {
            console.error("Erro no registro de novo jogador no servidor: ", error.message || error);
            setMensagem("Erro no registro de novo jogador no servidor.");
        }
    };

    return (<main>
        <form onSubmit={(e) => {!editarJogador ? RegistrarJogador(e) : null}}>
            <h2>Formulario de jogador</h2>
            <label htmlFor="nomeJogador">Nome completo <span className="obrigatorio">*</span></label>
            <input type="text" name="nomeJogador" id="nomeJogador" placeholder="Nome e sobrenome." 
                maxLength={100} value={nomeJogador} required onInput={(e) => {setNomeJogador(e.target.value)}}/>
                
            <label htmlFor="nomeUsuario">Nome de usuário do jogador <span className="obrigatorio">*</span></label>
            <input type="text" name="nomeUsuario" id="nomeUsuario" placeholder="Nome de usuário do sistema." 
                maxLength={14} value={nomeUsuario} required onInput={(e) => {setNomeUsuario(e.target.value)}}/>
            
            <div role="caixa de campos de data de nascimento e de gênero de jogador" className="doisCampos">
                <div className="caixaCampo">
                    <label htmlFor="dataNascimento">Data de nascimento <span className="obrigatorio">*</span></label>
                    <input type="date" name="dataNascimento" id="dataNascimento" value={dataNascimento} required 
                        onInput={(e) => {setDataNascimento(e.target.value)}}/>
                </div>
                
                <div className="caixaCampo">
                    <label htmlFor="generoJogador">Gênero do jogador</label>
                    <select name="generoJogador" id="generoJogador" value={generoJogador} onChange={(e) => {setGenero(e.target.value)}}>
                        <option value="">Gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Não-Binario">Não-Binario</option>
                        <option value="Não informado">Não Informar</option>
                    </select>
                </div>
            </div>
                
            <button type="submit">{!editarJogador ? "Registrar" : "Editar"}</button>
        </form>
    </main>);
}

export default FormJogador;