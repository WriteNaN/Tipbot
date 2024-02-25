export interface NanoWallet {
    network: "xno" | "ban" | "xdg" | "xro"
    privateKey: string;
    publicKey: string;
    address: string;
}