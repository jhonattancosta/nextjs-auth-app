# Next.js + TypeScript + Tailwind CSS + NextAuth

Projeto de exemplo com **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** e autenticação com **NextAuth.js v4**, incluindo uma página de login personalizada e uma rota protegida (`/dashboard`).

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- **Node.js 18.18 ou superior** (recomendado: 20 LTS ou mais recente) — confira com `node -v`
- **npm** (já vem com o Node)

### Passo a passo

1. **Entre na pasta do projeto**

   ```bash
   cd nextjs-auth-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie o arquivo `.env.local` a partir do modelo `.env.example`:

   ```bash
   # Linux/macOS
   cp .env.example .env.local
   # Windows (PowerShell)
   Copy-Item .env.example .env.local
   ```

   Depois, gere um segredo e cole em `NEXTAUTH_SECRET`:

   ```bash
   npx auth secret        # ou: openssl rand -base64 32
   ```

4. **Rode em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse** [http://localhost:3000](http://localhost:3000) e clique em **Fazer login**.

   Credenciais de demonstração (definidas no `.env.local`):

   | E-mail              | Senha    |
   | ------------------- | -------- |
   | `admin@exemplo.com` | `123456` |

### Outros comandos

| Comando         | O que faz                                   |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Servidor de desenvolvimento (hot reload)    |
| `npm run build` | Gera a versão otimizada para produção       |
| `npm start`     | Roda a versão de produção (após o `build`)  |
| `npm run lint`  | Verifica o código com ESLint                |

---

## 🛠️ O que foi feito (passo a passo)

### 1. Criação do projeto Next.js com TypeScript e Tailwind

A estrutura é a mesma que o comando abaixo gera (com TypeScript, Tailwind, ESLint, App Router e pasta `src/`):

```bash
npx create-next-app@latest nextjs-auth-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Arquivos de configuração criados:

- **`package.json`** — dependências e scripts (`dev`, `build`, `start`, `lint`).
- **`tsconfig.json`** — configuração do TypeScript, com o atalho `@/*` apontando para `src/*`.
- **`next.config.ts`** — configuração do Next.js.
- **`postcss.config.mjs`** — ativa o plugin `@tailwindcss/postcss` (Tailwind v4).
- **`src/app/globals.css`** — importa o Tailwind com `@import "tailwindcss";`.
- **`eslint.config.mjs`** — regras do ESLint do Next.

### 2. Instalação do NextAuth

```bash
npm install next-auth
```

### 3. Configuração central da autenticação — `src/lib/auth.ts`

Exporta o objeto `authOptions` com:

- **Credentials Provider** (login com e-mail e senha). Para fins de demonstração, valida contra o usuário definido em `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD`. Em um projeto real, você buscaria o usuário em um banco de dados e compararia a senha com um hash (ex.: `bcrypt`).
- **GitHub Provider (opcional)** — só é ativado se `GITHUB_ID` e `GITHUB_SECRET` estiverem preenchidos. Quando ativo, aparece o botão "Entrar com GitHub" na tela de login.
- **Sessão via JWT** (`session: { strategy: "jwt" }`) — não precisa de banco de dados.
- **`pages.signIn: "/login"`** — troca a página padrão do NextAuth pela nossa página personalizada.
- **Callbacks `jwt` e `session`** — copiam o `id` do usuário para o token e para a sessão.

### 4. Rota da API — `src/app/api/auth/[...nextauth]/route.ts`

Cria o handler do NextAuth e o exporta como `GET` e `POST`. Essa rota "catch-all" atende a todos os endpoints de autenticação (`/api/auth/signin`, `/api/auth/callback/...`, `/api/auth/session`, `/api/auth/signout` etc.).

### 5. Tipagem — `src/types/next-auth.d.ts`

Estende os tipos `Session` e `JWT` do NextAuth para incluir o campo `id`, assim o TypeScript reconhece `session.user.id`.

### 6. SessionProvider — `src/components/Providers.tsx` + `src/app/layout.tsx`

O `SessionProvider` envolve toda a aplicação no `layout.tsx`, permitindo usar `useSession()`, `signIn()` e `signOut()` nos componentes do lado do cliente.

### 7. Página de login — `src/app/login/page.tsx` + `src/components/LoginForm.tsx`

- A página (Server Component) verifica se o usuário já está logado e, se estiver, redireciona para `/dashboard`.
- O formulário (Client Component) chama `signIn("credentials", { redirect: false })`, mostra mensagem de erro em caso de falha e, em caso de sucesso, redireciona para a página que o usuário tentou acessar (`callbackUrl`) ou para `/dashboard`.
- Estilizado com Tailwind, com suporte a modo escuro.

### 8. Proteção de rotas — `src/middleware.ts`

Usa o middleware do NextAuth para bloquear as rotas em `matcher` (`/dashboard/*`). Quem não estiver autenticado é redirecionado para `/login`. Para proteger outras rotas, basta adicioná-las ao `matcher`:

```ts
export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*"],
};
```

