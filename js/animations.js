/* ===================================
   ANIMATIONS MODULE
   Gerencia animações, efeitos visuais e interações
   =================================== */

const Animations = {
    // Configurações
    config: {
        observerOptions: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    },

    // Estado
    state: {
        observer: null,
        priceAnimated: false
    },

    // Inicializar módulo
    init() {
        this.initScrollAnimations();
        this.initTouchInteractions();
        this.initImageEffects();
        this.initPriceAnimation();
        this.addLoadingClass();
    },

    // Animações no scroll
    initScrollAnimations() {
        this.state.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.config.observerOptions);

        // Observar elementos para animação
        const animateElements = document.querySelectorAll('.card, .module, .garantia-item, .acesso-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.state.observer.observe(el);
        });
    },

    // Interações de toque
    initTouchInteractions() {
        const touchElements = document.querySelectorAll(
            '.btn-primary, .btn-certificado, .btn-depoimentos, .btn-comprar, .quiz-btn, .card, .module'
        );

        touchElements.forEach(element => {
            // Efeito ripple
            element.addEventListener('touchstart', (e) => this.createRipple(e, element), { passive: true });
            
            // Estados de toque
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                element.classList.remove('touch-active');
                element.classList.add('touch-pulse');
                setTimeout(() => element.classList.remove('touch-pulse'), 300);
            }, { passive: true });
        });

        // Melhorar FAQ no mobile
        const faqItems = document.querySelectorAll('.faq-question');
        faqItems.forEach(item => {
            item.addEventListener('touchstart', () => {
                item.classList.add('touch-active');
            }, { passive: true });
            
            item.addEventListener('touchend', () => {
                item.classList.remove('touch-active');
            }, { passive: true });
        });
    },

    // Criar efeito ripple
    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (e.touches?.[0]?.clientX || e.clientX) - rect.left - size / 2;
        const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Garantir que o elemento tenha position relative
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    },

    // Efeitos de imagem
    initImageEffects() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Estado de carregamento
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // Quando carregada
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            // Tratamento de erro
            img.addEventListener('error', () => {
                this.handleImageError(img);
            });
            
            // Se já carregou
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    },

    // Tratar erro de imagem
    handleImageError(img) {
        if (img.src.includes('dpm') || img.src.includes('certificado.jpg')) {
            const parent = img.parentElement;
            if (parent) {
                parent.style.background = 'linear-gradient(135deg, #f0f0f0, #e0e0e0)';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.innerHTML = '<i class="fas fa-image" style="font-size: 3rem; color: #ccc;"></i>';
            }
        }
    },

    // Animação de preço
    initPriceAnimation() {
        const priceSection = document.querySelector('.preco');
        if (!priceSection) return;
        
        const priceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.state.priceAnimated) {
                    this.animatePrice();
                    this.state.priceAnimated = true;
                    priceObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        priceObserver.observe(priceSection);
    },

    // Animar preço
    animatePrice() {
        const priceElement = document.querySelector('.valor-desconto');
        if (!priceElement) return;
        
        const finalValue = 147;
        let currentValue = 0;
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        
        const animate = () => {
            currentValue += increment;
            if (currentValue < finalValue) {
                priceElement.textContent = `R$ ${Math.floor(currentValue)}`;
                requestAnimationFrame(animate);
            } else {
                priceElement.textContent = `R$ ${finalValue}`;
            }
        };
        
        animate();
    },

    // Adicionar classe de carregamento
    addLoadingClass() {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    },

    // Otimizações para mobile
    optimizeForMobile() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
            this.optimizeImagesForMobile();
            this.handleOrientationChange();
        }
    },

    // Otimizar imagens para mobile
    optimizeImagesForMobile() {
        const images = document.querySelectorAll('img[src*="pexels"], img[src*="unsplash"]');
        images.forEach(img => {
            if (img.src.includes('&w=1000')) {
                img.src = img.src.replace('&w=1000', '&w=500');
            }
        });
    },

    // Lidar com mudanças de orientação
    handleOrientationChange() {
        const updateOrientation = () => {
            const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
            document.body.classList.remove('portrait', 'landscape');
            document.body.classList.add(orientation);
            
            if (orientation === 'landscape' && window.innerWidth < 900) {
                const hero = document.querySelector('.hero');
                if (hero) hero.style.minHeight = '450px';
            } else if (orientation === 'portrait') {
                const hero = document.querySelector('.hero');
                if (hero) hero.style.minHeight = '';
            }
        };
        
        window.addEventListener('resize', updateOrientation);
        updateOrientation();
    },

    // Limpar recursos
    destroy() {
        if (this.state.observer) {
            this.state.observer.disconnect();
        }
    }
};

// Exportar para uso global
window.Animations = Animations;
