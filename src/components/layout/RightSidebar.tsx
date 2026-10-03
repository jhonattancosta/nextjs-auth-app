import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getHighscores } from "@/lib/characters";
import { siteConfig } from "@/config/site";
import { characterUrl } from "@/lib/format";
import Box from "@/components/ui/Box";
import SignOutButton from "@/components/SignOutButton";
import { buttonClass, buttonSecondaryClass } from "@/components/ui/styles";

export default async function RightSidebar() {
  const session = await getServerSession(authOptions);
  const top = await getHighscores("experience", undefined, 5);

  return (
    <aside className="space-y-4">
      <Box title={session ? "Sua conta" : "Login"} variant="dark">
        {session ? (
          <div className="space-y-3 text-sm">
            <p>
              Logado como <strong className="text-gold-light break-all">{session.user.email ?? session.user.name}</strong>
            </p>
            <div className="flex gap-2">
              <Link href="/account" className={`${buttonSecondaryClass} flex-1`}>
                Minha conta
              </Link>
              <SignOutButton />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href="/login" className={`${buttonClass} w-full`}>
              Entrar
            </Link>
            <Link href="/account/create" className={`${buttonSecondaryClass} w-full`}>
              Criar conta
            </Link>
          </div>
        )}
      </Box>

      <Box title="Status do servidor" variant="dark">
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-parchment/70">Status</dt>
            <dd className={siteConfig.status.online ? "font-bold text-emerald-400" : "font-bold text-red-400"}>
              {siteConfig.status.online ? "Online" : "Offline"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-parchment/70">Jogadores</dt>
            <dd>{siteConfig.status.playersOnline}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-parchment/70">Recorde</dt>
            <dd>{siteConfig.status.record}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-parchment/70">Uptime</dt>
            <dd>{siteConfig.status.uptime}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-parchment/70">IP</dt>
            <dd className="font-mono text-gold-light">{siteConfig.serverIp}</dd>
          </div>
        </dl>
        <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-gold/20 pt-3 text-xs">
          {siteConfig.rates.map((r) => (
            <div key={r.label} className="rounded bg-black/30 px-2 py-1">
              <span className="block text-parchment/60">{r.label}</span>
              <span className="font-bold text-gold-light">{r.value}</span>
            </div>
          ))}
        </div>
      </Box>

      <Box title="Top 5 Level" variant="dark">
        <ol className="space-y-1.5 text-sm">
          {top.map(({ rank, character }) => (
            <li key={character.name} className="flex items-center justify-between gap-2">
              <span className="truncate">
                <span className="mr-1 text-gold">{rank}.</span>
                <Link href={characterUrl(character.name)} className="hover:text-gold-light hover:underline">
                  {character.name}
                </Link>
              </span>
              <span className="shrink-0 text-xs text-parchment/70">Lv {character.level}</span>
            </li>
          ))}
        </ol>
        <Link href="/highscores" className="mt-3 block text-right text-xs text-gold hover:text-gold-light">
          Ver ranking completo »
        </Link>
      </Box>
    </aside>
  );
}
