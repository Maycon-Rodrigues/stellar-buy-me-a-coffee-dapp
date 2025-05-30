import { useState } from "preact/hooks";
import { buyCoffeeTransaction } from "../lib/coffee-transaction";

interface CoffeeFormProps {
  onBuyCoffee: (amount: number, name: string) => void;
}

export default function CoffeeForm({ onBuyCoffee }: CoffeeFormProps) {
  const [coffeeAmount, setCoffeeAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const [hasSequenceError, setHasSequenceError] = useState(false);

  async function handleBuyCoffee(amount: number) {
    setIsLoading(true);
    setHasSequenceError(false);

    const result = await buyCoffeeTransaction(amount, {
      onStatusChange: (status) => {
        setTransactionStatus(status);
      },
      onSuccess: (amount) => {
        onBuyCoffee(amount, "Anônimo");
      },
      onError: (error) => {
        if (error === "txBadSeq") {
          setHasSequenceError(true);
        }
        setTransactionStatus(`❌ ${error}`);
      },
    });

    setIsLoading(false);

    // Limpar status após 5s se foi sucesso
    if (result.success) {
      setTimeout(() => setTransactionStatus(""), 5000);
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    handleBuyCoffee(coffeeAmount);
  }

  return (
    <div class="bg-white rounded-2xl shadow-xl border border-orange-100 p-8">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-2xl">☕</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Compre um Café</h3>
        <p class="text-gray-600">Escolha quantos cafés quer me comprar!</p>
      </div>

      <form onSubmit={handleSubmit} class="space-y-6">
        {/* Coffee Amount Selector */}
        <div>
          <label
            for="amount"
            class="block text-sm font-medium text-gray-700 mb-3"
          >
            Quantos cafés? ☕
          </label>
          <div class="grid grid-cols-3 gap-3">
            {[1, 3, 5].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setCoffeeAmount(amount)}
                disabled={isLoading}
                class={`p-4 border-2 rounded-lg transition-all ${
                  coffeeAmount === amount
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-orange-300"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div class="text-xl mb-1">
                  {amount === 1 ? "☕" : amount === 3 ? "☕☕☕" : "☕☕☕☕☕"}
                </div>
                <div class="text-sm font-medium">
                  {amount} Café{amount > 1 ? "s" : ""}
                </div>
                <div class="text-xs text-gray-500">{amount * 5} XLM</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label
            for="custom"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Ou digite uma quantidade personalizada
          </label>
          <input
            type="number"
            id="custom"
            value={coffeeAmount}
            onInput={(e) =>
              setCoffeeAmount(
                parseInt((e.target as HTMLInputElement).value) || 1
              )
            }
            min="1"
            max="100"
            disabled={isLoading}
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>

        {/* Total Display */}
        <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div class="flex justify-between items-center">
            <span class="text-gray-700 font-medium">Total:</span>
            <span class="text-2xl font-bold text-orange-600">
              {coffeeAmount * 5} XLM
            </span>
          </div>
        </div>

        {/* Buy Button */}
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div class="flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span class="text-sm">❤️</span>
                <span>
                  Comprar {coffeeAmount} Café{coffeeAmount > 1 ? "s" : ""} ☕
                </span>
              </>
            )}
          </div>
        </button>

        {/* Retry Button - Appears on sequence error */}
        {hasSequenceError && (
          <button
            type="button"
            onClick={() => {
              setHasSequenceError(false);
              setTransactionStatus("");
              handleBuyCoffee(coffeeAmount);
            }}
            disabled={isLoading}
            class="w-full mt-2 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all duration-200 disabled:opacity-50"
          >
            🔄 Tentar Novamente (Erro de Sequência)
          </button>
        )}
      </form>

      {/* Transaction Status */}
      {transactionStatus && (
        <div class="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
          <div class="flex items-center space-x-2">
            {isLoading && (
              <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            )}
            <span class="text-sm text-blue-700 font-medium">
              {transactionStatus}
            </span>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div class="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <div class="flex items-start space-x-2">
          <span class="text-blue-600 text-sm">💡</span>
          <div class="text-xs text-blue-700">
            <p class="font-medium mb-1">Como funciona:</p>
            <p>• Clique em "Comprar Café" para iniciar a transação</p>
            <p>• Aprove a assinatura na sua carteira Stellar</p>
            <p>• Aguarde a confirmação na rede</p>
            <p class="mt-1 font-medium text-blue-800">
              ✨ Simples e seguro via Stellar Network!
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-xs text-gray-500 text-center mb-3">
          Pagamento seguro via Stellar
        </p>
        <div class="flex justify-center">
          <div class="bg-gray-100 rounded-lg px-3 py-1">
            <span class="text-xs font-medium text-gray-600">
              🌟 Stellar Network
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
