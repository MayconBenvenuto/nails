// =========================
// MOBILE NAVIGATION
// =========================

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const header = document.querySelector('.header');
    
    if (!mobileMenuBtn || !mobileNav) return;
    
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const isActive = mobileNav.classList.contains('active');
        
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (!isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });
      // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Add touch events for better mobile experience
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        // If swipe down on the menu, close it
        if (mobileNav.classList.contains('active') && touchEndY > touchStartY + 50) {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }, { passive: true });
}

// Enhanced Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced Touch Interactions
function initTouchInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-certificado, .btn-depoimentos, .btn-comprar, .quiz-btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.touches[0].clientX - rect.left - size / 2;
            const y = e.touches[0].clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }, { passive: true });
        
        // Impedir o delay de toque em dispositivos móveis
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });
    
    // Melhorar a experiência de toque no FAQ
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        item.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
}

// Smooth Scroll Enhancement
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Verificar se está em dispositivo móvel e se o menu está aberto
                const mobileNav = document.getElementById('mobile-nav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                    document.body.style.overflow = 'auto';
                }
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                // Adicionar offset extra para melhor visualização em dispositivos móveis
                const extraOffset = window.innerWidth <= 768 ? 15 : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - extraOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========================
// QUIZ FUNCTIONALITY
// =========================

// Quiz Data - 5 perguntas específicas fornecidas pelo usuário
const quizData = [
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
];

let currentQuestionIndex = 0;
let userAnswers = [];

// Quiz functionality
function initQuiz() {
    // Show quiz modal immediately when page loads
    const quizModal = document.getElementById('quiz-modal');
    quizModal.style.display = 'flex';
    quizModal.style.opacity = '1';
    quizModal.style.visibility = 'visible';
    
    // Prevent body scroll when quiz is open
    document.body.style.overflow = 'hidden';
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Show first question
    showQuestion(currentQuestionIndex);
    updateProgress();
}

function showQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const question = quizData[index];
    const letters = ['A', 'B', 'C', 'D'];
    
    questionContainer.innerHTML = `
        <h3 class="question-title">${question.question}</h3>
        <div class="quiz-options">
            ${question.options.map((option, optionIndex) => `
                <div class="quiz-option" data-index="${optionIndex}" onclick="selectOption(${optionIndex})">
                    <span class="quiz-option-letter">${letters[optionIndex]}</span>
                    <span class="quiz-option-text">${option}</span>
                </div>
            `).join('')}
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
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelectorAll('.quiz-option')[optionIndex].classList.add('selected');
    
    // Store answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Show appropriate button
    if (currentQuestionIndex === quizData.length - 1) {
        document.getElementById('finish-btn').style.display = 'inline-block';
        document.getElementById('next-btn').style.display = 'none';
    } else {
        document.getElementById('next-btn').style.display = 'inline-block';
        document.getElementById('finish-btn').style.display = 'none';
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
    
    // Resultado melhorado com oferta especial
    const resultData = {
        icon: "🎉",
        title: "PARABÉNS!",
        subtitle: "Você tem o PERFIL PERFEITO para ser Nail Designer!",
        description: "Suas respostas confirmam que você possui todas as características necessárias para se tornar uma profissional de sucesso na área de nail design.",
        offer: "⚡ OFERTA ESPECIAL: Vagas com 50% de desconto disponíveis até HOJE!",
        cta: "Não perca esta oportunidade única de transformar sua vida profissional."
    };
    
    questionContainer.innerHTML = `
        <div class="quiz-result">
            <div class="result-icon">${resultData.icon}</div>
            <h3 class="result-title">${resultData.title}</h3>
            <h4 class="result-subtitle">${resultData.subtitle}</h4>
            <p class="result-description">${resultData.description}</p>
            <div class="result-offer">
                <p class="offer-text">${resultData.offer}</p>
                <p class="cta-text">${resultData.cta}</p>
            </div>
            <a href="https://go.hotmart.com/K100327110W?ap=a12c" class="result-cta" target="_blank">
                🚀 GARANTIR MINHA VAGA COM DESCONTO!
            </a>
        </div>
    `;
    
    // Hide quiz buttons
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('finish-btn').style.display = 'none';    
    // Update progress to 100%
    document.getElementById('progress-fill').style.width = '100%';
    document.getElementById('current-question').textContent = '5';
    
    // Não remover automaticamente - só com clique no X
}

function closeQuizAndScroll() {
    const quizModal = document.getElementById('quiz-modal');
    quizModal.style.opacity = '0';
    quizModal.style.transform = 'scale(0.9)';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
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

function closeQuiz() {
    const quizModal = document.getElementById('quiz-modal');
    quizModal.style.opacity = '0';
    quizModal.style.transform = 'scale(0.9)';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
    
    setTimeout(() => {
        quizModal.style.display = 'none';
    }, 500);
}

// FAQ Toggle Functionality
function setupFAQ() {
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
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(101, 15, 89, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #650F59, #8B1C6B)';
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
    const end = 17;
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

// Enhanced Price Animation Function
function setupAnimatedPrice() {
    const priceSection = document.querySelector('.preco');
    if (!priceSection) return;
    
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePrice();
                priceObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    priceObserver.observe(priceSection);
}

function animatePrice() {
    const priceElement = document.querySelector('.valor');
    if (!priceElement) return;
    
    let currentValue = 0;
    const targetValue = 17;
    const increment = 1;
    const delay = 100;
    
    const animateStep = () => {
        if (currentValue <= targetValue) {
            priceElement.textContent = currentValue;
            currentValue += increment;
            setTimeout(animateStep, delay);
        }
    };
    
    animateStep();
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

// Instagram button floating effect
function createFloatingInstagram() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = 'https://www.instagram.com/escolanailelite/';
    floatingBtn.target = '_blank';
    floatingBtn.className = 'floating-instagram';
    floatingBtn.innerHTML = '<i class="fab fa-instagram"></i>';
    
    // Add floating Instagram CSS
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        .floating-instagram {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
            z-index: 1000;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            animation: instagramPulse 2s infinite;
        }
        
        .floating-instagram:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(225, 48, 108, 0.6);
            color: white;
            text-decoration: none;
        }
        
        @keyframes instagramPulse {
            0% { 
                box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 6px 25px rgba(225, 48, 108, 0.6);
                transform: scale(1.05);
            }
            100% { 
                box-shadow: 0 4px 15px rgba(225, 48, 108, 0.4);
                transform: scale(1);
            }
        }
        
        @media (max-width: 768px) {
            .floating-instagram {
                width: 50px;
                height: 50px;
                font-size: 1.3rem;
                bottom: 15px;
                right: 15px;
            }
        }
    `;
    document.head.appendChild(floatingStyle);
    document.body.appendChild(floatingBtn);
}

// Initialize floating Instagram button
document.addEventListener('DOMContentLoaded', createFloatingInstagram);

// =========================
// INITIALIZATION
// =========================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all mobile enhancements
    initMobileMenu();
    initHeaderScroll();
    initTouchInteractions();
    initSmoothScroll();
    optimizeForMobile();
    
    // Initialize existing functionality
    initQuiz();
    setupAnimatedPrice();
    setupFAQ();
    createFloatingInstagram();
    handleImageErrors();
    
    // Quiz event listeners
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('finish-btn').addEventListener('click', finishQuiz);
    document.getElementById('quiz-close-btn').addEventListener('click', closeQuiz);
    
    // Escape key to close quiz
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuiz();
        }
    });
    
    // Add intersection observer for animations
    initScrollAnimations();
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .acesso-item, .module, .garantia-item, .depoimento-visual, .cert-benefit');
    animateElements.forEach(el => observer.observe(el));
}

// Enhanced Window Load Event
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[loading="lazy"]');
    criticalImages.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight * 2) {
            img.loading = 'eager';
        }
    });
});

// Performance optimizations
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add to head - Enhanced Loading Styles

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

