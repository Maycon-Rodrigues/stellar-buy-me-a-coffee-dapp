import { Client, networks } from "buymeacoffee-sdk";
import { walletKit } from "./wallet";

// Função para obter a chave pública da carteira
async function getPublicKey() {
  const kit = walletKit();
  const address = await kit.getAddress();
  return address.address;
}

// Função para assinar transações
async function signTransaction(xdr: string) {
  const kit = walletKit();
  return await kit.signTransaction(xdr);
}

// Configuração do cliente do contrato seguindo o padrão oficial da Stellar
const createContractClient = () => {
  return new Client({
    contractId: networks.testnet.contractId,
    networkPassphrase: networks.testnet.networkPassphrase,
    rpcUrl: "https://soroban-testnet.stellar.org",
    publicKey: undefined, // Será definido dinamicamente
    signTransaction, // Função de assinatura
  });
};

export default createContractClient;
