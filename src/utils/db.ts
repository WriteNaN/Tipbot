import { Database } from "bun:sqlite";
import AsyncLock from "async-lock";
import generateWallets from "./generateWallets";

import type { User } from "../types/user";
import type { Wallet } from "../types/wallet";

const lock = new AsyncLock({ timeout: 5000 });
const db = new Database("./db/users.sqlite", { create: true });

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    wallets TEXT
  )
`
).run();

export function getUser(id: number): User | null {
  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as any;
    if (!user) {
      return null;
    }
    const wallets: Wallet[] = user.wallets.map((wallet: string) =>
      JSON.parse(wallet)
    );

    return {
      id: user.id,
      wallets,
    };
  } catch (error) {
    console.error(`Error getting user: ${error}`);
    return null;
  }
}

export function createUser(id: number): boolean {
  try {
    lock.acquire("createUser", async () => {
      const existingUser = getUser(id);
      if (existingUser) {
        console.error("User already exists");
        return false;
      }
      const wallets = JSON.stringify(generateWallets());
      db.prepare("INSERT INTO users (id, wallets) VALUES (?, ?)").run(
        id,
        wallets
      );
    });
  } catch (e) {
    console.error(`Error creating user: ${e}`);
    return false;
  }
}
