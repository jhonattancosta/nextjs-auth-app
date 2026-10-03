import { siteConfig } from "@/config/site";

export type NewsCategory = "eventos" | "guias" | "atualizacoes" | "comunidade";

export const newsCategories: Record<NewsCategory, { label: string; className: string }> = {
  eventos: { label: "Eventos", className: "bg-purple-800 text-purple-50" },
  guias: { label: "Guias", className: "bg-emerald-800 text-emerald-50" },
  atualizacoes: { label: "Atualizações", className: "bg-sky-800 text-sky-50" },
  comunidade: { label: "Comunidade", className: "bg-amber-800 text-amber-50" },
};

export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export type NewsPost = {
  slug: string;
  title: string;
  date: string; // ISO (AAAA-MM-DD)
  category: NewsCategory;
  author: string;
  summary: string;
  featured?: boolean;
  content: NewsBlock[];
};

/** Para adicionar uma notícia, basta incluir um objeto nesta lista. */
export const news: NewsPost[] = [
  {
    slug: "evento-noite-dos-mortos",
    title: "Evento de Halloween: A Noite dos Mortos",
    date: "2026-10-01",
    category: "eventos",
    author: "Equipe " + siteConfig.name,
    summary: "Entre 25/10 e 02/11 os cemitérios ganham vida. Novos chefes, outfit exclusivo e drops dobrados.",
    content: [
      { type: "p", text: "Durante o fim de outubro, os mortos se levantam em todos os cemitérios de " + siteConfig.world + ". Reúna seu time e enfrente as hordas!" },
      { type: "h3", text: "O que esperar" },
      {
        type: "ul",
        items: [
          "Três chefes inéditos com mecânicas próprias",
          "Outfit e montaria temáticos (sem custo em coins)",
          "Drop rate em dobro nas áreas do evento",
          "Ranking do evento com prêmios para o top 10",
        ],
      },
    ],
  },
  {
    slug: "atualizacao-1-2",
    title: "Atualização 1.2: tasks encadeadas e balanceamento",
    date: "2026-09-28",
    category: "atualizacoes",
    author: "Equipe " + siteConfig.name,
    summary: "Novo sistema de tasks encadeadas, ajustes em magias de área e correções na hunt de Dragon Lords.",
    content: [
      { type: "p", text: "A versão 1.2 já está no ar. Confira as principais mudanças abaixo e a lista completa no Changelog." },
      {
        type: "ul",
        items: [
          "Tasks encadeadas: complete uma task para liberar a próxima, com recompensas crescentes",
          "Magias de área de sorcerers e druids receberam ajuste de dano",
          "Respawn da hunt de Dragon Lords corrigido",
        ],
      },
    ],
  },
  {
    slug: "guia-iniciantes",
    title: "Guia para iniciantes: seus primeiros níveis",
    date: "2026-09-25",
    category: "guias",
    author: "Equipe " + siteConfig.name,
    summary: "Onde caçar, quais quests fazer primeiro e como montar seu primeiro set.",
    content: [
      { type: "p", text: "Acabou de chegar? Este guia mostra o caminho mais rápido do level 8 ao 50." },
      { type: "h3", text: "Passo a passo" },
      {
        type: "ul",
        items: [
          "Level 8–20: rotworms e trolls perto do templo",
          "Level 20–35: minotauros e a quest das botas",
          "Level 35–50: cyclops e a primeira task encadeada",
          "Guarde dinheiro para a primeira bless antes de arriscar hunts maiores",
        ],
      },
    ],
  },
  {
    slug: "torneio-de-guilds",
    title: "Torneio de guilds: inscrições abertas",
    date: "2026-09-23",
    category: "comunidade",
    author: "Equipe " + siteConfig.name,
    summary: "Monte seu time de 5 jogadores e dispute o título de melhor guild do servidor.",
    content: [
      { type: "p", text: "As inscrições vão até 10/10. Cada guild pode inscrever um time de 5 jogadores, com level mínimo 100." },
      { type: "p", text: "Os detalhes de regras e premiação estão no nosso Discord." },
    ],
  },
  {
    slug: "bem-vindo",
    title: "Conheça o " + siteConfig.name,
    date: "2026-09-20",
    category: "comunidade",
    author: "Equipe " + siteConfig.name,
    summary: "Tudo o que você precisa saber sobre o servidor antes de começar.",
    featured: true,
    content: [
      {
        type: "p",
        text:
          "O " + siteConfig.name + " é um servidor de Tibia focado em uma experiência clássica, com sistemas novos que respeitam a essência do jogo. Nosso mundo, " +
          siteConfig.world + ", foi pensado para quem quer evoluir com calma ou competir no topo do ranking.",
      },
      { type: "h3", text: "Principais sistemas" },
      {
        type: "ul",
        items: [
          "Experiência por stages e skills 5x",
          "Tasks encadeadas com recompensas",
          "Eventos semanais automáticos",
          "Sistema de guilds com guerras e castelos",
          "Prey, Imbuements e Bestiary",
          "Equipe ativa e suporte pelo Discord",
        ],
      },
      { type: "p", text: "Crie sua conta, baixe o client e nos vemos em " + siteConfig.world + "!" },
    ],
  },
];

export function getNews() {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}
