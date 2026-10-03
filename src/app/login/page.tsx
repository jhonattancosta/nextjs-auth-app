import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, isGitHubEnabled } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Login" };

export default async function LoginPage() {
  // Se já estiver logado, não faz sentido mostrar o login.
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4 dark:bg-zinc-950">
      <Suspense>
        <LoginForm githubEnabled={isGitHubEnabled} />
      </Suspense>
    </main>
  );
}
