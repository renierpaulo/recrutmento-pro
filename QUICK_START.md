# 🚀 Guia de Início Rápido

## Passos para rodar o projeto

### 1. Configurar Variáveis de Ambiente

Edite o arquivo `.env` e adicione as seguintes variáveis:

```env
# NextAuth (OBRIGATÓRIO)
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (OBRIGATÓRIO para assinaturas)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_sua_chave"
STRIPE_SECRET_KEY="sk_test_sua_chave"
STRIPE_WEBHOOK_SECRET="whsec_seu_webhook"
```

**Gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Gerar Prisma Client

```bash
npx prisma generate
```

### 3. Criar o Banco de Dados

```bash
npx prisma db push
```

### 4. Iniciar o Servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📝 Próximos Passos

1. **Criar conta de candidato**
   - Acesse `/registro`
   - Escolha "Candidato"
   - Preencha seus dados

2. **Criar conta de empresa**
   - Acesse `/registro`
   - Escolha "Empresa"
   - Preencha os dados da empresa

3. **Publicar uma vaga (como empresa)**
   - Faça login
   - Acesse o Dashboard
   - Clique em "Criar Nova Vaga"

4. **Candidatar-se a uma vaga**
   - Faça login como candidato
   - Vá para "Vagas"
   - Escolha uma vaga e candidate-se

## ⚙️ Configuração do Stripe (Opcional)

Para testar pagamentos:

1. Crie uma conta em https://stripe.com
2. No Dashboard do Stripe:
   - Vá em **Developers > API Keys**
   - Copie a **Publishable key** e **Secret key**
   - Cole no arquivo `.env`

3. Criar produtos:
   - Acesse **Products**
   - Crie produtos: Básico (R$ 29), Profissional (R$ 99), Enterprise (R$ 299)
   - Para cada produto, crie um preço mensal recorrente
   - Copie os IDs dos preços (`price_xxx`)
   - Atualize em `app/assinatura/page.tsx`

## 🔍 Visualizar Banco de Dados

```bash
npx prisma studio
```

## 🐛 Problemas Comuns

### Erro: "NEXTAUTH_SECRET não está definido"
Solução: Adicione `NEXTAUTH_SECRET` no arquivo `.env`

### Erro de conexão com banco de dados
Solução: Execute `npx prisma db push` novamente

### Página em branco após login
Solução: Verifique se o `NEXTAUTH_URL` está correto no `.env`

## 📚 Documentação Completa

Veja o arquivo `README.md` para documentação detalhada.
