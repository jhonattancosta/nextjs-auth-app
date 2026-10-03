import { samplePlayers, type Character, type Vocation } from "@/data/players";
import { getStoredCharacters } from "@/lib/store";

export async function getAllCharacters(): Promise<Character[]> {
  return [...samplePlayers, ...(await getStoredCharacters())];
}

export async function findCharacter(name: string) {
  const target = name.trim().toLowerCase();
  return (await getAllCharacters()).find((c) => c.name.toLowerCase() === target);
}

export async function getCharactersByAccount(accountId: string) {
  return (await getStoredCharacters()).filter((c) => c.accountId === accountId);
}

export const highscoreCategories = {
  experience: { label: "Experiência", value: (c: Character) => c.experience },
  magic: { label: "Magic Level", value: (c: Character) => c.magicLevel },
  sword: { label: "Sword Fighting", value: (c: Character) => c.skills.sword },
  axe: { label: "Axe Fighting", value: (c: Character) => c.skills.axe },
  club: { label: "Club Fighting", value: (c: Character) => c.skills.club },
  distance: { label: "Distance Fighting", value: (c: Character) => c.skills.distance },
  shielding: { label: "Shielding", value: (c: Character) => c.skills.shielding },
  fist: { label: "Fist Fighting", value: (c: Character) => c.skills.fist },
} as const;

export type HighscoreCategory = keyof typeof highscoreCategories;

export function isHighscoreCategory(v: string | undefined): v is HighscoreCategory {
  return !!v && v in highscoreCategories;
}

export async function getHighscores(category: HighscoreCategory, vocation?: Vocation, limit = 50) {
  const getValue = highscoreCategories[category].value;
  return (await getAllCharacters())
    .filter((c) => !vocation || c.vocation === vocation)
    .sort((a, b) => getValue(b) - getValue(a) || b.level - a.level)
    .slice(0, limit)
    .map((c, i) => ({ rank: i + 1, character: c, value: getValue(c) }));
}
