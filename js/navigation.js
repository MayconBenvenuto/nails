/* ===================================
   NAVIGATION MODULE
   Gerencia menu mobile, navegação e scroll
   =================================== */

const Navigation = {
    // Elementos do DOM
    elements: {
        mobileMenuBtn: null,
        mobileNav: null,
        header: null,
        navLinks: null
    },

    // Estado atual
    state: {
        isMenuOpen: false,
        lastScrollY: 0
    },

    // Inicializar módulo
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initHeaderScroll();
        this.initSmoothScroll();
    },

    // Cachear elementos do DOM
    cacheElements() {
        this.elements.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.elements.mobileNav = document.getElementById('mobile-nav');
        this.elements.header = document.querySelector('.header');
        this.elements.navLinks = document.querySelectorAll('.mobile-nav a, .nav a[href^="#"]');
    },

    // Vincular eventos
    bindEvents() {
        if (this.elements.mobileMenuBtn) {
            this.elements.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Fechar menu ao clicar nos links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Gestos de toque para mobile
        this.bindTouchEvents();
    },

    // Toggle do menu mobile
    toggleMobileMenu() {
        if (!this.elements.mobileNav) return;

        this.state.isMenuOpen = !this.state.isMenuOpen;
        
        this.elements.mobileNav.classList.toggle('active');
        const icon = this.elements.mobileMenuBtn.querySelector('i');
        
        if (this.state.isMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
            this.elements.mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            this.closeMobileMenu();
        }
    },

    // Fechar menu mobile
    closeMobileMenu() {
        if (!this.elements.mobileNav || !this.state.isMenuOpen) return;

        this.state.isMenuOpen = false;
        this.elements.mobileNav.classList.remove('active');
        
        const icon = this.elements.mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        document.body.style.overflow = 'auto';
        this.elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    },

    // Clique fora para fechar menu
    handleOutsideClick(e) {
        if (!this.elements.mobileNav?.contains(e.target) && 
            !this.elements.mobileMenuBtn?.contains(e.target)) {
            this.closeMobileMenu();
        }
    },

    // Eventos de toque
    bindTouchEvents() {
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            
            // Fechar menu com swipe para baixo
            if (this.state.isMenuOpen && touchEndY > touchStartY + 50) {
                this.closeMobileMenu();
            }
        }, { passive: true });
    },

    // Efeito de scroll no header
    initHeaderScroll() {
        if (!this.elements.header) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Adicionar classe de scroll
            if (currentScrollY > 50) {
                this.elements.header.classList.add('scrolled');
            } else {
                this.elements.header.classList.remove('scrolled');
            }
            
            // Esconder/mostrar header
            if (currentScrollY > this.state.lastScrollY && currentScrollY > 100) {
                this.elements.header.style.transform = 'translateY(-100%)';
            } else {
                this.elements.header.style.transform = 'translateY(0)';
            }
            
            this.state.lastScrollY = currentScrollY;
        });
    },

    // Scroll suave para âncoras
    initSmoothScroll() {
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.closeMobileMenu();
                    
                    const headerHeight = this.elements.header?.offsetHeight || 0;
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
};

// Exportar para uso global
window.Navigation = Navigation;
