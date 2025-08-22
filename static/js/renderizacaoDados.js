import { RequisiçãoHTTP } from "./requisicaoHTTP.js";

export async function renderizaDados(elemento, tipoDado){
    elemento.innerHTML ="<em>Carregando...</em>";

    const dados = RequisiçãoHTTP(`/${tipoDado}`);
    if("mensagemServidor" in dados){
        elemento.innerHTML = `<em>${dados["mensagemServidor"]}</em>`;
    }

    switch (tipoDado){
        case "inicial":
            elemento.innerHTML = `
                <h1>Registrador de Xadrez</h1>
                <p>Registe partidas de xadrez com facilidade.</p>`;
            break;
        case "jogadores":
            const jogadores = await RequisiçãoHTTP(`/${tipoDado}`);
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
                <tbody> ${tabelaCorpo_jogadores} </tbody>
            </table>
            </div>`;
            elemento.innerHTML = tabelaJogadores;
            break;
        case "partidas":
            const partidas = await RequisiçãoHTTP(`/${tipoDado}`);
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
            <h1>Registro de Partidas</h1>
            <div class="areaRegistro">
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
                <tbody> ${tabelaCorpo_partidas}</tbody>
            </table>
            </div>`;
            elemento.innerHTML = tabelaPartidas;
            break;
        default:
            elemento.innerHTML = `
            <h1>Registrador de Xadrez</h1>
            <p>Registe partidas de xadrez com facilidade.</p>`;
            break;
    };
};