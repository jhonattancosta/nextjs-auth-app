export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

export function formatNumber(n: number) {
  return n.toLocaleString("pt-BR");
}

export function characterUrl(name: string) {
  return `/characters/${encodeURIComponent(name)}`;
}
