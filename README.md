# 🎨 Nail Design Website - Projeto Otimizado

Este é um site de landing page profissional para um curso de Nail Design, totalmente refatorado para facilitar a manutenção e escalabilidade.

## 🌐 Site Online

Acesse o site: [https://naildesignerelite.com.br](https://naildesignerelite.com.br)
*Domínio configurado via HostGator - veja instruções DNS em `DNS_HOSTGATOR_CONFIG.md`*

## Estrutura do Projeto

```txt
├── index.html      # Página principal
├── style.css       # Estilos CSS
├── script.js       # JavaScript/Interações
├── certificado.jpg # Imagem do certificado
├── dpm1.jpg       # Depoimento 1
├── dpm2.jpg       # Depoimento 2
├── dpm3.jpg       # Depoimento 3
├── CNAME          # Configuração de domínio personalizado
├── .nojekyll      # Arquivo para GitHub Pages
├── .github/workflows/deploy.yml # GitHub Actions para deploy automático
└── README.md      # Este arquivo
```

## Funcionalidades

- ✅ Quiz interativo de engajamento
- ✅ Design responsivo para todos os dispositivos
- ✅ Animações suaves e efeitos visuais
- ✅ Seções de depoimentos com imagens
- ✅ FAQ interativo
- ✅ Botão flutuante do Instagram
- ✅ Efeitos de scroll suaves
- ✅ Formulário de contato
- ✅ Certificado profissional
- ✅ Otimização para dispositivos móveis
- ✅ Deploy automático no GitHub Pages

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com Flexbox/Grid
- JavaScript Vanilla (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)
- GitHub Pages para hospedagem
- GitHub Actions para CI/CD

## Deploy

O site é automaticamente deployado no GitHub Pages sempre que há um push para a branch `main`. O processo inclui:

1. **Deploy Automático**: GitHub Actions configura e deploya automaticamente
2. **Domínio Personalizado**: Configurado via arquivo CNAME
3. **HTTPS**: Habilitado automaticamente pelo GitHub Pages

### HostGator DNS Configuration

**📁 Arquivo:** `DNS_HOSTGATOR_CONFIG.md` - Instruções completas para configurar o DNS

**Configuração rápida:**
1. Acesse cPanel da HostGator
2. Zone Editor > Adicionar registros A para GitHub Pages
3. Configurar CNAME para www
4. Aguardar propagação (2-24 horas)

### Como fazer deploy manualmente:

1. Faça suas alterações nos arquivos
2. Commit e push para a branch main:
```bash
git add .
git commit -m "Suas alterações"
git push origin main
```
3. O GitHub Actions automaticamente fará o deploy

## Como usar localmente

1. Clone o repositório:
```bash
git clone https://github.com/MayconBenvenuto/nails.git
```

2. Abra o arquivo `index.html` no navegador
3. Ou use um servidor local:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## Melhorias Implementadas

- ✅ Correção de indentação e formatação
- ✅ Melhorias de acessibilidade (ARIA labels)
- ✅ Meta tags para SEO
- ✅ Tratamento de erros de imagem
- ✅ Código JavaScript otimizado
- ✅ Estrutura HTML limpa
- ✅ Design totalmente responsivo
- ✅ Quiz com layout otimizado
- ✅ Experiência aprimorada para dispositivos móveis
- ✅ Sistema de fallback para imagens
- ✅ Deploy automático configurado

## Suporte a Dispositivos

- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (320px - 767px)
- ✅ Orientação portrait e landscape

## Contato

Para suporte: <suporte@naildesign.com>

## 🌐 Configuração de Domínio Personalizado (HostGator)

O domínio `naildesignerelite.com.br` está registrado na HostGator. Para conectá-lo ao GitHub Pages:

### Configuração DNS necessária:
1. **Acesse o cPanel da HostGator**
2. **Vá para "Zone Editor" ou "Editor de Zona DNS"**
3. **Configure os registros DNS conforme arquivo `DNS_HOSTGATOR_CONFIG.md`**

### Registros importantes:
- **Tipo A:** Apontar para IPs do GitHub Pages
- **Tipo CNAME:** www apontar para mayconbenvenuto.github.io
- **Tempo de propagação:** 24-48 horas

**Arquivo detalhado:** `DNS_HOSTGATOR_CONFIG.md`

## 📁 Estrutura do Projeto

```
nail-design-website/
├── css/                           # Arquivos CSS modulares
│   ├── variables.css             # Variáveis CSS e utilitários
│   ├── header.css               # Estilos do header e navegação
│   ├── hero.css                 # Seção hero
│   ├── buttons.css              # Todos os botões
│   ├── sections.css             # Seções de conteúdo
│   ├── quiz.css                 # Modal e componentes do quiz
│   ├── pricing-faq-footer.css   # Preços, FAQ e footer
│   └── main.css                 # Arquivo principal (importa todos)
├── js/                           # Arquivos JavaScript modulares
│   ├── navigation.js            # Navegação e menu mobile
│   ├── quiz.js                  # Funcionalidade do quiz
│   ├── animations.js            # Animações e efeitos
│   ├── utils.js                 # Utilitários e FAQ
│   └── main.js                  # Coordenador principal
├── index.html                   # Arquivo HTML principal
├── hero-image.jpg              # Imagem principal
├── certificado.jpg             # Imagem do certificado
├── dpm1.jpg, dpm2.jpg, dpm3.jpg # Imagens de depoimentos
└── README.md                   # Este arquivo
```

## 🚀 Principais Melhorias

### ✨ Arquitetura Modular
- **CSS dividido em 7 arquivos temáticos** ao invés de 1 arquivo gigante
- **JavaScript dividido em 5 módulos** com responsabilidades específicas
- **Sistema de variáveis CSS** para cores, espaçamentos e tipografia
- **Importação automática** de todos os módulos CSS no arquivo principal

### 🛠️ Funcionalidades Principais

#### 📱 Navegação (navigation.js)
- Menu mobile responsivo
- Smooth scroll para âncoras
- Header com efeito de scroll
- Fechamento por toque/clique fora

#### 🎯 Quiz Interativo (quiz.js)
- 5 perguntas personalizadas
- Barra de progresso
- Botão de checkout funcional
- Modal responsivo
- Resultados personalizados

#### ✨ Animações (animations.js)
- Animações no scroll
- Efeitos de toque (ripple)
- Otimizações para mobile
- Performance otimizada

#### 🔧 Utilitários (utils.js)
- FAQ accordion
- Tratamento de imagens
- Funções auxiliares
- Sistema de toast notifications

## 🎨 Sistema de Design

### 🎨 Variáveis CSS
```css
:root {
    /* Cores principais */
    --primary-color: #650F59;
    --secondary-color: #FF6B6B;
    --accent-color: #fff200;
    
    /* Espaçamentos */
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    
    /* Tipografia */
    --font-size-base: 1rem;
    --font-size-lg: 1.1rem;
    --font-size-xl: 1.2rem;
}
```

### 📱 Responsividade
- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints**: 768px (mobile), 1024px (tablet), 1200px (desktop)
- **Touch Friendly**: Botões e elementos otimizados para toque

## 🔧 Como Fazer Manutenção

### 📝 Editando Estilos
1. **Cores**: Edite `css/variables.css` para mudar toda a paleta
2. **Header**: Modifique `css/header.css` para navegação
3. **Botões**: Ajuste `css/buttons.css` para todos os CTAs
4. **Quiz**: Customize `css/quiz.css` para modal e perguntas

### ⚙️ Editando Funcionalidades
1. **Navegação**: Modifique `js/navigation.js`
2. **Quiz**: Edite perguntas em `js/quiz.js` na propriedade `data`
3. **Animações**: Ajuste `js/animations.js`
4. **FAQ**: Edite `js/utils.js` na função `setupFAQ()`

### 🔗 Links e URLs
- **Checkout**: Modifique `checkoutUrl` em `js/quiz.js`
- **Links CTA**: Busque por "hotmart.com" nos arquivos HTML/JS

## 📋 Guia de Edição Rápida

### 🎯 Alterar Perguntas do Quiz
```javascript
// Em js/quiz.js, linha ~10
data: [
    {
        question: "Sua nova pergunta aqui?",
        options: [
            "Opção A",
            "Opção B", 
            "Opção C",
            "Opção D"
        ]
    }
    // ... mais perguntas
]
```

### 🎨 Alterar Cores do Site
```css
/* Em css/variables.css */
:root {
    --primary-color: #SUA_COR_AQUI;   /* Cor principal */
    --secondary-color: #SUA_COR_AQUI; /* Cor secundária */
    --accent-color: #SUA_COR_AQUI;    /* Cor de destaque */
}
```

### 💰 Alterar Preços
```html
<!-- Em index.html, procure por: -->
<div class="valor-desconto">R$ 147</div>
<span class="parcela-valor">R$ 17,00</span>
<span class="total-text">ou R$ 147,00 à vista</span>
```

## 🚀 Performance

### ⚡ Otimizações Implementadas
- **Lazy Loading** para imagens
- **Debounce/Throttle** para eventos de scroll
- **CSS minificado** com variáveis
- **JavaScript modular** para carregamento sob demanda
- **Preload** de recursos críticos

### 📊 Métricas
- **JavaScript**: Reduzido de 1 arquivo grande para 5 módulos organizados
- **CSS**: Dividido em 7 arquivos temáticos para melhor manutenção
- **Carregamento**: Otimizado com preload e lazy loading

## 🛡️ Acessibilidade

### ♿ Recursos Implementados
- **Navegação por teclado** (Tab, Enter, Esc)
- **ARIA labels** em elementos interativos
- **Skip links** para navegação
- **Contraste adequado** em textos
- **Foco visível** em elementos

## 🧪 Testing

### ✅ Testes Recomendados
1. **Responsividade**: Teste em mobile, tablet e desktop
2. **Quiz**: Complete o quiz e teste o botão de checkout
3. **Navegação**: Teste menu mobile e links de âncora
4. **Imagens**: Verifique carregamento de imagens
5. **FAQ**: Teste abertura/fechamento dos itens

## 📞 Suporte

### 🐛 Resolução de Problemas Comuns

**Quiz não abre:**
- Verifique se todos os arquivos JS estão carregando
- Abra o console do navegador para ver erros

**Imagens não carregam:**
- Verifique se os arquivos existem na pasta
- Sistema de fallback está implementado

**Mobile não funciona:**
- Teste em dispositivo real
- Verifique viewport meta tag

**Botão de checkout não funciona:**
- Verifique URL em `js/quiz.js`
- Teste com bloqueador de popup desabilitado

## 📈 Próximas Melhorias

### 🔮 Funcionalidades Futuras
- [ ] Sistema de analytics avançado
- [ ] A/B testing para diferentes versões
- [ ] PWA (Progressive Web App)
- [ ] Otimização SEO avançada
- [ ] Sistema de cache inteligente

---

**Versão**: 2.0.0  
**Data**: 2025  
**Mantido por**: Equipe de Desenvolvimento
