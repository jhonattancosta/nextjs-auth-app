import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

/**
 * Configuração central do NextAuth.
 * É usada pela rota /api/auth/[...nextauth] e por getServerSession().
 */
const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "E-mail e senha",
    credentials: {
      email: { label: "E-mail", type: "email" },
      password: { label: "Senha", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      // DEMO: valida contra um usuário fixo definido no .env.local.
      // Em um projeto real, busque o usuário no banco de dados e
      // compare a senha com um hash (ex.: bcrypt).
      const isValid =
        credentials.email === process.env.DEMO_USER_EMAIL &&
        credentials.password === process.env.DEMO_USER_PASSWORD;

      if (!isValid) return null;

      return { id: "1", name: "Usuário Demo", email: credentials.email };
    },
  }),
];

// O login com GitHub só é ativado se as variáveis estiverem preenchidas.
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // usa nossa página de login personalizada
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const isGitHubEnabled = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);
