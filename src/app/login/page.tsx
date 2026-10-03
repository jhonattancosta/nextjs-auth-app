import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, isGitHubEnabled } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";
import Box from "@/components/ui/Box";

export const metadata = { title: "Entrar" };

export default async function LoginPage() {
  // Se já estiver logado, não faz sentido mostrar o login.
  const session = await getServerSession(authOptions);
  if (session) redirect("/account");

  return (
    <Box title="Entrar na conta">
      <Suspense>
        <LoginForm githubEnabled={isGitHubEnabled} />
      </Suspense>
    </Box>
  );
}
