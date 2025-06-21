/* ===================================
   MAIN APPLICATION SCRIPT
   Coordena todos os módulos do site
   =================================== */

const App = {
    // Configurações globais
    config: {
        debug: false,
        version: '2.0.0',
        loadDelay: 100
    },

    // Estado da aplicação
    state: {
        isLoaded: false,
        isMobile: false,
        modules: {}
    },

    // Inicializar aplicação
    init() {
        this.log('Iniciando aplicação...');
        
        // Detectar dispositivo
        this.state.isMobile = this.detectMobile();
        
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMLoaded());
        } else {
            this.onDOMLoaded();
        }
    },

    // Quando DOM estiver carregado
    onDOMLoaded() {
        this.log('DOM carregado, inicializando módulos...');
        
        // Inicializar módulos na ordem correta
        this.initModules();
        
        // Configurar eventos globais
        this.bindGlobalEvents();
        
        // Adicionar classe de carregamento
        setTimeout(() => {
            this.markAsLoaded();
        }, this.config.loadDelay);
    },

    // Inicializar módulos
    initModules() {
        const modules = [
            { name: 'Navigation', instance: window.Navigation },
            { name: 'Utils', instance: window.Utils },
            { name: 'Animations', instance: window.Animations },
            { name: 'Quiz', instance: window.Quiz }
        ];

        modules.forEach(({ name, instance }) => {
            try {
                if (instance && typeof instance.init === 'function') {
                    instance.init();
                    this.state.modules[name] = instance;
                    this.log(`Módulo ${name} inicializado com sucesso`);
                } else {
                    this.log(`Módulo ${name} não encontrado ou não possui método init()`, 'warn');
                }
            } catch (error) {
                this.log(`Erro ao inicializar módulo ${name}:`, 'error', error);
            }
        });
    },

    // Eventos globais
    bindGlobalEvents() {
        // Evento de redimensionamento
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Evento de scroll otimizado
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Eventos de visibilidade da página
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Tratar erros JavaScript
        window.addEventListener('error', (e) => {
            this.handleError(e);
        });
    },

    // Lidar com redimensionamento
    handleResize() {
        const wasMobile = this.state.isMobile;
        this.state.isMobile = this.detectMobile();
        
        if (wasMobile !== this.state.isMobile) {
            this.log(`Mudança de dispositivo detectada: ${this.state.isMobile ? 'Mobile' : 'Desktop'}`);
            this.handleDeviceChange();
        }
    },

    // Lidar com scroll
    handleScroll() {
        // Implementar lógica de scroll se necessário
        // Por exemplo, parallax ou lazy loading
    },

    // Lidar com teclado
    handleKeyboard(e) {
        // Atalhos de teclado globais
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            // Abrir busca ou comando
        }
    },

    // Lidar com mudança de visibilidade
    handleVisibilityChange() {
        if (document.hidden) {
            this.log('Página ficou invisível');
        } else {
            this.log('Página ficou visível');
        }
    },

    // Lidar com mudança de dispositivo
    handleDeviceChange() {
        // Reconfigurar módulos se necessário
        if (this.state.modules.Animations) {
            this.state.modules.Animations.optimizeForMobile();
        }
    },

    // Lidar com erros
    handleError(error) {
        this.log('Erro JavaScript capturado:', 'error', error);
        
        // Enviar para analytics em produção
        if (!this.config.debug && typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    },

    // Marcar como carregado
    markAsLoaded() {
        this.state.isLoaded = true;
        document.body.classList.add('loaded');
        this.log('Aplicação carregada completamente');
        
        // Disparar evento customizado
        document.dispatchEvent(new CustomEvent('appLoaded', {
            detail: { version: this.config.version }
        }));
    },

    // Detectar mobile
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    },

    // Utilitários
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

    // Sistema de log
    log(message, type = 'info', ...args) {
        if (!this.config.debug && type !== 'error') return;
        
        const styles = {
            info: 'color: #2196F3; font-weight: bold;',
            warn: 'color: #FF9800; font-weight: bold;',
            error: 'color: #F44336; font-weight: bold;',
            success: 'color: #4CAF50; font-weight: bold;'
        };
        
        console.log(`%c[App ${type.toUpperCase()}]`, styles[type] || styles.info, message, ...args);
    },

    // API pública
    getModule(name) {
        return this.state.modules[name];
    },

    isLoaded() {
        return this.state.isLoaded;
    },

    isMobileDevice() {
        return this.state.isMobile;
    }
};

// Inicializar aplicação
App.init();

// Exportar para uso global
window.App = App;

// Compatibilidade com código legado
window.initQuiz = () => {
    if (App.getModule('Quiz')) {
        App.getModule('Quiz').start();
    }
};

// Log de inicialização
console.log('%c🎨 Nail Design Website v' + App.config.version, 'color: #650F59; font-size: 16px; font-weight: bold;');
console.log('%c✨ Aplicação modular carregada com sucesso!', 'color: #4CAF50; font-weight: bold;');
