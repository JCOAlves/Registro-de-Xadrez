import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ValidacaoAcesso({ logado=false, usuario=null, children }){
    if(!logado && !usuario){
        return <Navigate to={"/NEGADO"}/>;

    } else if(logado && usuario){
        return children;
    };
};

export default ValidacaoAcesso;