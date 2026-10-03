"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/news" })}
      className="inline-flex items-center justify-center rounded border border-red-900 bg-red-950/60 px-3 py-2 font-display text-sm font-bold text-red-200 hover:bg-red-900/70"
    >
      Sair
    </button>
  );
}
