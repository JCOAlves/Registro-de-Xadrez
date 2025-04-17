

let lista_jogadores = [];
let lista_partidas = [];

const exibir = (id, texto) => {
    document.getElementById(id).innerHTML = texto;
};

const exibirCadastro = () => {
    document.getElementById('conteudo') = `<h1>Cadastro de Jogadores</h1>
            <div style='border: solid gray 1px; border-radius: 10px; padding: 10px;'>
                <span style='font-size: 20px;'>Peças Brancas:</span> <input type="text" placeholder = 'Nome do Jogador' style='height: 10px; width: 20%; padding: 5px;'>
                    <br><br>
                <span style='font-size: 20px;'>Peças Pretas:</span> <input type="text" placeholder = 'Nome do Jogador' style='height: 10px; width: 20%; padding: 5px;'>
                    <br><br>
                <button onclick="">Cadastrar</button>
            </div>`;
}

window.exibirCadastro = exibirCadastro;

exibir('conteudo', '<button onclick="exibirCadastro()">ola mundo</button>');




       
        

       