//Requisição do FRONTEND
export async function RequisiçãoHTTP(rota){
    //Faz a requisição ao BACKEND
    try{
        const resposta = await fetch(rota)
        const dados = await resposta.json()
        return dados
    }
    //Trata erros da requisição
    catch{
        return {"mensagemServidor":"Erro na busca de dados."}
    }

}