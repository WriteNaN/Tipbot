export interface NanoWallet {
    network: "xno" | "ban" | "xdg" | "xro";
    alias: "nano" | "banano" | "dogenano" | "raiblocksone";
    privateKey: string;
    publicKey: string;
    address: string;
}