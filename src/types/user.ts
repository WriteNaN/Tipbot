import type { Wallet } from "./wallet";

export interface User {
    id: number;
    wallets: Wallet[];
};