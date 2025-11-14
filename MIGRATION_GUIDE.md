# Guia de Migração - Sine Santa Maria

Este guia explica como aplicar as novas mudanças ao banco de dados após a atualização do projeto.

## Mudanças Realizadas

### 1. Renomeação do Projeto
- O projeto foi renomeado de "Recrutamento Pro" para "Sine Santa Maria"
- Atualizações em:
  - `package.json`
  - `README.md`
  - `app/layout.tsx` (metadata)
  - `components/navbar.tsx`
  - `app/page.tsx`

### 2. Nova Funcionalidade: Mão de Obra Especializada

Adicionamos um sistema completo para contratação de mão de obra especializada com:

#### Novos Modelos no Banco de Dados

**ServiceProvider** - Profissionais que oferecem serviços
- Categorias: Pedreiro, Faxineira, Garçom, Encanador, Pintor, Jardineiro, Eletricista, Carpinteiro, Mecânico, Cozinheiro
- Informações: descrição, taxa por hora, anos de experiência, localização, telefone
- Avaliações: rating, total de trabalhos realizados
- Extras: portfólio, certificações

**ServiceRequest** - Solicitações de serviço de clientes
- Informações do cliente e detalhes do serviço
- Status de acompanhamento
- Data preferencial e orçamento

#### Novas Páginas
- `/servicos` - Lista de profissionais disponíveis
- `/servicos/[id]` - Perfil do profissional e formulário de solicitação
- `/servicos/cadastrar` - Cadastro de novos profissionais

#### Novas APIs
- `GET/POST /api/service-providers` - Listar e criar profissionais
- `GET/PATCH/DELETE /api/service-providers/[id]` - Gerenciar profissional específico
- `GET/POST /api/service-requests` - Listar e criar solicitações
- `GET/PATCH/DELETE /api/service-requests/[id]` - Gerenciar solicitação específica

## Passos para Migração

### 1. Gerar o Cliente Prisma

```bash
npx prisma generate
```

Este comando irá gerar os tipos TypeScript para os novos modelos.

### 2. Criar e Aplicar a Migração

```bash
npx prisma migrate dev --name add-specialized-labor-services
```

Este comando irá:
- Criar as novas tabelas `service_providers` e `service_requests`
- Adicionar os novos enums ao banco de dados
- Aplicar as mudanças automaticamente

### 3. (Opcional) Popular com Dados de Teste

Se quiser adicionar alguns profissionais de teste para desenvolvimento:

```bash
npx prisma db seed
```

Ou você pode usar o Prisma Studio para adicionar dados manualmente:

```bash
npx prisma studio
```

### 4. Verificar as Mudanças

Após a migração, você pode verificar as tabelas criadas:

```bash
npx prisma studio
```

## Estrutura das Novas Tabelas

### service_providers
```
- id (String, CUID)
- userId (String)
- category (ServiceCategory enum)
- description (Text)
- hourlyRate (Decimal)
- experienceYears (Int)
- location (String)
- phone (String)
- available (Boolean)
- rating (Decimal)
- totalJobs (Int)
- portfolio (String[])
- certifications (String[])
- createdAt (DateTime)
- updatedAt (DateTime)
```

### service_requests
```
- id (String, CUID)
- serviceProviderId (String)
- clientName (String)
- clientEmail (String)
- clientPhone (String)
- description (Text)
- location (String)
- preferredDate (DateTime)
- budget (Decimal)
- status (ServiceRequestStatus enum)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## Problemas Comuns

### Erro: "Property 'serviceProvider' does not exist"
**Solução**: Execute `npx prisma generate` para gerar os tipos TypeScript.

### Erro na Migração
**Solução**: 
1. Verifique se o banco de dados está rodando
2. Confira a `DATABASE_URL` no `.env`
3. Se necessário, use `npx prisma migrate reset` (⚠️ isso apagará todos os dados)

### Tabelas não aparecem
**Solução**: Execute `npx prisma db push` para sincronizar o schema com o banco de dados.

## Próximos Passos

Após a migração bem-sucedida:

1. ✅ Inicie o servidor de desenvolvimento: `npm run dev`
2. ✅ Acesse a página de serviços: `http://localhost:3000/servicos`
3. ✅ Teste o cadastro de profissionais
4. ✅ Teste a solicitação de serviços

## Suporte

Se encontrar problemas durante a migração, verifique:
- [Documentação do Prisma](https://www.prisma.io/docs)
- Arquivo `prisma/schema.prisma`
- Logs do console durante a migração