### 9. Página protegida — `src/app/dashboard/page.tsx`

Lê a sessão no servidor com `getServerSession(authOptions)`, mostra o nome do usuário, os dados da sessão e um botão **Sair** (`src/components/SignOutButton.tsx`, que chama `signOut()`).

### 10. Página inicial — `src/app/page.tsx`

Mostra o botão "Fazer login" ou "Ir para o Dashboard", dependendo se o usuário está logado.

---

## 📁 Estrutura de pastas

```
nextjs-auth-app/
├── .env.example                 # modelo das variáveis de ambiente
├── .env.local                   # suas variáveis (você cria; não vai para o Git)
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── src/
    ├── middleware.ts            # protege /dashboard
    ├── app/
    │   ├── layout.tsx           # layout raiz + SessionProvider
    │   ├── globals.css          # Tailwind
    │   ├── page.tsx             # página inicial
    │   ├── login/page.tsx       # página de login
    │   ├── dashboard/page.tsx   # página protegida
    │   └── api/auth/[...nextauth]/route.ts   # endpoints do NextAuth
    ├── components/
    │   ├── LoginForm.tsx
    │   ├── Providers.tsx
    │   └── SignOutButton.tsx
    ├── lib/
    │   └── auth.ts              # authOptions (providers, callbacks...)
    └── types/
        └── next-auth.d.ts       # tipagem extra da sessão
```

---

## 🔐 Variáveis de ambiente

| Variável             | Obrigatória | Descrição                                                       |
| -------------------- | ----------- | --------------------------------------------------------------- |
| `NEXTAUTH_URL`       | Sim         | URL base do app (`http://localhost:3000` em desenvolvimento)    |
| `NEXTAUTH_SECRET`    | Sim         | Segredo para assinar o JWT da sessão                            |
| `DEMO_USER_EMAIL`    | Sim         | E-mail do usuário de demonstração                               |
| `DEMO_USER_PASSWORD` | Sim         | Senha do usuário de demonstração                                |
| `GITHUB_ID`          | Não         | Client ID do OAuth App do GitHub                                |
| `GITHUB_SECRET`      | Não         | Client Secret do OAuth App do GitHub                            |

### Ativando o login com GitHub (opcional)

1. Acesse <https://github.com/settings/developers> → **New OAuth App**.
2. **Homepage URL:** `http://localhost:3000`
3. **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Copie o **Client ID** e gere um **Client Secret**; cole em `GITHUB_ID` e `GITHUB_SECRET` no `.env.local`.
5. Reinicie o `npm run dev`. O botão "Entrar com GitHub" aparece na tela de login.

---

## ☁️ Deploy na Vercel (teste gratuito)

1. **Suba o código para o GitHub** (crie antes um repositório vazio em <https://github.com/new>):

   ```bash
   git init
   git add .
   git commit -m "primeiro commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/nextjs-auth-app.git
   git push -u origin main
   ```

   O `.gitignore` já impede que `node_modules`, `.next` e `.env.local` sejam enviados.

2. Entre em <https://vercel.com> com a conta do GitHub → **Add New… → Project** → importe o repositório `nextjs-auth-app`.
3. Antes de clicar em **Deploy**, abra **Environment Variables** e cadastre:

   | Nome                 | Valor                                   |
   | -------------------- | --------------------------------------- |
   | `NEXTAUTH_SECRET`    | um segredo novo (`npx auth secret`)     |
   | `DEMO_USER_EMAIL`    | o e-mail de teste                       |
   | `DEMO_USER_PASSWORD` | uma senha diferente de `123456`         |

   `NEXTAUTH_URL` **não é necessário** na Vercel — o NextAuth detecta a URL sozinho.
4. Clique em **Deploy**. Em ~1 minuto o app estará em `https://nextjs-auth-app-xxxx.vercel.app`.
5. A cada `git push` na branch `main`, a Vercel publica a nova versão automaticamente.
   Se mudar alguma variável de ambiente, vá em **Deployments → ⋯ → Redeploy** para ela valer.

---

## ➡️ Próximos passos sugeridos

- Trocar o usuário fixo por um **banco de dados** (ex.: Prisma + PostgreSQL/SQLite) com senhas em hash usando `bcrypt`.
- Adicionar uma página de **cadastro** de usuários.
- Adicionar outros provedores (Google, Discord...) — a lista completa está em <https://next-auth.js.org/providers/>.
- Fazer o deploy na **Vercel**, configurando as variáveis de ambiente no painel (com `NEXTAUTH_URL` apontando para o domínio de produção).

## 🧯 Problemas comuns

- **`[next-auth][error][NO_SECRET]`** → `NEXTAUTH_SECRET` não está definido no `.env.local`.
- **Login não funciona / "E-mail ou senha inválidos"** → confira `DEMO_USER_EMAIL` e `DEMO_USER_PASSWORD` e reinicie o servidor após editar o `.env.local`.
- **Erro de callback no GitHub** → a URL de callback do OAuth App precisa ser exatamente `http://localhost:3000/api/auth/callback/github`.
