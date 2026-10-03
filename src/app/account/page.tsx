import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findAccountById } from "@/lib/store";
import { getCharactersByAccount } from "@/lib/characters";
import { characterUrl, formatDate } from "@/lib/format";
import Box from "@/components/ui/Box";
import { linkClass, tableClass, tdClass, thClass } from "@/components/ui/styles";

export const metadata = { title: "Minha conta" };

export default async function AccountPage() {
  // O middleware já protege esta rota; esta checagem é uma segunda camada.
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const account = await findAccountById(session.user.id);
  const characters = account ? await getCharactersByAccount(account.id) : [];

  return (
    <>
      <Box title="Minha conta">
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[160px_1fr]">
          <dt className="font-semibold">E-mail</dt>
          <dd className="break-all">{session.user.email}</dd>
          <dt className="font-semibold">Tipo de conta</dt>
          <dd>{account && account.premiumDays > 0 ? `Premium (${account.premiumDays} dias)` : "Free Account"}</dd>
          <dt className="font-semibold">Criada em</dt>
          <dd>{account ? formatDate(account.createdAt) : "—"}</dd>
        </dl>
        {!account && (
          <p className="mt-4 rounded border border-amber-700 bg-amber-100 px-3 py-2 text-sm text-amber-900">
            Você entrou com a conta de demonstração, que não tem personagens. Crie uma conta de verdade em{" "}
            <Link href="/account/create" className={linkClass}>Criar conta</Link>.
          </p>
        )}
      </Box>

      {account && (
        <Box title="Personagens">
          {characters.length === 0 ? (
            <p>Nenhum personagem nesta conta.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={thClass}>Nome</th>
                    <th className={thClass}>Vocação</th>
                    <th className={thClass}>Level</th>
                    <th className={thClass}>Mundo</th>
                  </tr>
                </thead>
                <tbody>
                  {characters.map((c) => (
                    <tr key={c.name}>
                      <td className={tdClass}>
                        <Link href={characterUrl(c.name)} className={linkClass}>{c.name}</Link>
                      </td>
                      <td className={tdClass}>{c.vocation}</td>
                      <td className={tdClass}>{c.level}</td>
                      <td className={tdClass}>{c.world}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Box>
      )}
    </>
  );
}