// Image Loading Error Handling
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Hide broken image if it's a local file that doesn't exist
            if (this.src.includes('dpm') || this.src.includes('certificado.jpg')) {
                this.style.display = 'none';
                console.warn(`Imagem não encontrada: ${this.src}`);
                
                // Add fallback styling to parent container
                const parent = this.parentElement;
                if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                    parent.innerHTML = '<i class="fas fa-image" style="font-size: 3rem; color: #ccc;"></i>';
                }
            }
        });
        
        // Add loading state
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Initialize image error handling
document.addEventListener('DOMContentLoaded', handleImageErrors);

// Otimizações para dispositivos móveis
function optimizeForMobile() {
    // Detectar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Adicionar classe ao body
        document.body.classList.add('mobile-device');
        
        // Otimizar imagens para mobile
        const images = document.querySelectorAll('img[src*="unsplash"]');
        images.forEach(img => {
            // Substituir tamanhos grandes por menores em dispositivos móveis
            let currentSrc = img.src;
            if (currentSrc.includes('&w=1000')) {
                img.src = currentSrc.replace('&w=1000', '&w=500');
            }
        });
        
        // Acelerar o carregamento de fontes
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
        
        // Adicionar eventos de toque para interatividade
        document.querySelectorAll('.card, .module, .benefit-item').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            item.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
                // Pequeno efeito de pulsação ao soltar
                this.classList.add('touch-pulse');
                setTimeout(() => {
                    this.classList.remove('touch-pulse');
                }, 300);
            }, { passive: true });
        });
    }
}

// Chamar função de otimização mobile
document.addEventListener('DOMContentLoaded', function() {
    // ... outros códigos de inicialização existentes ...
    
    optimizeForMobile();
});

// Manipular mudanças de orientação de tela
function handleOrientationChange() {
    const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    document.body.classList.remove('portrait', 'landscape');
    document.body.classList.add(orientation);
    
    // Ajustar elementos baseados na orientação
    if (orientation === 'landscape' && window.innerWidth < 900) {
        // Ajustar elementos especificamente para telas pequenas em landscape
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = '450px';
        }
    } else if (orientation === 'portrait') {
        // Restaurar valores para portrait
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = '';
        }
    }
}

// Monitor de orientação
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        handleOrientationChange();
    }
});

// Chamar na inicialização
document.addEventListener('DOMContentLoaded', function() {
    handleOrientationChange();
});

// Adicionar tratamento específico para a imagem do hero
function fixHeroImage() {
    // Selecionar a imagem do hero
    const heroImg = document.querySelector('.hero-image img');
    if (!heroImg) return;
    
    // Lista de URLs de fallback para uma imagem de nail design
    const fallbackImages = [
        "hero-image.jpg",
        "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1000",
        "https://images.pexels.com/photos/7791102/pexels-photo-7791102.jpeg?auto=compress&cs=tinysrgb&w=1000",
        "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1000"
    ];
    
    let fallbackIndex = 0;
    
    // Verificar se a imagem já carregou
    if (heroImg.complete) {
        // Se a imagem já carregou mas teve erro, usar fallback
        if (heroImg.naturalHeight === 0) {
            loadNextFallback();
        }
    }
    
    // Adicionar handler de erro para a imagem
    heroImg.addEventListener('error', loadNextFallback);
    
    // Tenta carregar o próximo fallback
    function loadNextFallback() {
        fallbackIndex++;
        
        if (fallbackIndex < fallbackImages.length) {
            heroImg.src = fallbackImages[fallbackIndex];
        } else {
            // Todos os fallbacks falharam, criar uma imagem fallback inline
            const heroImageDiv = document.querySelector('.hero-image');
            if (heroImageDiv) {
                heroImageDiv.innerHTML = `
                    <div class="hero-image-fallback">
                        <i class="fas fa-spa"></i>
                        <p>Nail Design Profissional</p>
                    </div>
                `;
            }
        }
    }
}

// Chamar a função quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    fixHeroImage();
});
