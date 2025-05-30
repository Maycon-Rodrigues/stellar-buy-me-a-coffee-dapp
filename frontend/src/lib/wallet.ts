import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";

// Configuração da wallet
export function walletKit() {
  return new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: "freighter",
    modules: allowAllModules(),
  });
}
