"use client";

import { useActionState } from "react";
import { createAccountAction, type CreateAccountState } from "./actions";
import { vocations } from "@/data/players";
import { buttonClass, inputClass, labelClass } from "@/components/ui/styles";

export default function CreateAccountForm() {
  const [state, formAction, pending] = useActionState<CreateAccountState, FormData>(createAccountAction, {});
  const v = state.values;

  return (
    <form action={formAction} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="mb-2 font-display text-base font-bold text-wood">1. Dados da conta</legend>
        <div>
          <label htmlFor="email" className={labelClass}>E-mail</label>
          <input id="email" name="email" type="email" required defaultValue={v?.email} autoComplete="email" className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className={labelClass}>Senha (mín. 8 caracteres)</label>
            <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
          </div>
          <div>
            <label htmlFor="confirm" className={labelClass}>Confirmar senha</label>
            <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={inputClass} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-display text-base font-bold text-wood">2. Seu primeiro personagem</legend>
        <div>
          <label htmlFor="characterName" className={labelClass}>Nome do personagem</label>
          <input id="characterName" name="characterName" required minLength={3} maxLength={25}
            defaultValue={v?.characterName} className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vocation" className={labelClass}>Vocação</label>
            <select id="vocation" name="vocation" required defaultValue={v?.vocation ?? ""} className={inputClass}>
              <option value="" disabled>Escolha...</option>
              {vocations.map((voc) => (
                <option key={voc} value={voc}>{voc}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sex" className={labelClass}>Sexo</label>
            <select id="sex" name="sex" required defaultValue={v?.sex ?? ""} className={inputClass}>
              <option value="" disabled>Escolha...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>
        </div>
      </fieldset>

      {state.error && (
        <p className="rounded border border-red-700 bg-red-100 px-3 py-2 text-sm text-red-800">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className={`${buttonClass} w-full sm:w-auto`}>
        {pending ? "Criando..." : "Criar conta"}
      </button>
    </form>
  );
}
