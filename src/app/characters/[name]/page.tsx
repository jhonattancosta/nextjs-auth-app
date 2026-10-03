import Link from "next/link";
import { notFound } from "next/navigation";
import { findCharacter } from "@/lib/characters";
import { formatDate, formatDateTime, formatNumber } from "@/lib/format";
import Box from "@/components/ui/Box";
import { linkClass, tableClass, tdClass, thClass } from "@/components/ui/styles";

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props) {
  return { title: decodeURIComponent((await params).name) };
}

export default async function CharacterPage({ params }: Props) {
  const character = await findCharacter(decodeURIComponent((await params).name));
  if (!character) notFound();

  const info: [string, React.ReactNode][] = [
    ["Nome", character.name],
    ["Sexo", character.sex],
    ["Vocação", character.vocation],
    ["Level", character.level],
    ["Experiência", formatNumber(character.experience)],
    ["Mundo", character.world],
    ["Residência", character.residence],
    ["Guild", character.guild ?? "—"],
    ["Criado em", formatDate(character.createdAt)],
    ["Último login", character.lastLogin ? formatDateTime(character.lastLogin) : "Nunca"],
  ];

  const skills: [string, number][] = [
    ["Magic Level", character.magicLevel],
    ["Fist Fighting", character.skills.fist],
    ["Club Fighting", character.skills.club],
    ["Sword Fighting", character.skills.sword],
    ["Axe Fighting", character.skills.axe],
    ["Distance Fighting", character.skills.distance],
    ["Shielding", character.skills.shielding],
  ];

  return (
    <>
      <Box title="Informações do personagem">
        <table className={tableClass}>
          <tbody>
            {info.map(([label, value]) => (
              <tr key={label} className="even:bg-parchment-dark/40">
                <th className="w-40 border-b border-parchment-dark px-3 py-2 text-left font-semibold">{label}</th>
                <td className={tdClass}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Box title="Skills">
        <table className={tableClass}>
          <thead>
            <tr>
              <th className={thClass}>Skill</th>
              <th className={`${thClass} text-right`}>Nível</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(([label, value]) => (
              <tr key={label} className="even:bg-parchment-dark/40">
                <td className={tdClass}>{label}</td>
                <td className={`${tdClass} text-right font-mono`}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/characters" className={`${linkClass} mt-4 inline-block text-sm`}>
          « Buscar outro personagem
        </Link>
      </Box>
    </>
  );
}
