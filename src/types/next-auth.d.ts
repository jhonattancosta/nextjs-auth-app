import type { DefaultSession } from "next-auth";

// Adiciona o campo "id" ao tipo do usuário da sessão.
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
