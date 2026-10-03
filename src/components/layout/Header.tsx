import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Header() {
  const { status } = siteConfig;
  return (
    <header className="border-b border-gold/30 bg-linear-to-b from-[#1b120a] to-transparent">
      <div className="bg-black/40 text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-parchment/80">
          <span className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${status.online ? "bg-emerald-400" : "bg-red-500"}`} />
            {status.online ? "Online" : "Offline"} · {status.playersOnline} jogadores · Mundo {siteConfig.world}
          </span>
          <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light">
            Discord
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <Link
          href="/news"
          className="font-display text-5xl font-bold tracking-[0.15em] text-gold-light drop-shadow-[0_2px_12px_rgba(201,154,62,0.55)] sm:text-6xl"
        >
          {siteConfig.name}
        </Link>
        <p className="mt-3 text-xs tracking-[0.35em] text-gold/80 uppercase sm:text-sm">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}
