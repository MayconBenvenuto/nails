/* ===================================
   QUIZ MODULE
   Gerencia todo o funcionamento do quiz
   =================================== */

const Quiz = {
    // Dados do quiz
    data: [
        {
            question: "Você gostaria de trabalhar de casa e ter sua própria renda?",
            options: [
                "Sim, quero muito ter independência financeira",
                "Sim, mas tenho receio de não conseguir",
                "Talvez, dependendo da oportunidade",
                "Não, prefiro trabalhar fora de casa"
            ]
        },
        {
            question: "Você já trabalha na área da beleza?",
            options: [
                "Não, seria minha primeira experiência",
                "Sim, mas não com nail design",
                "Sim, já faço unhas mas quero me aperfeiçoar",
                "Trabalho em outra área completamente diferente"
            ]
        },
        {
            question: "Seus familiares ou amigas já pediram para você fazer as unhas delas?",
            options: [
                "Sim, sempre me pedem e elogiam meu trabalho",
                "Sim, algumas vezes já me pediram",
                "Raramente, mas já aconteceu",
                "Não, nunca me pediram"
            ]
        },
        {
            question: "Você quer aprender do zero ou se aperfeiçoar?",
            options: [
                "Quero aprender do zero, nunca fiz unhas",
                "Já sei o básico mas quero me aperfeiçoar",
                "Tenho experiência mas quero técnicas profissionais",
                "Quero me especializar em técnicas avançadas"
            ]
        },
        {
            question: "Busca uma renda extra ou sua profissão principal?",
            options: [
                "Quero que seja minha profissão principal",
                "Busco uma renda extra para complementar",
                "Quero começar como extra e depois virar principal",
                "Ainda estou decidindo entre as duas opções"
            ]
        }
    ],

    // Estado atual do quiz
    state: {
        currentQuestionIndex: 0,
        userAnswers: [],
        isActive: false
    },

    // Elementos do DOM
    elements: {
        modal: null,
        container: null,
        questionContainer: null,
        progressFill: null,
        currentQuestionSpan: null,
        nextBtn: null,
        finishBtn: null,
        closeBtn: null
    },

    // URLs para checkout
    checkoutUrl: 'https://go.hotmart.com/K100327110W?ap=a12c',

    // Inicializar quiz
    init() {
        this.cacheElements();
        this.bindEvents();
        this.show();
    },

    // Cachear elementos do DOM
    cacheElements() {
        this.elements.modal = document.getElementById('quiz-modal');
        this.elements.container = document.querySelector('.quiz-container');
        this.elements.questionContainer = document.getElementById('question-container');
        this.elements.progressFill = document.getElementById('progress-fill');
        this.elements.currentQuestionSpan = document.getElementById('current-question');
        this.elements.nextBtn = document.getElementById('next-btn');
        this.elements.finishBtn = document.getElementById('finish-btn');
        this.elements.closeBtn = document.getElementById('quiz-close-btn');
    },

    // Vincular eventos
    bindEvents() {
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (this.elements.finishBtn) {
            this.elements.finishBtn.addEventListener('click', () => this.showResult());
        }

        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.close());
        }

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isActive) {
                this.close();
            }
        });
    },

    // Mostrar o quiz
    show() {
        if (!this.elements.modal) return;

        this.elements.modal.style.display = 'flex';
        this.elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.state.isActive = true;
        this.reset();
        this.showQuestion(0);
        this.updateProgress();
    },

    // Fechar o quiz
    close() {
        if (!this.elements.modal) return;

        this.elements.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            this.elements.modal.style.display = 'none';
            this.state.isActive = false;
        }, 300);
    },

    // Resetar estado do quiz
    reset() {
        this.state.currentQuestionIndex = 0;
        this.state.userAnswers = [];
    },

    // Mostrar pergunta específica
    showQuestion(index) {
        if (!this.elements.questionContainer || !this.data[index]) return;

        const question = this.data[index];
        const letters = ['A', 'B', 'C', 'D'];
        
        this.elements.questionContainer.innerHTML = `
            <h3 class="question-title">${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, optionIndex) => `
                    <div class="quiz-option" data-index="${optionIndex}">
                        <span class="quiz-option-letter">${letters[optionIndex]}</span>
                        <span class="quiz-option-text">${option}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Atualizar número da pergunta
        if (this.elements.currentQuestionSpan) {
            this.elements.currentQuestionSpan.textContent = index + 1;
        }
        
        // Vincular eventos das opções
        this.bindOptionEvents();
        
        // Esconder botões
        this.hideButtons();
    },

    // Vincular eventos das opções
    bindOptionEvents() {
        const options = this.elements.questionContainer.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.addEventListener('click', () => this.selectOption(index));
        });
    },

    // Selecionar opção
    selectOption(optionIndex) {
        // Remover seleção anterior
        const options = this.elements.questionContainer.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        
        // Adicionar seleção atual
        options[optionIndex].classList.add('selected');
        
        // Armazenar resposta
        this.state.userAnswers[this.state.currentQuestionIndex] = optionIndex;
        
        // Mostrar botão apropriado
        this.showAppropriateButton();
    },

    // Mostrar botão apropriado
    showAppropriateButton() {
        const isLastQuestion = this.state.currentQuestionIndex === this.data.length - 1;
        
        if (isLastQuestion) {
            this.showButton('finish');
        } else {
            this.showButton('next');
        }
    },

    // Mostrar botão específico
    showButton(type) {
        if (type === 'next' && this.elements.nextBtn) {
            this.elements.nextBtn.style.display = 'inline-block';
            this.elements.finishBtn.style.display = 'none';
        } else if (type === 'finish' && this.elements.finishBtn) {
            this.elements.finishBtn.style.display = 'inline-block';
            this.elements.nextBtn.style.display = 'none';
        }
    },

    // Esconder botões
    hideButtons() {
        if (this.elements.nextBtn) this.elements.nextBtn.style.display = 'none';
        if (this.elements.finishBtn) this.elements.finishBtn.style.display = 'none';
    },

    // Próxima pergunta
    nextQuestion() {
        if (this.state.currentQuestionIndex < this.data.length - 1) {
            this.state.currentQuestionIndex++;
            this.showQuestion(this.state.currentQuestionIndex);
            this.updateProgress();
        }
    },

    // Atualizar progresso
    updateProgress() {
        if (!this.elements.progressFill) return;

        const progress = ((this.state.currentQuestionIndex + 1) / this.data.length) * 100;
        this.elements.progressFill.style.width = progress + '%';
    },

    // Mostrar resultado
    showResult() {
        if (!this.elements.questionContainer) return;

        const resultData = {
            icon: "🎉",
            title: "PARABÉNS!",
            subtitle: "Você tem o PERFIL PERFEITO para ser Nail Designer!",
            description: "Suas respostas confirmam que você possui todas as características necessárias para se tornar uma profissional de sucesso na área de nail design.",
            offer: "⚡ OFERTA ESPECIAL: Vagas com 50% de desconto disponíveis até HOJE!",
            cta: "Não perca esta oportunidade única de transformar sua vida profissional."
        };
        
        this.elements.questionContainer.innerHTML = `
            <div class="quiz-result">
                <div class="result-icon">${resultData.icon}</div>
                <h3 class="result-title">${resultData.title}</h3>
                <h4 class="result-subtitle">${resultData.subtitle}</h4>
                <p class="result-description">${resultData.description}</p>
                <div class="result-offer">
                    <p class="offer-text">${resultData.offer}</p>
                    <p class="cta-text">${resultData.cta}</p>
                </div>
                <button class="result-cta" onclick="Quiz.goToCheckout()">
                    🚀 GARANTIR MINHA VAGA COM DESCONTO!
                </button>
            </div>
        `;
        
        this.hideButtons();
        this.updateProgressToComplete();
    },

    // Atualizar progresso para 100%
    updateProgressToComplete() {
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = '100%';
        }
        if (this.elements.currentQuestionSpan) {
            this.elements.currentQuestionSpan.textContent = '5';
        }
    },

    // Ir para checkout
    goToCheckout() {
        // Abrir link em nova aba
        window.open(this.checkoutUrl, '_blank');
        
        // Fechar quiz após um delay
        setTimeout(() => {
            this.close();
        }, 500);
    },

    // Método público para iniciar quiz
    start() {
        this.init();
    }
};

// Exportar para uso global
window.Quiz = Quiz;
