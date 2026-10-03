import { siteConfig } from "@/config/site";

export const vocations = ["Knight", "Paladin", "Sorcerer", "Druid"] as const;
export type Vocation = (typeof vocations)[number];

export type Skills = {
  fist: number;
  club: number;
  sword: number;
  axe: number;
  distance: number;
  shielding: number;
};

export type Character = {
  name: string;
  sex: "Masculino" | "Feminino";
  vocation: Vocation;
  level: number;
  experience: number;
  magicLevel: number;
  skills: Skills;
  world: string;
  residence: string;
  guild?: string;
  createdAt: string; // ISO
  lastLogin?: string; // ISO
  accountId?: string;
};

/** Experiência necessária para um level (fórmula do Tibia). */
export function experienceForLevel(level: number) {
  return Math.round((50 / 3) * (level ** 3 - 6 * level ** 2 + 17 * level - 12));
}

export function startingCharacter(name: string, vocation: Vocation, sex: Character["sex"], accountId: string): Character {
  const now = new Date().toISOString();
  return {
    name,
    sex,
    vocation,
    level: 8,
    experience: experienceForLevel(8),
    magicLevel: vocation === "Sorcerer" || vocation === "Druid" ? 2 : 0,
    skills: { fist: 10, club: 10, sword: 10, axe: 10, distance: 10, shielding: 10 },
    world: siteConfig.world,
    residence: "Thais",
    createdAt: now,
    accountId,
  };
}

// ---------------------------------------------------------------------------
// Personagens de EXEMPLO (gerados de forma determinística para o ranking ter
// conteúdo). Quando o site for ligado ao banco do servidor, isso sai daqui.
// ---------------------------------------------------------------------------
const sampleNames = [
  "Kael Dravon", "Lyra Moonshade", "Thorgar", "Eldric Vane", "Sylas Ember", "Mira Thorn",
  "Brann Ironfist", "Vexa Nightfall", "Orin Stormborn", "Tessa Brightwind", "Grom Ashpaw",
  "Nyx Valerian", "Doran Steelheart", "Isolde Frost", "Ragnar Wolfsbane", "Zara Quickshot",
  "Fenrik", "Elowen Leaf", "Magnus Grey", "Kira Sunveil", "Torvin Oakshield", "Seraphine",
  "Halvar Stone", "Luna Silverbrook", "Draven Black", "Aria Flamecrest", "Bjorn Hammer",
  "Celeste Dawn", "Ulric Ravenclaw", "Yara Stormeye",
];
const guilds = ["Ordem de Aurora", "Lâminas Rubras", "Os Esquecidos", undefined, undefined];
const residences = ["Thais", "Carlin", "Venore", "Edron", "Ab'Dendriel", "Darashia"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildSamplePlayers(): Character[] {
  const rand = mulberry32(2026);
  const between = (min: number, max: number) => Math.floor(min + rand() * (max - min + 1));
  const base = Date.UTC(2026, 8, 20);

  return sampleNames.map((name, i) => {
    const vocation = vocations[i % vocations.length];
    const level = Math.max(8, Math.round(650 * rand() ** 1.8));
    const isMage = vocation === "Sorcerer" || vocation === "Druid";
    const skills: Skills = { fist: between(10, 20), club: 10, sword: 10, axe: 10, distance: 10, shielding: 10 };

    if (vocation === "Knight") {
      const main = (["sword", "axe", "club"] as const)[between(0, 2)];
      skills[main] = Math.min(130, 40 + Math.round(level / 6) + between(0, 10));
      skills.shielding = Math.min(125, 35 + Math.round(level / 6) + between(0, 8));
    } else if (vocation === "Paladin") {
      skills.distance = Math.min(135, 40 + Math.round(level / 5.5) + between(0, 10));
      skills.shielding = 20 + Math.round(level / 15) + between(0, 5);
    } else {
      skills.shielding = 15 + between(0, 15);
    }

    const created = new Date(base + i * 86400000 * 0.3).toISOString();
    const lastLogin = new Date(Date.UTC(2026, 9, 1) - between(0, 72) * 3600000).toISOString();

    return {
      name,
      sex: i % 3 === 0 ? "Feminino" : "Masculino",
      vocation,
      level,
      experience: experienceForLevel(level) + between(0, 50000),
      magicLevel: isMage
        ? Math.min(130, Math.round(level / 5) + between(0, 8))
        : vocation === "Paladin"
          ? Math.min(35, 8 + Math.round(level / 25))
          : Math.min(12, 3 + Math.round(level / 70)),
      skills,
      world: siteConfig.world,
      residence: residences[between(0, residences.length - 1)],
      guild: guilds[between(0, guilds.length - 1)],
      createdAt: created,
      lastLogin,
    } satisfies Character;
  });
}

export const samplePlayers: Character[] = buildSamplePlayers();
