# 💼 Sine Santa Maria

Plataforma completa de recrutamento e contratação de mão de obra especializada que conecta empresas, profissionais e serviços através de um sistema de assinaturas.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **NextAuth.js** - Autenticação
- **Stripe** - Pagamentos e assinaturas
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI modernos

## ✨ Funcionalidades

### Para Candidatos
- ✅ Criar perfil profissional completo
- ✅ Buscar vagas por título, localização e tipo
- ✅ Candidatar-se a vagas com carta de apresentação
- ✅ Acompanhar status das candidaturas
- ✅ Adicionar experiências e educação
- ✅ Sistema de assinaturas com diferentes planos

### Para Empresas
- ✅ Criar perfil da empresa
- ✅ Publicar vagas ilimitadas
- ✅ Gerenciar candidaturas recebidas
- ✅ Filtrar candidatos por status
- ✅ Dashboard com métricas
- ✅ Sistema de assinaturas empresariais

### Mão de Obra Especializada 🆕
- 🔨 Contratar profissionais especializados
- 👷 Categorias: Pedreiro, Faxineira, Garçom, Encanador, Pintor, Jardineiro, Eletricista, Carpinteiro, Mecânico, Cozinheiro
- ⭐ Sistema de avaliações e portfólio
- 📞 Solicitação de orçamento direta
- 💼 Cadastro de profissionais autônomos
- 📍 Busca por localização e categoria

### Sistema de Assinaturas
- 💳 Integração completa com Stripe
- 📊 Diferentes planos (Básico, Profissional, Enterprise)
- 🔄 Gerenciamento de assinaturas
- 🎯 Período de teste de 7 dias

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- Conta no Stripe (para pagamentos)

## 🔧 Instalação

1. **Clone o repositório** (se aplicável)
```bash
git clone <url-do-repositorio>
cd recrutamento-pro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/recrutamento_pro?schema=public"

# NextAuth
NEXTAUTH_SECRET="gere-uma-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_sua_chave_publica"
STRIPE_SECRET_KEY="sk_test_sua_chave_secreta"
STRIPE_WEBHOOK_SECRET="whsec_seu_webhook_secret"
```

**Para gerar o NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

4. **Configure o banco de dados**

Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

```bash
createdb recrutamento_pro
```

5. **Execute as migrations do Prisma**

```bash
npx prisma migrate dev --name init
```

6. **Gere o Prisma Client**

```bash
npx prisma generate
```

## 🏃‍♂️ Executando o projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Modo de Produção

```bash
npm run build
npm start
```

## 🗄️ Banco de Dados

### Visualizar dados com Prisma Studio

```bash
npx prisma studio
```

### Criar uma nova migration

```bash
npx prisma migrate dev --name nome_da_migration
```

### Resetar o banco de dados

```bash
npx prisma migrate reset
```

## 💳 Configuração do Stripe

1. **Crie uma conta no Stripe**: https://stripe.com

2. **Obtenha suas chaves de API**
   - Acesse o Dashboard do Stripe
   - Vá em Developers > API Keys
   - Copie a `Publishable key` e `Secret key`

3. **Crie os produtos e preços**
   - Acesse Products no dashboard
   - Crie 3 produtos (Básico, Profissional, Enterprise)
   - Para cada produto, crie um preço mensal
   - Copie os IDs dos preços (`price_xxx`) e atualize em `app/assinatura/page.tsx`

4. **Configure o Webhook** (para produção)
   - Acesse Developers > Webhooks
   - Adicione um endpoint: `https://seu-dominio.com/api/webhooks/stripe`
   - Selecione os eventos: `checkout.session.completed`, `customer.subscription.updated`
   - Copie o `Signing secret`

## 📁 Estrutura do Projeto

