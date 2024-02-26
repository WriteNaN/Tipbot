import { Database } from "bun:sqlite";
import AsyncLock from "async-lock";
import generateWallets from "./generateWallets";
import fs from "fs";

import type { User } from "../types/user";
import type { Wallet } from "../types/wallet";

const lock = new AsyncLock({ timeout: 5000 });

if (!fs.existsSync("db")) {
  try {
    fs.mkdirSync("db", { recursive: true });
    console.log(`${"db"} created successfully.`);
  } catch (err) {
    console.error(`Error creating db:`, err);
  }
}

const db = new Database("db/users.sqlite", { create: true });

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
    const wallets = JSON.parse(user.wallets);

    return {
      id: user.id,
      wallets,
    };
  } catch (error) {
    //console.error(`Error getting user: ${error}`);
    return null;
  }
}

export function createUser(id: number): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      await lock.acquire("createUser", async () => {
        const existingUser = getUser(id);
        if (existingUser) {
          console.error("User already exists");
          resolve(false);
        }
        const wallets = JSON.stringify(generateWallets());
        db.prepare("INSERT INTO users (id, wallets) VALUES (?, ?)").run(
          id,
          wallets
        );
        resolve(true);
      });
    } catch (e) {
      //console.error(`Error creating user: ${e}`);
      resolve(false);
    }
  });
}
