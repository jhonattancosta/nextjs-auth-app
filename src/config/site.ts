/**
 * Configurações gerais do servidor.
 * Troque o nome, IP, rates etc. aqui — o site inteiro usa estes valores.
 */
export const siteConfig = {
  name: "JhowOT",
  tagline: "Uma nova aventura em Tibia",
  world: "Aurora",
  serverIp: "jhowot.com.br",
  port: 7171,
  clientVersion: "15.00",
  discordUrl: "https://discord.com",
  rates: [
    { label: "Experiência", value: "Stages" },
    { label: "Skills", value: "5x" },
    { label: "Magic Level", value: "5x" },
    { label: "Loot", value: "2x" },
  ],
  // Status de exemplo. No futuro, isso pode vir do banco do servidor (Canary).
  status: { online: true, playersOnline: 137, record: 412, uptime: "3d 14h" },
};
