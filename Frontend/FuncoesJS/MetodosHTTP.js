//Arquivo com as funções HTTP da aplicação

// GET (listar)
async function GET(Rota) {
    try{
        if(!Rota){
            console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
            return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
        }

        let resposta = await fetch(Rota);
        const dados = await resposta.json();
        return dados;

    } catch (error){
        console.error("Erro na busca de dados no servidor:", error.message || error);
        return {erro: error.message || error}
    }
}

// POST (registrar)
async function POST(Rota, objetoDados) {
    try {
        if(!Rota){
            console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
            return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
        }

        const objetoJSON = JSON.stringify(objetoDados);
        let resposta = await fetch(Rota, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: objetoJSON
        });
        resposta = await resposta.json();
        return resposta;

        
    } catch (error) {
        console.error("Erro no envio de novos dados ao servidor:", error.message || error);
        return {erro: error.message || error}
    }
}

// PUT (atualizar)
async function PUT(RotaEspecifica, objetoDados) {
    try {
        if(!RotaEspecifica){
            console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
            return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
        }

        const objetoJSON = JSON.stringify(objetoDados);
        let resposta = await fetch(RotaEspecifica, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: objetoJSON
        });
        resposta = await resposta.json();
        return resposta;
        
    } catch (error) {
        console.error("Erro no envio de dados atualizados ao servidor:", error.message || error);
        return {erro: error.message || error}
    }
}

// DELETE (excluir)
async function DELETE(RotaEspecifica) {
    try {
        if(!RotaEspecifica){
            console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
            return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
        }

        let resposta = await fetch(RotaEspecifica, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        resposta = await resposta.json();
        return resposta;
        
    } catch (error) {
        console.error("Erro na solicitação de exclusão dados no servidor:", error.message || error);
        return {erro: error.message || error}
    }
}

export {GET, POST, PUT, DELETE};