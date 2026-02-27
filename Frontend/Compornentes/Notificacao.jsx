import { useState, useEffect } from "react"

// Notificação de mensagem na página
function Notificacao({children}){
    if(children.includes("sucesso")){
        return <div role="Notificação da página" className="notificacao sucesso">{children}</div>
    } else{
        return <div role="Notificação da página" className="notificacao erro">{children}</div>
    }
}

export default Notificacao;