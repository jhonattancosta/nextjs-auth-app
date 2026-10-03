# JhowOT — site de servidor de Tibia (Next.js + Tailwind + NextAuth)

Site para um servidor OT de Tibia, inspirado no layout clássico dos sites de OT (menu à esquerda, notícias no centro, caixas de login/status/ranking à direita). Feito com **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4** e **NextAuth.js v4**.

> "JhowOT" é um nome provisório. Troque o nome, o IP, as rates e o status em **`src/config/site.ts`** e o site inteiro é atualizado.

## ✨ Páginas

| Rota | O que tem |
| --- | --- |
| `/news` | Página inicial: tabela "Últimas atualizações" + notícia em destaque |
| `/news/[slug]` | Notícia completa |
| `/changelog` | Lista de mudanças (novo / ajuste / correção) |
| `/login` | Login com e-mail e senha (NextAuth) |
| `/account/create` | Criar conta + primeiro personagem (nome, vocação, sexo) |
| `/account` | Minha conta (protegida) com a lista de personagens |
| `/highscores` | Ranking por experiência, magic level e skills, com filtro por vocação |
| `/characters` | Busca de personagem + personagens mais recentes |
| `/characters/[nome]` | Ficha do personagem (informações e skills) |

---

## 🚀 Como rodar

Pré-requisito: **Node.js 18.18+** (recomendado 20 LTS ou mais novo).

```bash
npm install
# crie o .env.local a partir do modelo (Windows: Copy-Item .env.example .env.local)
cp .env.example .env.local
npx auth secret      # cole o valor em NEXTAUTH_SECRET no .env.local
npm run dev
```

Acesse <http://localhost:3000>. Crie uma conta em **Criar conta** ou entre com a conta demo definida em `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD`.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (também checa tipos e lint) |
| `npm start` | Roda o build de produção |
| `npm run lint` | ESLint |

---

## 🛠️ O que foi feito (passo a passo)

### 1. Base do projeto
Estrutura equivalente a `npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir`, com `next-auth` instalado.

### 2. Visual (Tailwind v4)
- **`src/app/globals.css`** define as cores do tema com `@theme` (`ink`, `wood`, `gold`, `parchment`, `blood`...), então dá para usar classes como `bg-parchment`, `text-gold-light`, `border-gold/40`.
- A fonte de títulos é a **Cinzel** (Google Fonts via `next/font`), exposta como `font-display`.
- **`src/components/ui/Box.tsx`** é a moldura padrão (cabeçalho dourado + corpo pergaminho) usada em todas as páginas.
- **`src/components/ui/styles.ts`** guarda as classes de inputs, botões e tabelas, para manter tudo consistente.

### 3. Layout de 3 colunas — `src/app/layout.tsx`
- **`Header`**: barra de status (online, jogadores, mundo) + logo em texto.
- **`LeftMenu`**: menu por seções (Notícias, Conta, Comunidade), destaca a página atual e vira um botão "☰ Menu" no celular.
- **`RightSidebar`**: caixa de login/conta (lê a sessão no servidor), status do servidor com rates e top 5 de level.
- **`Footer`**: mapa do site + aviso de que é um projeto independente.
- Os links do menu ficam em **`src/components/layout/menu.ts`**.

### 4. Conteúdo
- **`src/data/news.ts`**: notícias (para publicar uma nova, adicione um objeto na lista). Categorias: Eventos, Guias, Atualizações, Comunidade.
- **`src/data/changelog.ts`**: entradas do changelog.
- **`src/data/players.ts`**: tipos de personagem, fórmula de experiência do Tibia e **30 personagens de exemplo** gerados de forma fixa, para o ranking ter conteúdo.

### 5. Contas e autenticação
- **`src/lib/store.ts`**: "banco" simples em arquivo JSON (`.data/db.json`, fora do Git). As senhas são salvas com **hash scrypt** (nativo do Node, sem bibliotecas extras).
- **`src/lib/auth.ts`**: o NextAuth (Credentials) valida primeiro as contas criadas pelo site e depois a conta demo do `.env`. O GitHub continua opcional.
- **`src/app/account/create/`**: formulário com **Server Action** (`actions.ts`) que valida e-mail, senha (mín. 8), nome do personagem (único), vocação e sexo, cria a conta e o primeiro personagem (level 8) e redireciona para o login.
- **`src/middleware.ts`**: protege `/account` (quem não está logado vai para `/login`).

### 6. Comunidade
- **`src/lib/characters.ts`**: junta os personagens de exemplo com os criados pelo site, faz a busca por nome e monta o ranking.
- **`/highscores`** usa um formulário GET, então os filtros ficam na URL (`?category=magic&vocation=Druid`) e funcionam sem JavaScript.

---

## ⚠️ Limitações desta primeira versão

- **As contas ficam em um arquivo JSON.** Localmente funciona normal. **Na Vercel o disco é temporário**, então as contas criadas lá podem sumir quando o servidor reinicia. Isso serve para testar, mas para produção é preciso um banco de verdade.
- **Status do servidor, rates e os 30 personagens são dados de exemplo.**
- **Próximo passo natural:** ligar o site ao **MySQL do servidor Canary** (tabelas `accounts` e `players`), trocando `src/lib/store.ts` e `src/lib/characters.ts`. As páginas não precisam mudar.

---

## ☁️ Deploy na Vercel

1. Faça commit e `git push`. A Vercel publica sozinha.
2. Em **Settings → Environment Variables**, deixe configurados `NEXTAUTH_SECRET`, `DEMO_USER_EMAIL` e `DEMO_USER_PASSWORD`.
3. Usando domínio próprio, adicione também `NEXTAUTH_URL=https://seu-dominio` e faça **Redeploy**.

## 🔐 Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXTAUTH_SECRET` | Sim | Segredo do JWT da sessão |
| `NEXTAUTH_URL` | Local / domínio próprio | URL base do site |
| `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD` | Não | Conta de demonstração |
| `GITHUB_ID` / `GITHUB_SECRET` | Não | Ativa o login com GitHub |
| `DATA_DIR` | Não | Pasta onde o `db.json` é salvo (padrão `.data/`) |

## 📁 Estrutura

```
src/
├── config/site.ts            # nome, IP, rates, status
├── data/                     # notícias, changelog, personagens de exemplo
├── lib/                      # auth, store (contas), characters (ranking), format
├── middleware.ts             # protege /account
├── components/
│   ├── layout/               # Header, LeftMenu, RightSidebar, Footer, menu
│   ├── ui/                   # Box, Badge, classes compartilhadas
│   ├── LoginForm.tsx, NewsContent.tsx, SignOutButton.tsx, Providers.tsx
└── app/
    ├── news/, changelog/, login/, account/, account/create/
    ├── highscores/, characters/, characters/[name]/
    └── api/auth/[...nextauth]/route.ts
```
