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