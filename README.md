# Nail Designer Elite - Landing Page

## Descrição

Landing page profissional para curso de nail design com funcionalidades interativas incluindo quiz, animações e design responsivo.

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
