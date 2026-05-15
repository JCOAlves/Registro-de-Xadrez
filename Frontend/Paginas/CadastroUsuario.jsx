import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequisicaoHTTP from "../hook/RequisicaoHTTP.js";
import "../Style/Jogadores.css";

function CadastroUsuario({ jogador }){
    const [valorSegmentos, setSegmentos] = useState([20, 40, 40]);
    const [RaioCirculo, setRaio] = useState(60);

    // Teste de grafico de pizza de dados de jogadores
    useEffect(() => {
        // Seleção dos elementos
        const segmentosCirculo = [
            document.querySelector('.segment-green'),
            document.querySelector('.segment-yellow'),
            document.querySelector('.segment-red')
        ];
        const textLabel = document.getElementById('total-text');

        let circunferencia = 2 * Math.PI * RaioCirculo; // Aprox. 376.99

        // Inicializa todos os segmentos com o tamanho da circunferência
        segmentosCirculo.forEach(circle => {
            circle.style.strokeDasharray = `${circunferencia} ${circunferencia+1}`; // Define o complimento da linha do circulo
            circle.style.strokeDashoffset = circunferencia; // Define onde a inicia o traço do circulo, inicializado com a circunferencia para empurrar os circulos para fora da tela e ocultalos
        });

        function porcentagemJogador(porcentagens) {
            // Garante que a soma não ultrapasse 100%
            const [p1=0, p2=0, p3=0] = porcentagens
            const total = p1 + p2 + p3;
            const [verde, amarelo, vermelho] = segmentosCirculo
            
            // Segmento 1 (Verde): Começa no topo (0% de deslocamento)
            const fatiaVerde = circunferencia - (p1 / 100) * circunferencia; // Calcula o tamanho da fatia verde
            verde.style.strokeDashoffset = fatiaVerde;
            
            // Segmento 2 (Amarelo): Começa após o término do Verde
            // Deslocamento inicial é o tamanho do primeiro segmento
            const fatiaAmarela = circunferencia - (p2 / 100) * circunferencia;
            amarelo.style.strokeDashoffset = fatiaAmarela;
            amarelo.style.transform = `rotate(${(p1 * 360) / 100}deg)`;
            amarelo.style.transformOrigin = '50% 50%';

            // Segmento 3 (Vermelho): Começa após o término do Verde + Amarelo
            const fatiaVermelha = circunferencia - (p3 / 100) * circunferencia;
            vermelho.style.strokeDashoffset = fatiaAmarela;
            vermelho.style.transform = `rotate(${((p1 + p2) * 360) / 100}deg)`;
            vermelho.style.transformOrigin = '50% 50%';

            // Atualiza o texto central com a soma total do progresso
            textLabel.textContent = `${total}%`;
        }


        porcentagemJogador(valorSegmentos);

    }, [jogador]);

    return (<div className="progress-container">
        <svg className="progress-ring" width="150" height="150">
            <circle className="ring-track" stroke="#e6e6e6" stroke-width="12" fill="transparent" r={RaioCirculo} cx="75" cy="75"/>
            <circle className="segment-green" stroke="#28a745" stroke-width="12" fill="transparent" r={RaioCirculo} cx="75" cy="75"/>
            <circle className="segment-yellow" stroke="#ffc107" stroke-width="12" fill="transparent" r={RaioCirculo} cx="75" cy="75"/>
            <circle className="segment-red" stroke="#dc3545" stroke-width="12" fill="transparent" r={RaioCirculo} cx="75" cy="75"/>
        </svg>
        <div className="progress-text" id="total-text">0%</div>
    </div>)
}

export default CadastroUsuario;