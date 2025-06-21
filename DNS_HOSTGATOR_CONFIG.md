# 🌐 Configuração DNS HostGator para GitHub Pages

## 📋 Configurações DNS Necessárias

### 🔧 **PASSO 1: Acessar o cPanel da HostGator**

1. **Faça login na HostGator:**
   - Acesse: https://www.hostgator.com.br/
   - Entre na sua conta
   - Acesse o cPanel

2. **Encontre a seção "Domínios":**
   - Procure por "Zone Editor" ou "Editor de Zona DNS"
   - Ou "Advanced DNS Zone Editor"

### 🔧 **PASSO 2: Configurar os Registros DNS**

Adicione/modifique os seguintes registros:

#### **Registro A (para domínio principal):**
```
Tipo: A
Nome: @ (ou deixe em branco)
Valor/Aponta para: 185.199.108.153
TTL: 14400 (ou deixe padrão)
```

#### **Registros A adicionais (adicione todos):**
```
Tipo: A
Nome: @
Valor: 185.199.109.153

Tipo: A  
Nome: @
Valor: 185.199.110.153

Tipo: A
Nome: @
Valor: 185.199.111.153
```

#### **Registro CNAME (para www):**
```
Tipo: CNAME
Nome: www
Valor: mayconbenvenuto.github.io
TTL: 14400
```

### 🔧 **PASSO 3: Remover registros conflitantes**

**⚠️ IMPORTANTE:** Remova qualquer registro A existente que aponte para IPs da HostGator (geralmente começam com números diferentes).

### 🔧 **PASSO 4: Aguardar Propagação**

- **Tempo:** 24-48 horas (pode ser mais rápido)
- **Verificar:** Use https://www.whatsmydns.net/ para verificar a propagação

### 🔧 **PASSO 5: Configurar no GitHub**

1. **Vá para:** https://github.com/MayconBenvenuto/nails/settings/pages
2. **Em "Custom domain":** Digite `naildesignerelite.com.br`
3. **Marque:** "Enforce HTTPS" (após a propagação DNS)
4. **Clique:** Save

---

## 🆘 Solução de Problemas

### **Se não encontrar Zone Editor:**
- Procure por "DNS Management"
- Ou "Gerenciar DNS" 
- Ou entre em contato com suporte HostGator

### **Se der erro de propagação:**
- Aguarde mais tempo (até 48h)
- Limpe cache DNS: `ipconfig /flushdns` (Windows)
- Teste em diferentes redes/dispositivos

### **Se o site não carregar:**
- Verifique se o GitHub Pages está ativo
- Teste primeiro: https://mayconbenvenuto.github.io/nails/
- Depois teste: https://naildesignerelite.com.br

---

## 📞 Suporte HostGator

Se tiver dificuldades, entre em contato:
- **Chat:** Disponível no painel da HostGator
- **Telefone:** 0800 042 4242
- **Email:** Através do painel de suporte

**Diga que precisa:** "Configurar registros DNS para apontar domínio para GitHub Pages"

---

## ✅ Verificação Final

Após configurar, teste:

1. **https://naildesignerelite.com.br** 
2. **https://www.naildesignerelite.com.br**
3. **http://naildesignerelite.com.br** (deve redirecionar para HTTPS)

---

**💡 DICA:** A HostGator às vezes demora um pouco para aplicar mudanças DNS. Se não funcionar imediatamente, aguarde algumas horas e teste novamente.
