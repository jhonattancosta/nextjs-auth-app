import Link from "next/link";
import { redirect } from "next/navigation";
import { findCharacter, getAllCharacters } from "@/lib/characters";
import { characterUrl, formatDate } from "@/lib/format";
import Box from "@/components/ui/Box";
import { buttonClass, inputClass, labelClass, linkClass, tableClass, tdClass, thClass } from "@/components/ui/styles";

export const metadata = { title: "Personagens" };

type Props = { searchParams: Promise<{ name?: string }> };

export default async function CharactersPage({ searchParams }: Props) {
  const { name } = await searchParams;
  const query = name?.trim();

  if (query) {
    const found = await findCharacter(query);
    if (found) redirect(characterUrl(found.name));
  }

  const recent = (await getAllCharacters())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 10);

  return (
    <>
      <Box title="Buscar personagem">
        <form className="flex flex-wrap items-end gap-3">
          <div className="min-w-48 flex-1">
            <label htmlFor="name" className={labelClass}>Nome</label>
            <input id="name" name="name" defaultValue={query} required className={inputClass} />
          </div>
          <button type="submit" className={buttonClass}>Buscar</button>
        </form>
        {query && (
          <p className="mt-4 rounded border border-red-700 bg-red-100 px-3 py-2 text-sm text-red-800">
            Nenhum personagem chamado <strong>{query}</strong> foi encontrado.
          </p>
        )}
      </Box>

      <Box title="Personagens mais recentes">
        <div className="overflow-x-auto">
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>Nome</th>
                <th className={thClass}>Vocação</th>
                <th className={thClass}>Level</th>
                <th className={thClass}>Criado em</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((c) => (
                <tr key={c.name} className="even:bg-parchment-dark/40">
                  <td className={tdClass}>
                    <Link href={characterUrl(c.name)} className={linkClass}>{c.name}</Link>
                  </td>
                  <td className={tdClass}>{c.vocation}</td>
                  <td className={tdClass}>{c.level}</td>
                  <td className={tdClass}>{formatDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
}
