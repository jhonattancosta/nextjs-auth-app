import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // O middleware já protege esta rota; esta checagem é uma segunda camada.
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-zinc-100 p-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
          <SignOutButton />
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">
          Olá, <strong>{session.user.name ?? session.user.email}</strong>! Você está autenticado. 🎉
        </p>
        <pre className="mt-6 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-green-400">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </main>
  );
}
