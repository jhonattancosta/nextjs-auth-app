import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-100 p-8 text-center dark:bg-zinc-950">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Next.js + NextAuth</h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        Projeto de exemplo com TypeScript, Tailwind CSS e autenticação via NextAuth.
      </p>
      {session ? (
        <Link href="/dashboard" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
          Ir para o Dashboard
        </Link>
      ) : (
        <Link href="/login" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
          Fazer login
        </Link>
      )}
    </main>
  );
}
