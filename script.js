const questions = [
    {
        question: "Qual técnica agrícola ajuda a reter água no solo, evitar a erosão e fixar carbono, sem a necessidade de revolver a terra antes do plantio?",
        options: [
            "Queimada controlada",
            "Plantio Direto",
            "Aragem profunda",
            "Monocultura intensiva"
        ],
        answer: 1 // Índice da resposta correta (Plantio Direto)
    },
    {
        question: "O que é a ILPF, uma das principais estratégias para o Agroforte sustentável?",
        options: [
            "Indústria de Limpeza de Produtos Fitossanitários",
            "Instalação de Lavouras Próximas a Fontes de água",
            "Integração Lavoura-Pecuária-Floresta",
            "Incentivo de Lucro para Pequenos Fazendeiros"
        ],
        answer: 2
    },
    {
        question: "Qual o principal objetivo do uso de Defensivos Biológicos (Bioinsumos) na agricultura moderna?",
        options: [
            "Acelerar o crescimento das plantas artificialmente",
            "Substituir totalmente a irrigação nas plantações",
            "Controlar pragas usando inimigos naturais ou microrganismos, reduzindo o impacto químico",
            "Eliminar todo tipo de vegetação nativa ao redor da lavoura"
        ],
        answer: 2
    },
    {
        question: "De acordo com o Código Florestal Brasileiro, o que representa a Área de Preservação Permanente (APP)?",
        options: [
            "Áreas como margens de rios e encostas que devem ser cobertas por vegetação nativa para proteger o solo e a água",
            "O espaço destinado exclusivamente para o alojamento de animais da fazenda",
            "A porcentagem de mata que pode ser desmatada legalmente a cada ano",
            "Zonas urbanas destinadas a feiras de produtos agrícolas"
        ],
        answer: 0
    },
    {
        question: "Como a tecnologia de agricultura de precisão (uso de drones e sensores) contribui para o meio ambiente?",
        options: [
            "Aumentando o desperdício de insumos na terra",
            "Permitindo a aplicação de água e fertilizantes apenas onde é necessário, evitando excessos",
            "Substituindo a necessidade de luz solar para o crescimento das plantas",
            "Apenas gerando fotos bonitas para as redes sociais da fazenda"
        ],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionCounterEl = document.getElementById("question-counter");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const gameBox = document.getElementById("game-box");
const resultBox = document.getElementById("result-box");
const scoreTextEl = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hide");
    gameBox.classList.remove("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionCounterEl.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    questionTextEl.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index));
        optionsContainerEl.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hide");
    while (optionsContainerEl.firstChild) {
        optionsContainerEl.removeChild(optionsContainerEl.firstChild);
    }
}

function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const buttons = optionsContainerEl.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        button.disabled = true; // Desabilita os botões após a escolha
        if (index === correctIndex) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextBtn.classList.remove("hide");
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
    scoreTextEl.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
}

restartBtn.addEventListener("click", startGame);

// Inicia o jogo ao carregar a página
startGame();