"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { buttonClass, buttonSecondaryClass, inputClass, labelClass, linkClass } from "@/components/ui/styles";

export default function LoginForm({ githubEnabled }: { githubEnabled: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";
  const justCreated = searchParams.get("created") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") ? "Não foi possível entrar. Tente novamente." : null,
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    setLoading(false);

    if (!res || res.error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    router.push(res.url ?? callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm">
      {justCreated && (
        <p className="mb-4 rounded border border-emerald-700 bg-emerald-100 px-3 py-2 text-sm text-emerald-900">
          Conta criada com sucesso! Agora é só entrar.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className={labelClass}>E-mail</label>
          <input id="email" type="email" required autoComplete="email" value={email}
            onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>Senha</label>
          <input id="password" type="password" required autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </div>

        {error && <p className="rounded border border-red-700 bg-red-100 px-3 py-2 text-sm text-red-800">{error}</p>}

        <button type="submit" disabled={loading} className={`${buttonClass} w-full`}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {githubEnabled && (
        <button onClick={() => signIn("github", { callbackUrl })} className={`${buttonSecondaryClass} mt-3 w-full`}>
          Entrar com GitHub
        </button>
      )}

      <p className="mt-5 text-center text-sm">
        Ainda não tem conta?{" "}
        <Link href="/account/create" className={linkClass}>Crie uma agora</Link>
      </p>
    </div>
  );
}
