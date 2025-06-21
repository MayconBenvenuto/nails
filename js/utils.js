/* ===================================
   UTILITIES MODULE
   FAQ, imagens, e outras funcionalidades gerais
   =================================== */

const Utils = {
    // Estado
    state: {
        heroImageTested: false
    },

    // URLs de fallback para imagens
    fallbackImages: [
        "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7791102/pexels-photo-7791102.jpeg?auto=compress&cs=tinysrgb&w=800", 
        "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],

    // Inicializar módulo
    init() {
        this.setupFAQ();
        this.fixHeroImage();
        this.setupHeaderEffects();
    },

    // Configurar FAQ
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    // Fechar outros itens
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle item atual
                    item.classList.toggle('active');
                });
            }
        });
    },

    // Corrigir imagem do hero
    fixHeroImage() {
        const heroImg = document.querySelector('.hero-image img');
        if (!heroImg) return;

        let fallbackIndex = 0;

        // Testar imagem local primeiro
        const testLocalImage = () => {
            if (this.state.heroImageTested) return;
            this.state.heroImageTested = true;

            const testImg = new Image();
            testImg.onload = () => {
                if (heroImg.src !== testImg.src) {
                    heroImg.src = testImg.src;
                }
            };
            testImg.onerror = () => {
                this.loadNextFallback(heroImg, fallbackIndex);
            };
            testImg.src = 'hero-image.jpg';
        };

        // Carregar próximo fallback
        this.loadNextFallback = (img, index) => {
            if (index < this.fallbackImages.length) {
                img.src = this.fallbackImages[index];
                fallbackIndex = index + 1;
            } else {
                this.createFallbackImage(img);
            }
        };

        // Verificar se já carregou
        if (heroImg.complete && heroImg.naturalHeight === 0) {
            testLocalImage();
        } else if (!heroImg.complete) {
            testLocalImage();
        }

        // Event listener para erros
        heroImg.addEventListener('error', () => {
            if (!this.state.heroImageTested) {
                testLocalImage();
            } else {
                this.loadNextFallback(heroImg, fallbackIndex);
            }
        });
    },

    // Criar imagem fallback
    createFallbackImage(img) {
        const heroImageDiv = document.querySelector('.hero-image');
        if (heroImageDiv) {
            heroImageDiv.innerHTML = `
                <div class="hero-image-fallback">
                    <i class="fas fa-spa"></i>
                    <p>Nail Design Profissional</p>
                </div>
            `;
        }
    },

    // Efeitos do header
    setupHeaderEffects() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.style.background = 'rgba(101, 15, 89, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #650F59, #8B1C6B)';
                header.style.backdropFilter = 'none';
            }
        });
    },

    // Validar email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Formatador de moeda
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    // Debounce para performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Detectar dispositivo móvel
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Scroll suave para elemento
    scrollToElement(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = element.offsetTop - headerHeight - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Criar toast notification
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        // Estilos inline para funcionar sem CSS adicional
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10001',
            transition: 'all 0.3s ease',
            transform: 'translateX(100%)',
            backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'
        });
        
        document.body.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover após duração
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    },

    // Lazy loading para imagens
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    },

    // Log de analytics (placeholder)
    logEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Fallback para debug
        console.log('Analytics Event:', eventName, parameters);
    }
};

// Exportar para uso global
window.Utils = Utils;
