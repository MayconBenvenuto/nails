# Instruções para Configurar GitHub Pages

## Passos para habilitar o GitHub Pages:

1. **Acesse seu repositório no GitHub:**
   - Vá para: https://github.com/MayconBenvenuto/nails

2. **Acesse as configurações:**
   - Clique na aba "Settings" (Configurações)

3. **Configure o GitHub Pages:**
   - Role para baixo até encontrar a seção "Pages" no menu lateral esquerdo
   - Clique em "Pages"

4. **Configure a fonte:**
   - Em "Source" (Fonte), selecione "GitHub Actions"
   - Isso permitirá que o GitHub Actions (já configurado) faça o deploy

5. **Configurar domínio personalizado (opcional):**
   - Se você tem um domínio personalizado, digite "naildesignerelite.com.br" em "Custom domain"
   - O arquivo CNAME já está configurado no repositório

6. **Aguarde o deploy:**
   - O primeiro deploy pode levar alguns minutos
   - Você pode acompanhar o progresso na aba "Actions" do repositório

## URLs do seu site:

- **GitHub Pages padrão:** https://mayconbenvenuto.github.io/nails/
- **Domínio personalizado:** https://naildesignerelite.com.br (quando configurado)

## Como verificar se está funcionando:

1. Vá para a aba "Actions" no GitHub
2. Verifique se o workflow "Deploy to GitHub Pages" está executando ou foi concluído
3. Se houver erro, clique no workflow para ver os detalhes

## Deploy automático:

Toda vez que você fizer um push para a branch `main`, o site será automaticamente atualizado no GitHub Pages através do GitHub Actions.

## Solução de problemas:

- Se o site não carregar, verifique se o GitHub Pages está habilitado
- Se as imagens não aparecem, pode ser um problema de CORS - as imagens de URLs externas devem carregar normalmente
- Se o domínio personalizado não funcionar, verifique se o DNS está configurado corretamente

## Configuração de DNS (para domínio personalizado):

Para que o domínio personalizado funcione, configure os seguintes registros DNS:

```
Tipo: CNAME
Nome: www
Valor: mayconbenvenuto.github.io

Tipo: A
Nome: @
Valores:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
