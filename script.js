// Quiz Data - 10 questões focadas em mulheres que querem aprender nail design
const quizData = [
    {
        question: "O que mais te motiva a querer aprender nail design?",
        options: [
            "Quero ter minha própria renda e independência financeira",
            "Sempre tive paixão por unhas e beleza",
            "Busco uma profissão que me dê flexibilidade de horários",
            "Quero empreender e ter meu próprio negócio"
        ]
    },
    {
        question: "Qual é sua maior preocupação ao começar nessa área?",
        options: [
            "Não saber se tenho habilidade suficiente",
            "Medo de não conseguir clientes no início",
            "Preocupação com o investimento inicial",
            "Receio de não aprender as técnicas corretamente"
        ]
    },
    {
        question: "Quanto você gostaria de ganhar mensalmente como nail designer?",
        options: [
            "R$ 1.500 - R$ 3.000 (complementar renda)",
            "R$ 3.000 - R$ 6.000 (renda principal)",
            "R$ 6.000 - R$ 10.000 (viver bem)",
            "Mais de R$ 10.000 (liberdade total)"
        ]
    },
    {
        question: "Qual é seu maior medo ao pensar em trabalhar com unhas?",
        options: [
            "Não ter mãos firmes para fazer trabalhos delicados",
            "Não conseguir criar designs bonitos e únicos",
            "Demorar muito para aprender as técnicas",
            "Não saber como precificar meu trabalho"
        ]
    },
    {
        question: "Como você imagina seu futuro como nail designer?",
        options: [
            "Atendendo em casa com agenda sempre cheia",
            "Tendo meu próprio salão de beleza",
            "Sendo reconhecida como a melhor da região",
            "Ensinando outras mulheres a profissão"
        ]
    },
    {
        question: "Qual seria seu maior obstáculo para começar hoje?",
        options: [
            "Não sei por onde começar nem o que estudar",
            "Falta de tempo para me dedicar aos estudos",
            "Não tenho dinheiro para investir em cursos caros",
            "Medo de não ter talento natural para isso"
        ]
    },
    {
        question: "O que você mais quer aprender primeiro?",
        options: [
            "Técnicas básicas de esmaltação perfeita",
            "Como fazer nail art e decorações incríveis",
            "Aplicação de gel, fibra e alongamento",
            "Como montar meu negócio e conseguir clientes"
        ]
    },
    {
        question: "Qual é sua situação profissional atual?",
        options: [
            "Trabalho em outra área, mas quero mudar",
            "Estou desempregada e preciso de uma profissão",
            "Sou dona de casa e quero ter minha renda",
            "Trabalho, mas quero uma renda extra"
        ]
    },
    {
        question: "Como você se sente quando vê o trabalho de outras nail designers?",
        options: [
            "Admirada e inspirada a aprender",
            "Ansiosa para conseguir fazer igual",
            "Insegura achando que nunca vou conseguir",
            "Determinada a ser melhor que elas"
        ]
    },    {
        question: "Se pudesse começar sua jornada como nail designer hoje, o que você mais precisaria?",
        options: [
            "Um método passo a passo fácil de seguir",
            "Uma mentora experiente para me orientar",
            "Técnicas que realmente funcionam no mercado",
            "Confiança de que vou conseguir ter sucesso"
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Quiz functionality
function initQuiz() {
    showQuestion(currentQuestionIndex);
    updateProgress();
}

function showQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const question = quizData[index];
    
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="question-options">
                ${question.options.map((option, optionIndex) => `
                    <button class="option-btn" onclick="selectOption(${optionIndex})">
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Update question number
    document.getElementById('current-question').textContent = index + 1;
    
    // Hide/show buttons
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'none';
}

function selectOption(optionIndex) {
    // Remove selection from all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelectorAll('.option-btn')[optionIndex].classList.add('selected');
    
    // Store answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Show appropriate button
    if (currentQuestionIndex === quizData.length - 1) {
        document.getElementById('finish-btn').style.display = 'inline-block';
    } else {
        document.getElementById('next-btn').style.display = 'inline-block';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    }
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
}

function finishQuiz() {
    showResult();
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    
    // Resultado personalizado para mulheres que querem aprender
    const resultData = {
        icon: "💎",
        title: "VOCÊ NASCEU PARA ISSO!",
        description: "Suas respostas revelam que você tem TODAS as características de uma futura Nail Designer de SUCESSO! Sua motivação, seus sonhos e sua determinação mostram que você está no caminho certo.",
        highlight: "🌟 DESCOBRIR: Como sair do ZERO e construir uma carreira de SUCESSO em Nail Design!"
    };
    
    questionContainer.innerHTML = `
        <div class="quiz-result">
            <div class="result-icon">${resultData.icon}</div>
            <h3 class="result-title">${resultData.title}</h3>
            <p class="result-description">${resultData.description}</p>
            <p style="color: #ff6b9d; font-weight: 600; font-size: 1.1rem; margin-bottom: 2rem;">${resultData.highlight}</p>
            <a href="https://go.hotmart.com/K100327110W?ap=a12c" class="result-cta" target="_blank">
                🚀 QUERO COMEÇAR MINHA TRANSFORMAÇÃO AGORA!
            </a>
        </div>
    `;
    
    // Hide quiz buttons
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'none';
    
    // Update progress to 100%
    document.getElementById('progress-fill').style.width = '100%';
    document.getElementById('current-question').textContent = '10';
    
    // Auto scroll to price section after 3 seconds
    setTimeout(() => {
        closeQuizAndScroll();
    }, 3000);
}

function closeQuizAndScroll() {
    const quizModal = document.getElementById('quiz-modal');
    quizModal.style.opacity = '0';
    quizModal.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        quizModal.style.display = 'none';
        // Scroll to price section
        const priceSection = document.querySelector('.preco');
        if (priceSection) {
            priceSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 500);
}

// Event listeners for quiz
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quiz
    initQuiz();
    
    // Add event listeners
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('finish-btn').addEventListener('click', finishQuiz);
    
    // Prevent closing quiz (remove any close buttons/escape key)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 107, 157, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8fab)';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card, .module, .depoimento, .garantia-item, .acesso-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for price
function animateCounter() {
    const priceElement = document.querySelector('.valor');
    if (!priceElement) return;
    
    let start = 0;
    const end = 147;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < end) {
            priceElement.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            priceElement.textContent = end;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when price section is visible
const priceSection = document.querySelector('.preco');
if (priceSection) {
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                priceObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    priceObserver.observe(priceSection);
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Add mobile menu button if screen is small
function checkScreenSize() {
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.header .container');
        let mobileButton = document.querySelector('.mobile-menu-btn');
        
        if (!mobileButton) {
            mobileButton = document.createElement('button');
            mobileButton.className = 'mobile-menu-btn';
            mobileButton.innerHTML = '<i class="fas fa-bars"></i>';
            mobileButton.onclick = toggleMobileMenu;
            header.appendChild(mobileButton);
        }
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// Form validation and interaction
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-comprar');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-comprar {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 107, 157, 0.95);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav.mobile-active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add to head
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);
