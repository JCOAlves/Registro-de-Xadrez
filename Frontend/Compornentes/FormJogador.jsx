import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../hook/RequisicaoHTTP.js";

function FormJogador({setMensagem, exibiForm, editarJogador=false, dadosJogador=null}) {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [nomeJogador, setNomeJogador] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [generoJogador, setGenero] = useState("");
    const [ID_jogador, setID] = useState(null);
    const [Jogador, setJogador] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if(editarJogador && dadosJogador != null){
            const [Data] = (new Date(dadosJogador.dataNascimento).toISOString()).split("T");
            dadosJogador.dataNascimento = Data;
            setJogador(dadosJogador);

            const { nomeUsuario, nomeJogador, dataNascimento, generoJogador, ID_jogador } = dadosJogador;
            setNomeUsuario(nomeUsuario);
            setNomeJogador(nomeJogador);
            setGenero(generoJogador);
            setDataNascimento(dataNascimento);
            setID(ID_jogador);
        };

    }, [dadosJogador]);

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
    
            const Requisicao = new RequisicaoHTTP("/jogadores", dadosJogador);
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem } = Resposta;
            if(sucesso){
                setMensagem(mensagem);
                navigate("/jogadores");
            }
            
        } catch (error) {
            console.error("Erro no registro de novo jogador no servidor: ", error.message || error);
            setMensagem("Erro no registro de novo jogador no servidor.");
        }
    };

    async function AtualizarJogador(e, ID_jogador, Jogador) {
        e.preventDefault();
        try {
            const confirmaEdit = confirm("Deseja prosseguir com a ação de atualização de dados?");
            if(confirmaEdit){
                const dadosAtualizados = {
                    nomeJogador: nomeJogador === Jogador.nomeJogador ? null : nomeJogador, 
                    nomeUsuario: nomeUsuario === Jogador.nomeUsuario ? null : nomeUsuario,
                    dataNascimento: dataNascimento === Jogador.dataNascimento ? null : dataNascimento, 
                    generoJogador: generoJogador === Jogador.generoJogador ? null : generoJogador
                }
    
                const Requisicao = new RequisicaoHTTP(`/jogadores/${ID_jogador}`, dadosAtualizados);
                const Resposta = await Requisicao.PUT();
                const { sucesso, mensagem } = Resposta;
                if(sucesso){
                    setMensagem(mensagem);
                    navigate(0);
                    exibiForm(false);
                };
            }
            
        } catch (error) {
            console.error("Erro na atualização de dados de jogador no servidor: ", error.message || error);
            setMensagem("Erro na atualização de dados de jogador no servidor.");
        }
        
    }

    return (<>
        <form onSubmit={(e) => {!editarJogador ? RegistrarJogador(e) : AtualizarJogador(e, ID_jogador, Jogador)}}>
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
            { editarJogador ? <input type="hidden" name="ID_jogador" value={ID_jogador} /> : null }
                
            <button type="submit">{!editarJogador ? "Registrar" : "Editar"}</button>
            {editarJogador ? <button onClick={() => {exibiForm(false)}}>Cancelar</button> : null}
        </form>
    </>);
}

export default FormJogador;