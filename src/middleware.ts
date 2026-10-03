// Protege as rotas listadas em "matcher": quem não estiver logado
// é redirecionado para /login (definido em pages.signIn).
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};