```
sine-santa-maira/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/               # Autenticação
│   │   ├── jobs/               # Vagas
│   │   ├── applications/       # Candidaturas
│   │   ├── subscription/       # Assinaturas
│   │   ├── service-providers/  # Profissionais (novo)
│   │   └── service-requests/   # Solicitações de serviço (novo)
│   ├── dashboard/              # Dashboard do usuário
│   ├── login/                  # Página de login
│   ├── registro/               # Página de registro
│   ├── vagas/                  # Listagem e detalhes de vagas
│   ├── assinatura/             # Página de assinaturas
│   ├── servicos/               # Mão de obra especializada (novo)
│   │   ├── [id]/               # Perfil do profissional
│   │   ├── cadastrar/          # Cadastro de profissionais
│   │   └── page.tsx            # Listagem de profissionais
│   └── layout.tsx              # Layout principal
├── components/
│   ├── ui/                     # Componentes UI (shadcn)
│   ├── navbar.tsx              # Barra de navegação
│   └── providers.tsx           # Providers (Auth, etc)
├── lib/
│   ├── auth.ts                 # Configuração NextAuth
│   ├── prisma.ts               # Cliente Prisma
│   ├── stripe.ts               # Cliente Stripe
│   └── utils.ts                # Funções utilitárias
├── prisma/
│   └── schema.prisma           # Schema do banco de dados
└── public/                     # Arquivos estáticos
```

## 🔐 Autenticação

O sistema usa NextAuth.js com Credentials Provider:

- **Registro**: `/api/auth/register`
- **Login**: `/api/auth/login`
- **Logout**: Através do `signOut()` do NextAuth

## 🎨 Componentes UI

Componentes customizados baseados em shadcn/ui:
- Button
- Input
- Card
- Badge
- Avatar
- Label

Para adicionar novos componentes shadcn:
```bash
npx shadcn-ui@latest add [componente]
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte seu repositório no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy!

### Railway / Render

1. Configure o banco de dados PostgreSQL
2. Configure as variáveis de ambiente
3. Configure o build command: `npm run build`
4. Configure o start command: `npm start`

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | URL de conexão do PostgreSQL | ✅ |
| `NEXTAUTH_SECRET` | Chave secreta para NextAuth | ✅ |
| `NEXTAUTH_URL` | URL base da aplicação | ✅ |
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública do Stripe | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook Stripe | Produção |

## 🧪 Testando

1. **Criar um usuário candidato**
   - Acesse `/registro`
   - Selecione "Candidato"
   - Preencha os dados

2. **Criar um usuário empresa**
   - Acesse `/registro`
   - Selecione "Empresa"
   - Preencha os dados

3. **Criar uma vaga**
   - Faça login como empresa
   - Acesse o dashboard
   - Clique em "Criar Nova Vaga"

4. **Candidatar-se a uma vaga**
   - Faça login como candidato
   - Acesse "Vagas"
   - Clique em uma vaga e candidate-se

5. **Cadastrar-se como profissional (novo)** 🆕
   - Acesse `/servicos`
   - Clique em "Cadastrar-se como Profissional"
   - Preencha seus dados profissionais
   - Escolha sua categoria de serviço

6. **Solicitar mão de obra (novo)** 🆕
   - Acesse `/servicos`
   - Navegue pelos profissionais disponíveis
   - Clique em "Ver Perfil e Solicitar"
   - Preencha o formulário de solicitação

## 🐛 Troubleshooting

### Erro de conexão com o banco
- Verifique se o PostgreSQL está rodando
- Confira a `DATABASE_URL` no `.env`
- Tente `npx prisma db push` para sincronizar o schema

### Erro no NextAuth
- Certifique-se de que o `NEXTAUTH_SECRET` está definido
- Verifique se a `NEXTAUTH_URL` está correta

### Erro no Stripe
- Verifique se as chaves do Stripe estão corretas
- Certifique-se de estar usando chaves de teste durante desenvolvimento
- Atualize os `priceId` em `app/assinatura/page.tsx` com seus IDs reais

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação NextAuth](https://next-auth.js.org)
- [Documentação Stripe](https://stripe.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 📄 Licença

Este projeto foi criado para fins educacionais e comerciais.

## 👨‍💻 Suporte

Para dúvidas e suporte, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
