import { walletKit } from "./wallet";
import createContractClient from "./contract-client";
import { xlmToStroops } from "./utils";

export interface CoffeeTransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
}

export interface CoffeeTransactionCallbacks {
  onStatusChange: (status: string) => void;
  onSuccess: (amount: number) => void;
  onError: (error: string) => void;
}

/**
 * Executa uma transação de compra de café com modal de seleção de carteira
 * @param amount Quantidade de cafés para comprar
 * @param callbacks Callbacks para atualizar a UI
 * @returns Promise com resultado da transação
 */
export async function buyCoffeeTransaction(
  amount: number,
  callbacks: CoffeeTransactionCallbacks
): Promise<CoffeeTransactionResult> {
  try {
    callbacks.onStatusChange("Escolha sua carteira...");
    console.log(`Comprando ${amount} café(s)...`);

    const kit = walletKit();

    // Abrir modal para escolher carteira
    await new Promise<void>((resolve, reject) => {
      kit.openModal({
        onWalletSelected: async (option) => {
          try {
            console.log("Carteira selecionada:", option.name);
            callbacks.onStatusChange("Conectando carteira...");

            // Conectar com a carteira selecionada
            await kit.setWallet(option.id);
            const address = await kit.getAddress();
            console.log("Endereço conectado:", address.address);

            callbacks.onStatusChange("Preparando transação...");

            // Converter XLM para stroops (1 café = 5 XLM)
            const xlmAmount = amount * 5;
            const amountInStroops = xlmToStroops(xlmAmount);

            console.log(
              `Comprando ${amount} café(s) por ${xlmAmount} XLM (${amountInStroops} stroops)`
            );

            // Criar cliente do contrato com configuração dinâmica
            const contract = createContractClient();

            // Configurar a chave pública no cliente
            contract.options.publicKey = address.address;

            // Chamar contrato - processo simples seguindo padrão oficial
            const result = await contract.buy_coffee({
              from: address.address,
              amount: amountInStroops,
            });

            console.log("Resultado da simulação:", result);

            callbacks.onStatusChange(
              "🔐 Assinando transação... (Aprove na carteira)"
            );

            // Usar signAndSend sem parâmetros - o cliente já tem a função de assinatura configurada
            const sentTx = await result.signAndSend();

            console.log("Transação enviada com sucesso:", sentTx);
            callbacks.onStatusChange("✅ Transação enviada com sucesso!");

            // Chamar callback de sucesso
            callbacks.onSuccess(amount);

            resolve();
          } catch (error) {
            console.error("Erro durante a transação:", error);
            reject(error);
          }
        },
        onClosed: (reason) => {
          console.log("Modal fechado:", reason);
          reject(new Error("Modal fechado pelo usuário"));
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao comprar café:", error);

    let errorMessage = "Erro desconhecido";

    // Verificar se é erro de sequência
    if (error && typeof error === "object" && "message" in error) {
      const errorMsg = error.message as string;
      if (
        errorMsg.includes("txBadSeq") ||
        errorMsg.includes('"name": "txBadSeq"')
      ) {
        errorMessage =
          "Erro de sequência da transação. Aguarde alguns segundos e tente novamente.";
        callbacks.onError(errorMessage);
        return { success: false, error: "txBadSeq" };
      }
    }

    // Tratar erros específicos da carteira
    if (error && typeof error === "object" && "code" in error) {
      const walletError = error as {
        code: number;
        message: string;
      };

      if (walletError.code === -4) {
        errorMessage = "Transação rejeitada pelo usuário. Tente novamente.";
      } else if (walletError.code === -3) {
        errorMessage =
          "Carteira não conectada. Por favor, conecte sua carteira primeiro.";
      } else {
        errorMessage = `Erro da carteira (${walletError.code}): ${walletError.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    callbacks.onError(errorMessage);
    return { success: false, error: errorMessage };
  }
}
