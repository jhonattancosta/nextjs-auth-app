export type ChangeType = "novo" | "ajuste" | "correcao";

export const changeTypes: Record<ChangeType, { label: string; className: string }> = {
  novo: { label: "Novo", className: "bg-emerald-800 text-emerald-50" },
  ajuste: { label: "Ajuste", className: "bg-sky-800 text-sky-50" },
  correcao: { label: "Correção", className: "bg-red-800 text-red-50" },
};

export type ChangeEntry = { date: string; type: ChangeType; text: string };

export const changelog: ChangeEntry[] = [
  { date: "2026-10-01", type: "novo", text: "Evento de Halloween adicionado (A Noite dos Mortos)." },
  { date: "2026-09-28", type: "novo", text: "Sistema de tasks encadeadas." },
  { date: "2026-09-28", type: "ajuste", text: "Dano das magias de área de sorcerers e druids reduzido em 5%." },
  { date: "2026-09-28", type: "correcao", text: "Respawn da hunt de Dragon Lords não reaparecia após reinício." },
  { date: "2026-09-24", type: "ajuste", text: "Preço das blessings ajustado para personagens abaixo do level 50." },
  { date: "2026-09-21", type: "correcao", text: "Personagens ficavam presos na porta da quest das botas." },
  { date: "2026-09-20", type: "novo", text: "Abertura oficial do servidor." },
];
