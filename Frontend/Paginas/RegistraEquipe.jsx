import { useState, useEffect } from "react";

function RegistraEquipe({ setMensagem, ID_jogador=null }) {
    const [nomeEquipe, setNome] = useState(["", ""]);
    const [submitDesabilitado, setDesabilitado] = useState(true);

    return (<main>
        <form onSubmit={() => {}}>
            <h1>Cadastro de Equipe</h1>
            <label htmlFor="nomeEquipe">Nome da Equipe <span className="text-red-500">*</span></label>
            <input type="text" name="nomeEquipe" id="nomeEquipe" placeholder="Digite o nome da equipe" value={nomeEquipe[0]} maxLength={100} required/>
            <input type="hidden" name="ID_jogadorLider" id="ID_jogadorLider" value={ID_jogador}/>
            <button type="submit" disabled={submitDesabilitado}>Cadastrar</button>
        </form>
    </main>)
};

export default RegistraEquipe;