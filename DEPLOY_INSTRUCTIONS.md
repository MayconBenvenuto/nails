# Instruções para Configurar GitHub Pages

## ⚠️ SOLUCIONANDO ERRO 403

Se você recebeu erro 403 ao acessar o site, siga estes passos:

### Método 1: Configurar GitHub Pages Manualmente

1. **Acesse seu repositório no GitHub:**
   - Vá para: <https://github.com/MayconBenvenuto/nails>

2. **Acesse as configurações:**
   - Clique na aba "Settings" (Configurações)

3. **Configure o GitHub Pages:**
   - Role para baixo até encontrar a seção "Pages" no menu lateral esquerdo
   - Clique em "Pages"

4. **Configure a fonte:**
   - Em "Source" (Fonte), selecione "Deploy from a branch"
   - Em "Branch", selecione "gh-pages" (será criada automaticamente pelo GitHub Actions)
   - Deixe "/ (root)" selecionado
   - Clique em "Save"

### Método 2: Se o erro persistir

1. **Torne o repositório público:**
   - Vá para Settings > General
   - Role até o final da página
   - Clique em "Change repository visibility"
   - Selecione "Make public"

2. **Force um novo deploy:**
   - Faça um pequeno commit para forçar o GitHub Actions a executar novamente

## URLs do seu site

- **GitHub Pages padrão:** <https://mayconbenvenuto.github.io/nails/>
- **Domínio personalizado:** <https://naildesignerelite.com.br> (quando configurado)

## Como verificar se está funcionando

1. Vá para a aba "Actions" no GitHub
2. Verifique se o workflow "Deploy to GitHub Pages" foi executado com sucesso
3. Vá para Settings > Pages e verifique se mostra uma URL verde
4. Aguarde alguns minutos para propagação

## Deploy automático

Toda vez que você fizer um push para a branch `main`, o site será automaticamente atualizado no GitHub Pages através do GitHub Actions.

## Solução de problemas comuns

- **Erro 403:** Repositório pode estar privado ou GitHub Pages não habilitado
- **Erro 404:** Branch gh-pages não existe ou não foi configurada
- **Site não atualiza:** Aguarde até 10 minutos para propagação
- **Imagens não carregam:** URLs externas podem ter CORS, mas devem funcionar
- **Domínio personalizado não funciona:** Verifique configuração DNS

## Configuração de DNS (para domínio personalizado)

Para que o domínio personalizado funcione, configure os seguintes registros DNS:

```dns
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

## Status do Deploy

Você pode verificar o status do deploy em tempo real em:
<https://github.com/MayconBenvenuto/nails/actions>
