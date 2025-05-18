import {registro} from "./Funcoes/funcoes_jogador.mjs"

export const tela_menu = `<h1>Registrador de Xadrez</h1>
    <p>Registe partidas de xadrez com facilidade.</p>
    <div class="menu">
        <button class="botao_menu">Registrar partida</button>
            <br>
        <button class="botao_menu">Registrar jogador</button>
            <br>
        <button class="botao_menu">Visualizar registro</button>
    </div>`;

export const tela_cadastro = `
    <nav>
        <button class="botao_volta"> < </button>
    </nav>
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

export const tela_partida = `
    <nav>
        <button class="botao_volta"> < </button>
    </nav>
<h1>Registro de Partida</h1>
        <div class='caixa1'>
            <div class='caixa2 branco'>
                <h1>Branco</h1>
                <span class='text'>Peça: </span> <select>
                    <option>----</option>
                    <option>Peão</option>
                    <option>Cavalo</option>
                    <option>Torre</option>
                    <option>Bispo</option>
                    <option>Rainha</option>
                    <option>Rei</option>
                </select>
                    <br><br>
                <span class='text'>Casa: </span> <select>
                    <option>-</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>H</option>
                </select>
                <select>
                    <option>-</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
                    <br><br>
                <span class='text'>Peça Advesaria Eliminada: </span> <select>
                    <option>----</option>
                    <option>Peão</option>
                    <option>Cavalo</option>
                    <option>Torre</option>
                    <option>Bispo</option>
                    <option>Rainha</option>
                    <option>Rei</option>
                </select>
                    <br><br>
                <input type='checkbox' id='xeque'>
                <label for='xeque'>Xeque</label>
            </div>
        
            <div class='caixa2 preto'>
                <h1>Preto</h1>
                <span class='text'>Peça: </span> <select class='seletor_preto'>
                    <option>----</option>
                    <option>Peão</option>
                    <option>Cavalo</option>
                    <option>Torre</option>
                    <option>Bispo</option>
                    <option>Rainha</option>
                    <option>Rei</option>
                </select>
                    <br><br>
                <span class='text'>Casa: </span> <select>
                    <option>-</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                    <option>G</option>
                    <option>H</option>
                </select>
                <select>
                    <option>-</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                </select>
                    <br><br>
                <span class='text'>Peça Advesaria Eliminada: </span> <select>
                    <option>----</option>
                    <option>Peão</option>
                    <option>Cavalo</option>
                    <option>Torre</option>
                    <option>Bispo</option>
                    <option>Rainha</option>
                    <option>Rei</option>
                </select>
                    <br><br>
                <input type='checkbox' id='xeque-preto'>
                <label for='xeque-preto'>Xeque</label>
            </div>
        </div>`;


export const tela_registro = `
    <nav>
        <button class="botao_volta"> < </button>
        <div class="areaRegistro">
            ${registro}
        </div>
    </nav>`;

