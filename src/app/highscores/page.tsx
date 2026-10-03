import Link from "next/link";
import { vocations, type Vocation } from "@/data/players";
import { getHighscores, highscoreCategories, isHighscoreCategory } from "@/lib/characters";
import { characterUrl, formatNumber } from "@/lib/format";
import Box from "@/components/ui/Box";
import { buttonClass, inputClass, labelClass, linkClass, tableClass, tdClass, thClass } from "@/components/ui/styles";

export const metadata = { title: "Highscores" };

type Props = { searchParams: Promise<{ category?: string; vocation?: string }> };

export default async function HighscoresPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = isHighscoreCategory(params.category) ? params.category : "experience";
  const vocation = vocations.includes(params.vocation as Vocation) ? (params.vocation as Vocation) : undefined;
  const rows = await getHighscores(category, vocation);

  return (
    <Box title="Highscores">
      {/* Formulário GET: os filtros ficam na URL (funciona sem JavaScript). */}
      <form className="mb-4 flex flex-wrap items-end gap-3">
        <div className="min-w-40 flex-1">
          <label htmlFor="category" className={labelClass}>Categoria</label>
          <select id="category" name="category" defaultValue={category} className={inputClass}>
            {Object.entries(highscoreCategories).map(([key, c]) => (
              <option key={key} value={key}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="min-w-40 flex-1">
          <label htmlFor="vocation" className={labelClass}>Vocação</label>
          <select id="vocation" name="vocation" defaultValue={vocation ?? ""} className={inputClass}>
            <option value="">Todas</option>
            {vocations.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={buttonClass}>Filtrar</button>
      </form>

      <div className="overflow-x-auto">
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={`${thClass} w-14`}>#</th>
              <th className={thClass}>Nome</th>
              <th className={thClass}>Vocação</th>
              <th className={thClass}>Level</th>
              <th className={`${thClass} text-right`}>{highscoreCategories[category].label}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ rank, character, value }) => (
              <tr key={character.name} className="even:bg-parchment-dark/40">
                <td className={`${tdClass} font-bold`}>{rank}</td>
                <td className={tdClass}>
                  <Link href={characterUrl(character.name)} className={linkClass}>{character.name}</Link>
                </td>
                <td className={tdClass}>{character.vocation}</td>
                <td className={tdClass}>{character.level}</td>
                <td className={`${tdClass} text-right font-mono`}>{formatNumber(value)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className={tdClass}>Nenhum personagem encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Box>
  );
}
