import { RequisiçãoHTTP } from "./requisicaoHTTP.js";

export async function renderizaDados(elemento, tipoDado){
    const dados = await RequisiçãoHTTP(`/${tipoDado}`);

    switch (tipoDado){
        case "jogadores":
            let tabelaCorpo_jogadores = ``;
            for(const elemento of jogadores){
                tabelaCorpo_jogadores += `
                <tr>
                    <td>${elemento["id_jogador"]}</td>
                    <td>${elemento["nome"]}</td>
                    <td>${elemento["nascimento"]}</td>
                    <td>${elemento["genero"]}</td>
                    <td>${elemento["numeroPartidas"]}</td>
                    <td>${elemento["vitorias"]}</td>
                    <td>${elemento["derrotas"]}</td>
                </tr>`;
            }
            const tabelaJogadores = `
            <h1>Registro de Jogadores</h1>
            <div class="areaRegistro">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th>Gênero</th>
                        <th>Número de Partidas</th>
                        <th>Vitorias</th>
                        <th>Derrotas</th>
                    </tr>
                </thead>
                <tbody>
                    ${tabelaCorpo_jogadores}
                </tbody>
            </table>
            </div>`;
            elemento.innerHTML = tabelaJogadores;
    
        case "partidas":
            let tabelaCorpo_partidas = ``
            for(const elemento of partidas){
                tabelaCorpo_partidas += `
                <tr>
                    <td>${elemento["id_partida"]}</td>
                    <td>${elemento["data"]}</td>
                    <td>${elemento["horarioInicial"]}</td>
                    <td>${elemento["horarioFinal"]}</td>
                    <td>${elemento["jogador_brancas"]}</td>
                    <td>${elemento["jogador_pretas"]}</td>
                    <td>${elemento["vencedor"]}</td>
                </tr>`;
            }
            const tabelaPartidas = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Inicio da Partida</th>
                        <th>Final da Partida</th>
                        <th>Peças Brancas</th>
                        <th>Peças Pretas</th>
                        <th>Vencedor</th>
                    </tr>
                </thead>
                <tbody>
                    ${tabelaCorpo_partidas}
                </tbody>
            </table>`;
            return tabelaPartidas;
    }
}