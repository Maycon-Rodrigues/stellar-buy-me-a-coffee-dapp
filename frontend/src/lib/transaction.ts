import { rpc, TransactionBuilder, Networks } from "@stellar/stellar-sdk";

// Configuração do servidor Soroban
const server = new rpc.Server("https://soroban-testnet.stellar.org");

export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
  details?: any;
}

/**
 * Decodifica erros de transação Stellar
 * @param errorResult Resultado de erro da transação
 * @returns Mensagem de erro legível
 */
function decodeTransactionError(errorResult: any): string {
  try {
    if (!errorResult) return "Erro desconhecido";

    // Tentar extrair informações do erro
    const errorCode = errorResult._attributes?.result?._switch?.value;
    const errorType = errorResult._attributes?.result?._switch?.name;
    const feeCharged = errorResult._attributes?.feeCharged?._value;

    console.log("Detalhes do erro:", {
      errorCode,
      errorType,
      feeCharged,
      fullError: errorResult,
    });

    // Mapear códigos de erro comuns do Stellar
    const errorMessages: Record<string, string> = {
      txInsufficientBalance: "Saldo insuficiente para a transação",
      txBadAuth: "Falha na autenticação da transação",
      txInternalError: "Erro interno do servidor",
      txBadSeq:
        "Número de sequência inválido - a transação pode estar desatualizada",
      txMissingOperation: "Operação ausente na transação",
      txTooEarly: "Transação enviada muito cedo",
      txTooLate: "Transação enviada muito tarde",
      txInsufficientFee: "Taxa de transação insuficiente",
      txBadSponsorship: "Problema com sponsorship",
      txFeeBumpInnerFailed: "Falha na transação interna do fee bump",
      txNotSupported: "Tipo de transação não suportado",
      txInvalidAccount: "Conta inválida",
      txSorobanInvalid: "Transação Soroban inválida",
    };

    if (errorType && errorMessages[errorType]) {
      let message = errorMessages[errorType];

      // Adicionar informações específicas para txBadSeq
      if (errorType === "txBadSeq") {
        message +=
          "\n\n💡 Solução: Tente novamente - o número de sequência será atualizado automaticamente.";
      }

      if (feeCharged) {
        const feeInXlm = (parseInt(feeCharged) / 10000000).toFixed(7);
        message += `\n\nTaxa cobrada: ${feeInXlm} XLM`;
      }

      return message;
    }

    if (errorCode) {
      return `Erro de transação (código: ${errorCode})`;
    }

    return "Erro na validação da transação";
  } catch (e) {
    console.error("Erro ao decodificar erro de transação:", e);
    return "Erro desconhecido na transação";
  }
}

/**
 * Envia uma transação assinada para a blockchain Stellar
 * @param signedXdr XDR da transação assinada
 * @returns Resultado da transação
 */
export async function sendTransaction(
  signedXdr: string
): Promise<TransactionResult> {
  try {
    console.log("🚀 Enviando transação para blockchain...");

    // Reconstruir transação a partir do XDR assinado
    const transaction = TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET);

    // Enviar transação
    const response = await server.sendTransaction(transaction);
    console.log("📡 Resposta inicial:", response);

    if (response.status === "PENDING") {
      console.log("⏳ Transação enviada! Hash:", response.hash);

      // Aguardar confirmação com timeout
      const confirmed = await waitForConfirmation(response.hash, 30000); // 30 segundos timeout

      if (confirmed.success) {
        console.log("✅ Transação confirmada!");
        return {
          success: true,
          hash: response.hash,
        };
      } else {
        console.error("❌ Transação falhou ou timeout");
        return {
          success: false,
          error: confirmed.error || "Timeout ou falha na confirmação",
          details: confirmed.details,
        };
      }
    } else if (response.status === "ERROR") {
      console.error("❌ Erro ao enviar transação:", response);

      const errorMessage = decodeTransactionError(response.errorResult);

      return {
        success: false,
        error: errorMessage,
        details: {
          hash: response.hash,
          errorResult: response.errorResult,
          latestLedger: response.latestLedger,
        },
      };
    } else {
      console.error("❌ Status inesperado:", response);
      return {
        success: false,
        error: `Status inesperado: ${response.status}`,
        details: response,
      };
    }
  } catch (error) {
    console.error("❌ Erro ao processar transação:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Aguarda confirmação da transação com timeout
 * @param hash Hash da transação
 * @param timeoutMs Timeout em milissegundos
 * @returns Resultado da confirmação
 */
async function waitForConfirmation(
  hash: string,
  timeoutMs: number = 30000
): Promise<TransactionResult> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    try {
      const getResponse = await server.getTransaction(hash);
      console.log("Status da transação:", getResponse.status);

      if (getResponse.status === "SUCCESS") {
        console.log("✅ Transação confirmada com sucesso!");
        return { success: true };
      } else if (getResponse.status === "FAILED") {
        console.error("❌ Transação falhou:", getResponse);

        // Tentar extrair detalhes do erro
        let errorMessage = "Transação falhou na blockchain";
        if (getResponse.resultXdr) {
          try {
            // Aqui poderíamos decodificar o resultXdr para mais detalhes
            errorMessage += " (verifique o console para detalhes)";
          } catch (e) {
            console.warn("Não foi possível decodificar resultXdr:", e);
          }
        }

        return {
          success: false,
          error: errorMessage,
          details: {
            status: getResponse.status,
            resultXdr: getResponse.resultXdr,
            ledger: getResponse.ledger,
          },
        };
      }

      // Aguardar 1 segundo antes de tentar novamente
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("⏳ Aguardando confirmação...");
    } catch (error) {
      console.warn("Erro ao verificar status:", error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return {
    success: false,
    error: "Timeout - transação não confirmada no tempo esperado",
  };
}

/**
 * Formata hash da transação para exibição
 * @param hash Hash completo
 * @returns Hash formatado
 */
export function formatTransactionHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
}

/**
 * Gera URL do Stellar Expert para visualizar transação
 * @param hash Hash da transação
 * @param network Rede (testnet ou mainnet)
 * @returns URL do explorer
 */
export function getExplorerUrl(
  hash: string,
  network: "testnet" | "mainnet" = "testnet"
): string {
  const baseUrl =
    network === "testnet"
      ? "https://stellar.expert/explorer/testnet"
      : "https://stellar.expert/explorer/public";
  return `${baseUrl}/tx/${hash}`;
}
