"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { menuSections } from "./menu";

export default function LeftMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside>
      {/* Botão visível só no celular */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="mb-2 w-full rounded border border-gold/40 bg-wood px-4 py-2 text-left font-display text-sm font-bold tracking-wider text-gold-light uppercase lg:hidden"
        aria-expanded={open}
      >
        {open ? "✕ Fechar menu" : "☰ Menu"}
      </button>

      <nav className={`${open ? "block" : "hidden"} space-y-3 lg:block`}>
        {menuSections.map((section) => (
          <div key={section.title} className="overflow-hidden rounded-md border border-gold/40 bg-wood shadow-lg shadow-black/50">
            <h3 className="border-b border-gold/40 bg-linear-to-b from-wood-light to-wood px-3 py-2 font-display text-sm font-bold tracking-wider text-gold-light uppercase">
              {section.title}
            </h3>
            <ul>
              {section.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-black/30 px-3 py-2 text-sm transition last:border-0 ${
                        active ? "bg-gold/20 text-gold-light" : "text-parchment/85 hover:bg-white/5 hover:text-gold-light"
                      }`}
                    >
                      › {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
