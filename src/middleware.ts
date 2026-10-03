import { withAuth } from "next-auth/middleware";

// Rotas que exigem login: quem não estiver logado vai para /login.
// (/account/create continua pública, pois o matcher pega só "/account" exato.)
export default withAuth({ pages: { signIn: "/login" } });

export const config = {
  matcher: ["/account", "/dashboard"],
};
