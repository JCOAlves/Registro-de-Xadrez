//Função de exibição de menus
import {validacao_nome, validacao_nomeUsuario, validacao_nascimento, validacao_form} from "./validaForms.js";

export function formularios(elemento, tipoForm){
    switch (tipoForm){
        case "Jogador":
            elemento.innerHTML = `
            <h1>Cadastro de Jogadores</h1>
            <form>
            <span class="aviso">*Campo obrigatorio</span>
                <br>
            <fieldset class="text areaDados">
                <legend>
                    <label class='text' for="nome">Nome</label><span class="aviso">*</span>
                </legend>
                <input type="text" id="nome" placeholder = 'Nome e Sobrenome' class='cadastro_nome'>
            </fieldset>

            <fieldset class="text areaDados">
                <legend>
                    <label class='text' for="nomeUsuario">Nome de Usuário</label><span class="aviso">*</span>
                </legend>
                <input type="text" placeholder = 'Sem espaço. De 8 a 10 carac.' class='cadastro_nome' id="nomeUsuario">
            </fieldset>
            
            <div class="linhaUnica">
            <fieldset class="text areaDados itemLinhaUnica">
                <legend>
                    <label class='text' for="nascimento">Nascimento</label><span class="aviso">*</span>
                </legend>
                <input type="date" class="cadastro_nome" id="nascimento">
            </fieldset>

           <fieldset class="text areaDados itemLinhaUnica">
                <legend>
                    <label class='text' for="genero">Gênero</label>
                </legend>
                <select id="genero" style="margin-bottom: 20px;">
                    <option value="Não Informado">Gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Não-Binario">Não-Binario</option>
                </select>
           </fieldset>
           </div>

            <button type="submit">Cadastrar</button>
        </form>`;
        document.getElementById('nome').addEventListener("blur", validacao_nome());
        document.getElementById('nomeUsuario').addEventListener("blur", validacao_nomeUsuario());
        document.getElementById('nascimento').addEventListener("blur", validacao_nascimento());
        document.querySelector('form').addEventListener("submit", validacao_form());
        break;

        case "Partida":
            elemento.innerHTML = `
            <h1>Registro de Jogadas da Partida</h1>
            <form class='formJogadas'>
                <span class="aviso">*Campo obrigatorio</span>
                    <br>
                <fieldset class='text areaDados'>
                    <legend>
                        <label for="time">Time<span class="aviso">*</span></label>
                    </legend>
                    <select id="time">
                        <option value="">----</option>
                        <option value="Branco">Branco</option> 
                        <option value="Preto">Preto</option> 
                    </select>
                </fieldset>

                <div class="linhaUnica">
                    <fieldset class='text areaDados itemLinhaUnica'>
                        <legend>
                            <label for="peca">Peça<span class="aviso">*</span></label>
                        </legend>
                        <select id="peca">
                            <option value="">----</option>
                            <option value="Peão">Peão</option> <option value="Cavalo">Cavalo</option>
                            <option value="Torre">Torre</option> <option value="Bispo">Bispo</option>
                            <option value="Rainha">Rainha</option> <option value="Rei">Rei</option>
                        </select>
                    </fieldset>
                    <fieldset class='text areaDados itemLinhaUnica'>
                        <legend>
                            <label for="casa">Casa<span class="aviso">*</span></label>
                        </legend>
                        <select id="letra">
                            <option value="">-</option>
                            <option value="A">A</option> <option value="B">B</option>
                            <option value="C">C</option> <option value="D">D</option>
                            <option value="E">E</option> <option value="F">F</option>
                            <option value="G">G</option> <option value="H">H</option>
                        </select>
                        <select id="numero">
                            <option value="">-</option>
                            <option value="1">1</option> <option value="2">2</option>
                            <option value="3">3</option> <option value="4">4</option>
                            <option value="5">5</option> <option value="6">6</option>
                            <option value="7">7</option> <option value="8">8</option>
                        </select>
                    </fieldset>
                </div>

                <fieldset class='text areaDados'>
                    <legend>
                        <label for="pecaEliminada">Peça Advesaria Eliminada<span class="aviso">*</span></label>
                    </legend>
                    <div>
                    <select id="pecaEliminada">
                        <option value="Nenhuma">----</option>
                        <option value="Peão">Peão</option> <option value="Cavalo">Cavalo</option>
                        <option value="Torre">Torre</option> <option value="Bispo">Bispo</option>
                        <option value="Rainha">Rainha</option> <option value="Rei">Rei</option>
                        <option value="Nenhuma">Nenhuma</option>
                    </select>
                        <label>
                            <input type='checkbox' id='xeque'>Xeque
                        </label>
                    </div>
                </fieldset>
                
                <button>Registrar</button>
            </form>`;
            break;
    };
};