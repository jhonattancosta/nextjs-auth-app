"use server";

import { redirect } from "next/navigation";
import { vocations, startingCharacter, type Vocation, type Character } from "@/data/players";
import { createAccount, findAccountByEmail } from "@/lib/store";
import { findCharacter } from "@/lib/characters";

export type CreateAccountState = {
  error?: string;
  values?: { email: string; characterName: string; vocation: string; sex: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letras e espaços, 3 a 25 caracteres, sem espaço no início/fim nem espaços duplos.
const NAME_RE = /^[A-Za-z]+( [A-Za-z]+)*$/;

export async function createAccountAction(_prev: CreateAccountState, formData: FormData): Promise<CreateAccountState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const characterName = String(formData.get("characterName") ?? "").trim();
  const vocation = String(formData.get("vocation") ?? "");
  const sex = String(formData.get("sex") ?? "");
  const values = { email, characterName, vocation, sex };

  if (!EMAIL_RE.test(email)) return { error: "Informe um e-mail válido.", values };
  if (password.length < 8) return { error: "A senha precisa ter pelo menos 8 caracteres.", values };
  if (password !== confirm) return { error: "As senhas não conferem.", values };
  if (characterName.length < 3 || characterName.length > 25 || !NAME_RE.test(characterName))
    return { error: "Nome do personagem inválido: use de 3 a 25 letras (espaços simples são permitidos).", values };
  if (!vocations.includes(vocation as Vocation)) return { error: "Escolha uma vocação.", values };
  if (sex !== "Masculino" && sex !== "Feminino") return { error: "Escolha o sexo do personagem.", values };

  if (await findAccountByEmail(email)) return { error: "Já existe uma conta com este e-mail.", values };
  if (await findCharacter(characterName)) return { error: "Já existe um personagem com este nome.", values };

  // Deixa o nome com iniciais maiúsculas: "kael dravon" -> "Kael Dravon"
  const prettyName = characterName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  await createAccount(email, password, (accountId) =>
    startingCharacter(prettyName, vocation as Vocation, sex as Character["sex"], accountId),
  );

  redirect("/login?created=1");
}
