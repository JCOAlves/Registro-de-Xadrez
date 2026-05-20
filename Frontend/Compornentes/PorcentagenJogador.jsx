import { useState, useEffect, useRef } from "react";

function PorcentagemJogador({ vitorias, derrotas, empates, imagemJogador="./Imagens/ImagemUser.png" }){
    const [dadosJogador, setDados] = useState([]);
    const [espesuraCirculo, setEspesuara] = useState(6);
    const [RaioCirculo, setRaio] = useState(0);
    const [coordenadasCirculo, setCoord] = useState(0);
    const [largura, setLargura] = useState(0); // Valor minimo
    const circuloPorcentagem = useRef(null); // Hook para acompanhar elemento React

    useEffect(() => {
        // Verifica a referência ao elemento existe
        const elemento = circuloPorcentagem.current;
        if (!elemento) return;

        // Cria o observador que roda a cada mudança de tamanho
        const Observacao = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                const largura = Math.round(entry.borderBoxSize[0].inlineSize);
                setLargura(largura);
                setRaio((largura/2)-10);
                setCoord(largura/2);
            });
        });

        // Inicia monitoramento de elemento
        Observacao.observe(elemento);

        // Limpa monitoramento
        return () => Observacao.disconnect();

    }, [largura]);

    // Calcular porcentagem de número de partidas
    useEffect(() => { setDados([vitorias, derrotas, empates]) }, [vitorias, empates, derrotas]);

    useEffect(() => {
        const segmentosCirculo = [
            document.querySelector('.fatiaVitorias'),
            document.querySelector('.fatiaEmpates'),
            document.querySelector('.fatiaDerrotas')
        ];

        let circunferencia = 2 * Math.PI * RaioCirculo; // Aprox. 376.99
        
        // Inicializa todos os segmentos com o tamanho da circunferência
        segmentosCirculo.forEach(circle => {
            circle.style.strokeDasharray = `${circunferencia} ${circunferencia}`; // Define o complimento da linha do circulo
            circle.style.strokeDashoffset = circunferencia; // Define onde a inicia o traço do circulo, inicializado com a circunferencia para empurrar os circulos para fora da tela e oculta-los
        });

        function porcentagemJogador(porcentagens) {
            const [p1=0, p2=0, p3=0] = porcentagens;
            const [verde, amarelo, vermelho] = segmentosCirculo;
            
            // Segmento 1 (Verde): Começa no topo (0% de deslocamento)
            const fatiaVerde = circunferencia - (p1 / 100) * circunferencia; // Calcula o tamanho da fatia verde
            verde.style.strokeDashoffset = fatiaVerde;
            
            // Segmento 2 (Azul): Começa após o término do Verde
            // Deslocamento inicial é o tamanho do primeiro segmento
            const fatiaAzul = circunferencia - (p2 / 100) * circunferencia;
            amarelo.style.strokeDashoffset = fatiaAzul;
            amarelo.style.transform = `rotate(${(p1 * 360) / 100}deg)`;
            amarelo.style.transformOrigin = '50% 50%';

            // Segmento 3 (Vermelho): Começa após o término do Verde + Azul
            const fatiaVermelha = circunferencia - (p3 / 100) * circunferencia;
            vermelho.style.strokeDashoffset = fatiaVermelha;
            vermelho.style.transform = `rotate(${((p1 + p2) * 360) / 100}deg)`;
            vermelho.style.transformOrigin = '50% 50%';
        }

        porcentagemJogador(dadosJogador);
    }, [largura, RaioCirculo, dadosJogador]);

    return (<div className="flex flex-col justify-center content-center" role="Foto de perfil com do jogador com o números do jogador">
        <svg className="progress-ring min-w-30 w-full" width={largura} height={largura} ref={circuloPorcentagem}>
            {/*Molde de circulo que corta a imagem*/}
            <defs>
                <clipPath id="moldeImagem">
                    {/*Circulo onde a imagem fica visivel*/}
                    <circle cx={coordenadasCirculo} cy={coordenadasCirculo} r={RaioCirculo} />
                </clipPath>
            </defs>
            {/*Imagem de jogador linkada ao molde*/}
            <image href={imagemJogador} x="0" y="0" className="" width={largura} height={largura} clipPath="url(#moldeImagem)" preserveAspectRatio="xMidYMid slice"/>
            <circle className="circuloZerado" stroke="#c4c3c3" strokeWidth={espesuraCirculo} fill="transparent" r={RaioCirculo} cx={coordenadasCirculo} cy={coordenadasCirculo}/>
            <circle className="fatiaVitorias" stroke="#28a745" strokeWidth={espesuraCirculo} fill="transparent" r={RaioCirculo} cx={coordenadasCirculo} cy={coordenadasCirculo}/>
            <circle className="fatiaEmpates" stroke="#2e8cd4" strokeWidth={espesuraCirculo} fill="transparent" r={RaioCirculo} cx={coordenadasCirculo} cy={coordenadasCirculo}/>
            <circle className="fatiaDerrotas" stroke="#dc3545" strokeWidth={espesuraCirculo} fill="transparent" r={RaioCirculo} cx={coordenadasCirculo} cy={coordenadasCirculo}/>
        </svg>
    </div>)
}

export default PorcentagemJogador;