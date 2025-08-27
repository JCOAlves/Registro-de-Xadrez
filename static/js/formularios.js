//Função de exibição de menus
import {validacao_nome, validacao_nomeUsuario, validacao_nascimento, validacao_form} from "./validaForms.js";

export function formularios(elemento, tipoForm){
    switch (tipoForm){
        case "Jogador":
            elemento.innerHTML = `
        <h1>Cadastro de Jogadores</h1>
        <form>
        <span class="aviso" style="font-size: 12px; margin-bottom: 20px;">*Campo obrigatorio</span>
            <br>
            <label class='text' for="nome">Nome</label><span class="aviso">*</span>
                <br>
            <input type="text" id="nome" placeholder = 'Nome e Sobrenome' class='cadastro_nome' style="width: 300px;">
                <br>

            <label class='text' for="nomeUsuario">Nome de Usuário</label><span class="aviso">*</span>
                <br> 
            <input type="text" placeholder = 'Sem espaço. De 8 a 10 carac.' class='cadastro_nome' id="nomeUsuario" style="width: 220px;">
                <br>

            <label class='text' for="nascimento">Data de Nascimento</label><span class="aviso">*</span>
                <br>
            <input type="date" class="cadastro_nome" id="nascimento">
                <br>

            <label class='text' for="genero">Gênero</label>
                <br>
            <select id="genero" style="margin-bottom: 20px;">
                <option value="Não Informado">Gênero</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Não-Binario">Não-Binario</option>
            </select>
                <br>

            <button type="submit">Cadastrar</button>
        </form>`;
        document.getElementById('nome').addEventListener("blur", validacao_nome());
        document.getElementById('nomeUsuario').addEventListener("blur", validacao_nomeUsuario());
        document.getElementById('nascimento').addEventListener("blur", validacao_nascimento());
        document.querySelector('form').addEventListener("submit", validacao_form());
        break;

        case "Partida":
            elemento.innerHTML = `
            <h1>Registro de Jogadas da partida</h1>
            <form class='formJogadas'>
                <h1>Jogadas</h1>
                <fieldset class='text areaDados'>
                    <legend>Time</legend>
                    <select>
                        <option>----</option>
                        <option>Branco</option> 
                        <option>Preto</option> 
                    </select>
                </fieldset>

                <div class="linhaUnica">
                    <fieldset class='text areaDados itemLinhaUnica'>
                        <legend>Peça</legend>
                        <select>
                            <option>----</option>
                            <option>Peão</option> <option>Cavalo</option>
                            <option>Torre</option> <option>Bispo</option>
                            <option>Rainha</option> <option>Rei</option>
                        </select>
                    </fieldset>
                    <fieldset class='text areaDados itemLinhaUnica'>
                        <legend>Casa</legend>
                        <select>
                            <option>-</option>
                            <option>A</option> <option>B</option>
                            <option>C</option> <option>D</option>
                            <option>E</option> <option>F</option>
                            <option>G</option> <option>H</option>
                        </select>
                        <select>
                            <option>-</option>
                            <option>1</option> <option>2</option>
                            <option>3</option> <option>4</option>
                            <option>5</option> <option>6</option>
                            <option>7</option> <option>8</option>
                        </select>
                    </fieldset>
                </div>

                <fieldset class='text areaDados'>
                    <legend>Peça Advesaria Eliminada</legend>
                    <div>
                    <select>
                        <option>----</option>
                        <option>Peão</option> <option>Cavalo</option>
                        <option>Torre</option> <option>Bispo</option>
                        <option>Rainha</option> <option>Rei</option>
                    </select>
                    <input type='checkbox' id='xeque'><label for='xeque'>Xeque</label>
                    </div>
                </fieldset>
                
                <button>Registrar</button>
            </form>`;
            break;
    };
};