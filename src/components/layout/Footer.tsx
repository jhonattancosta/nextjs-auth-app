import Link from "next/link";
import { siteConfig } from "@/config/site";
import { menuSections } from "./menu";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gold/30 bg-black/50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 font-display text-sm font-bold tracking-wider text-gold-light uppercase">{section.title}</h4>
            <ul className="space-y-1 text-sm">
              {section.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-parchment/70 hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-white/5 px-4 py-4 text-center text-xs text-parchment/50">
        © {new Date().getFullYear()} {siteConfig.name}. Projeto independente, sem vínculo com a CipSoft GmbH. Tibia é marca
        registrada da CipSoft GmbH.
      </p>
    </footer>
  );
}
