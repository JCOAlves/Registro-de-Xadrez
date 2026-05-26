// Classe requisição HTTP

const API_Rota = import.meta.env.VITE_RotaBackend || "http://localhost:3000";

class RequisicaoHTTP {
    constructor(rota, body = {}) {
        this.rota = rota;
        this.body = body;
    }

    // GET (listar)
    async GET() {
        try {
            if (!this.rota) {
                console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
                return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
            }

            let resposta = await fetch(API_Rota+this.rota, { credentials: 'include' });
            const dados = await resposta.json();
            return dados;

        } catch (error) {
            console.error("Erro na busca de dados no servidor:", error.message || error);
            return { erro: error.message || error }
        }
    };

    // POST (registrar)
    async POST() {
        try {
            if (!this.rota) {
                console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
                return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
            }

            const objetoJSON = JSON.stringify(this.body);
            let resposta = await fetch(API_Rota+this.rota, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: objetoJSON,
                credentials: 'include'
            });
            resposta = await resposta.json();
            return resposta;


        } catch (error) {
            console.error("Erro no envio de novos dados ao servidor:", error.message || error);
            return { erro: error.message || error }
        }
    };

    // PUT (atualizar)
    async PUT() {
        try {
            if (!this.rota) {
                console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
                return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
            }

            const objetoJSON = JSON.stringify(this.body);
            let resposta = await fetch(API_Rota+this.rota, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: objetoJSON,
                credentials: 'include'
            });
            resposta = await resposta.json();
            return resposta;

        } catch (error) {
            console.error("Erro no envio de dados atualizados ao servidor:", error.message || error);
            return { erro: error.message || error }
        }
    };

    // DELETE (excluir)
    async DELETE() {
        try {
            if (!this.rota) {
                console.error("Não foi fornecida a rota do servidor ou rota fornecida invalida.")
                return { erro: "Não foi fornecida a rota do servidor ou rota fornecida invalida." }
            }

            let resposta = await fetch(API_Rota+this.rota, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            });
            resposta = await resposta.json();
            return resposta;

        } catch (error) {
            console.error("Erro na solicitação de exclusão dados no servidor:", error.message || error);
            return { erro: error.message || error }
        }
    };
}


export default RequisicaoHTTP;