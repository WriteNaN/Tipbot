import { wallet } from "multi-nano-web";

import type { Wallet, NanoWallet } from "../types/wallet";

export default function generateWallets(): Wallet[] {
  const nanoWallets = generateNanoWallets();

  return [...nanoWallets];
}

function generateNanoWallets(): NanoWallet[] {
  const walletX = wallet.generate();
  const nanoAddress = walletX.accounts[0].address;
  const publicKey = walletX.accounts[0].publicKey;
  const privateKey = walletX.accounts[0].privateKey;

  return [
    { privateKey, publicKey, address: nanoAddress, network: "xno" },
    {
      privateKey,
      publicKey,
      address: nanoAddress.replace("nano", "ban"),
      network: "ban",
    },
    {
      privateKey,
      publicKey,
      address: nanoAddress.replace("nano", "xdg"),
      network: "xdg",
    },
    {
      privateKey,
      publicKey,
      address: nanoAddress.replace("nano", "xro"),
      network: "xro",
    },
  ];
}
