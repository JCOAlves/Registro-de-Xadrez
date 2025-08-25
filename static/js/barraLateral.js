const barraLateral = document.querySelector(".barraLateral")
const botaoBarra = document.querySelector(".botaoBarra");
const botaoFechar = document.querySelector(".botaoFechar");

botaoBarra.addEventListener("click", function(){
    let larguraBarra = barraLateral.style.width;
    if (larguraBarra === "0px" || larguraBarra === ""){
        barraLateral.style.width = "200px";
        barraLateral.style.display = "block";
    }
})

botaoFechar.addEventListener("click", function(){
    let larguraBarra = barraLateral.style.width;
    if (larguraBarra === "200px"){
        barraLateral.style.width = "0px";
        barraLateral.style.display = "none";
    }
})

const botaoOpcoes = document.querySelector(".botaoRegistro");
const opcoes = document.querySelector(".opcoes");

botaoOpcoes.addEventListener("click", function(){
    const tipoDisplay = opcoes.style.display;
    switch (tipoDisplay){
        case "none":
            opcoes.style.display = "block";
            break;

        case "block":
            opcoes.style.display = "none";
            break;

        default:
            opcoes.style.display = "block";
            break;
    }
})