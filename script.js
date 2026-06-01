const questions = [
    {
        question: "Qual técnica agrícola ajuda a reter água no solo, evitar a erosão e fixar carbono, sem a necessidade de revolver a terra antes do plantio?",
        options: ["Queimada controlada", "Plantio Direto", "Aragem profunda", "Monocultura intensiva"],
        answer: 1
    },
    {
        question: "O que é a ILPF, uma das principais estratégias para o Agroforte sustentável?",
        options: ["Indústria de Limpeza de Produtos Fitossanitários", "Instalação de Lavouras Próximas a Fontes de água", "Integração Lavoura-Pecuária-Floresta", "Incentivo de Lucro para Pequenos Fazendeiros"],
        answer: 2
    },
    {
        question: "Qual o principal objetivo do uso de Defensivos Biológicos (Bioinsumos) na agricultura moderna?",
        options: ["Acelerar o crescimento das plantas artificialmente", "Substituir totalmente a irrigação nas plantações", "Controlar pragas usando inimigos naturais ou microrganismos, reduzindo o impacto químico", "Eliminar todo tipo de vegetação nativa ao redor da lavoura"],
        answer: 2
    },
    {
        question: "De acordo com o Código Florestal Brasileiro, o que representa a Área de Preservação Permanente (APP)?",
        options: ["Áreas como margens de rios e encostas que devem ser cobertas por vegetação nativa para proteger o solo e a água", "O espaço destinado exclusivamente para o alojamento de animais da fazenda", "A porcentagem de mata que pode ser desmatada legalmente a cada ano", "Zonas urbanas destinadas a feiras de produtos agrícolas"],
        answer: 0
    },
    {
        question: "Como a tecnologia de agricultura de precisão (uso de drones e sensores) contribui para o meio ambiente?",
        options: ["Aumentando o desperdício de insumos na terra", "Permitindo a aplicação de água e fertilizantes apenas onde é necessário, evitando excessos", "Substituindo a necessidade de luz solar para o crescimento das plantas", "Apenas gerando fotos bonitas para as redes sociais da fazenda"],
        answer: 1
    },
    {
        question: "O que caracteriza a técnica de rotação de culturas na agricultura sustentável?",
        options: ["Alternar as espécies plantadas em uma mesma área para recuperar o solo e quebrar o ciclo de pragas", "Girar as máquinas agrícolas no campo para compactar a terra uniformemente", "Substituir anualmente toda a mão de obra da fazenda", "Plantar apenas em terrenos com inclinacao circular"],
        answer: 0
    },
    {
        question: "Qual a importância dos polinizadores, como as abelhas, para o equilíbrio do Agroforte?",
        options: ["Eles servem apenas como indicadores de chuva na região", "São fundamentais para a reprodução de plantas e aumento da produtividade de frutos", "Eles eliminam a necessidade de adubação química", "Ajudam a espalhar sementes de plantas invasoras nas plantações"],
        answer: 1
    },
    {
        question: "Na gestão hídrica sustentável, qual método de irrigação é conhecido pela alta eficiência e economia de água?",
        options: ["Irrigação por gotejamento", "Irrigação por inundação de canais", "Aspersão convencional de alta pressão", "Uso indiscriminado de caminhões-pipa"],
        answer: 0
    },
    {
        question: "O que é o Crédito de Carbono no contexto do agronegócio sustentável?",
        options: ["Um imposto cobrado de quem planta árvores", "Uma certificação que recompensa financeiramente propriedades que reduzem emissões ou sequestram gases estufa", "Um financiamento bancário para a compra de combustíveis fósseis", "O limite máximo de poeira que uma fazenda pode gerar"],
        answer: 1
    },
    {
        question: "Como o manejo correto de pastagens na pecuária ajuda a combater o efeito estufa?",
        options: ["Evitando a degradação do solo, o que permite maior captação e fixação de carbono pela grama", "Mantendo o solo completamente descoberto durante o ano todo", "Aumentando o uso de fertilizantes nitrogenados na ração", "Reduzindo drasticamente a área de sombra para os animais"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let consecutiveStreak = 0;
let timeLeft = 15;
let timerInterval;

// Variável para armazenar o índice correto da opção embaralhada atual
let currentCorrectIndexMapped = 0;

const questionCounterEl = document.getElementById("question-counter");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const gameBox = document.getElementById("game-box");
const resultBox = document.getElementById("result-box");
const scoreTextEl = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");
const timerDisplayEl = document.getElementById("timer-display");
const streakDisplayEl = document.getElementById("streak-display");

// Função utilitária para embaralhar Arrays (Algoritmo Fisher-Yates)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startGame() {
    currentQuestionIndex = 0;
    totalScore = 0;
    consecutiveStreak = 0;
    resultBox.classList.add("hide");
    gameBox.classList.remove("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionCounterEl.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    questionTextEl.innerText = currentQuestion.question;

    updateStreakDisplay();

    // Salva o texto da resposta correta original antes de embaralhar
    const correctOptionText = currentQuestion.options[currentQuestion.answer];

    // Cria uma nova lista com as opções embaralhadas
    const shuffledOptions = shuffleArray(currentQuestion.options);

    // Descobre onde a resposta certa foi parar na nova lista embaralhada
    currentCorrectIndexMapped = shuffledOptions.indexOf(correctOptionText);

    // Renderiza os botões com a ordem embaralhada
    shuffledOptions.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });

    startTimer();
}

function resetState() {
    nextBtn.classList.add("hide");
    clearInterval(timerInterval);
    timeLeft = 15;
    timerDisplayEl.innerText = `Tempo: ${timeLeft}s`;
    while (optionsContainerEl.firstChild) {
        optionsContainerEl.removeChild(optionsContainerEl.firstChild);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplayEl.innerText = `Tempo: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoTimeOut();
        }
    }, 1000);
}

function autoTimeOut() {
    consecutiveStreak = 0;
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === currentCorrectIndexMapped) {
            button.classList.add("correct");
        }
    });

    updateStreakDisplay();
    nextBtn.classList.remove("hide");
}

function selectOption(selectedIndex) {
    clearInterval(timerInterval);
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    if (selectedIndex === currentCorrectIndexMapped) {
        consecutiveStreak++;
        const pointsGained = 100 * consecutiveStreak;
        totalScore += pointsGained;
        buttons[selectedIndex].classList.add("correct");
    } else {
        consecutiveStreak = 0;
        buttons[selectedIndex].classList.add("wrong");
        buttons[currentCorrectIndexMapped].classList.add("correct");
    }

    buttons.forEach(button => button.disabled = true);
    updateStreakDisplay();
    nextBtn.classList.remove("hide");
}

function updateStreakDisplay() {
    if (consecutiveStreak > 1) {
        streakDisplayEl.innerText = `🔥 Combo: x${consecutiveStreak}`;
        streakDisplayEl.classList.add("active-streak");
    } else {
        streakDisplayEl.innerText = `Combo: x1`;
        streakDisplayEl.classList.remove("active-streak");
    }
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    gameBox.classList.add("hide");
    resultBox.classList.remove("hide");
    scoreTextEl.innerHTML = `Sua pontuação final foi de:<br><strong style="font-size: 2rem; color: var(--primary-color);">${totalScore} pontos</strong>!<br>Parabéns por praticar o Agroforte!`;
}

restartBtn.addEventListener("click", startGame);

// Inicia o jogo ao carregar a página
startGame();