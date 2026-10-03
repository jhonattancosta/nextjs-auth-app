import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { Character } from "@/data/players";

/**
 * "Banco de dados" simples em arquivo JSON, só para a primeira versão.
 *
 * - Localmente salva em .data/db.json (fica fora do Git).
 * - Na Vercel o disco é temporário (/tmp): as contas criadas lá podem sumir
 *   a qualquer momento. Para produção, troque por um banco de verdade
 *   (ex.: o MySQL do próprio servidor Canary).
 */
export type Account = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  premiumDays: number;
};

type DB = { accounts: Account[]; characters: Character[] };

const DATA_DIR =
  process.env.DATA_DIR || (process.env.VERCEL ? "/tmp/site-data" : path.join(process.cwd(), ".data"));
const DB_FILE = path.join(DATA_DIR, "db.json");

let cache: DB | null = null;

async function load(): Promise<DB> {
  if (cache) return cache;
  try {
    cache = JSON.parse(await fs.readFile(DB_FILE, "utf8")) as DB;
  } catch {
    cache = { accounts: [], characters: [] };
  }
  return cache;
}

async function save(db: DB) {
  cache = db;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (err) {
    console.warn("[store] não foi possível salvar em disco, mantendo só em memória:", err);
  }
}

// ---- senhas (scrypt nativo do Node, sem dependências extras) ----
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === candidate.length && crypto.timingSafeEqual(expected, candidate);
}

// ---- contas ----
export async function findAccountByEmail(email: string) {
  const db = await load();
  return db.accounts.find((a) => a.email === email.trim().toLowerCase());
}

export async function findAccountById(id: string) {
  const db = await load();
  return db.accounts.find((a) => a.id === id);
}

export async function createAccount(email: string, password: string, firstCharacter: (accountId: string) => Character) {
  const db = await load();
  const account: Account = {
    id: crypto.randomUUID(),
    email: email.trim().toLowerCase(),
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    premiumDays: 0,
  };
  db.accounts.push(account);
  db.characters.push(firstCharacter(account.id));
  await save(db);
  return account;
}

// ---- personagens criados pelo site ----
export async function getStoredCharacters() {
  const db = await load();
  return db.characters;
}
