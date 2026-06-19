import RequisicaoHTTP from "./RequisicaoHTTP.js";

async function LogoutSistema() {
    try {
        const ConfirmacaoLogout = confirm("Deseja prosseguir com o processo de Logout?");

        if(ConfirmacaoLogout){
            const Requisicao = new RequisicaoHTTP("/logout", { logout: true });
            const Resposta = await Requisicao.POST();
            const { sucesso, mensagem } = Resposta;
            if(sucesso){
                window.location.replace(`http://${import.meta.env.VITE_HostFront}:${import.meta.env.VITE_PortFront}`);
                return;
                 
            } else{
                alert(mensagem);
                return;
            };

        };
        
    } catch (error) {
        alert("Erro no processo de logout de usuário");
        console.log("Erro no processo de logout de usuário: ", error.message || error);
    };
};

export default LogoutSistema;