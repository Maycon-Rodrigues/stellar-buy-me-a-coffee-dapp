// Importar polyfills primeiro para resolver problemas de compatibilidade
import "../polyfills";

import { useState, useEffect } from "preact/hooks";
import CoffeeForm from "./CoffeeForm";
import { formatAddress, formatXLM } from "../lib/utils";
import createContractClient from "../lib/contract-client";

export default function CoffeeApp() {
  // Estados reativos para armazenar os dados
  const [balance, setBalance] = useState<bigint | null>(null);
  const [loading, setLoading] = useState(true);
  const [supporters, setSupporters] = useState<any[]>([]);
  const [totalSupporters, setTotalSupporters] = useState(0);
  const [loadingSupporters, setLoadingSupporters] = useState(true);

  async function getBalance() {
    // Criar cliente para operações de leitura (não precisa de carteira)
    const contract = createContractClient();
    const balance = await contract.get_balance();
    return balance.result.unwrap();
  }

  async function getSupporters() {
    // Criar cliente para operações de leitura (não precisa de carteira)
    const contract = createContractClient();
    const supporters = await contract.get_supporters();
    return supporters.result.unwrap();
  }

  async function loadSupporters() {
    try {
      setLoadingSupporters(true);
      console.log("Carregando apoiadores do contrato...");

      const supportersData = await getSupporters();
      setSupporters(supportersData);
      setTotalSupporters(supportersData.length);

      console.log("Apoiadores carregados:", supportersData);
    } catch (error) {
      console.error("Erro ao carregar apoiadores:", error);
      setSupporters([]);
      setTotalSupporters(0);
    } finally {
      setLoadingSupporters(false);
    }
  }

  function handleBuyCoffee(amount: number, name: string) {
    // Implementar lógica de compra aqui
    console.log(`Comprando ${amount} café(s) para ${name || "Anônimo"}`);

    // Após a compra, recarrega os dados
    setTimeout(async () => {
      try {
        const newBalance = await getBalance();
        setBalance(newBalance);
        await loadSupporters();
      } catch (error) {
        console.error("Erro ao recarregar dados:", error);
      }
    }, 2000);
  }

  useEffect(() => {
    async function loadData() {
      try {
        // Carrega o balance primeiro (rápido)
        console.log("Carregando balance...");
        const balanceData = await getBalance();
        setBalance(balanceData);
        console.log("Balance carregado:", balanceData?.toString());
        setLoading(false); // Libera a interface principal

        // Depois carrega os apoiadores
        console.log("Carregando apoiadores...");
        await loadSupporters();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
        setLoadingSupporters(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      {/* Main Content */}
      <main class="max-w-4xl mx-auto px-6 py-12">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Hero Section */}
          <div class="space-y-6">
            <div class="space-y-4">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Apoie meu trabalho com um
                <span class="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  cafézinho! ☕
                </span>
              </h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                Se você gosta do meu conteúdo e quer me apoiar, que tal me
                comprar um café? Cada contribuição me ajuda a continuar criando
                coisas incríveis! 🚀
              </p>
            </div>

            {/* Stats Cards */}
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white rounded-xl p-4 shadow-md border border-orange-100">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span class="text-blue-600 text-sm">💰</span>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Total Arrecadado</p>
                    <p class="font-bold text-gray-800">
                      {formatXLM(balance?.toString() || "0")} XLM
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-xl p-4 shadow-md border border-orange-100">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span class="text-green-600 text-sm">❤️</span>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Apoiadores</p>
                    <p class="font-bold text-gray-800">
                      {loadingSupporters ? (
                        <span class="flex items-center space-x-1">
                          <div class="animate-spin rounded-full h-3 w-3 border-2 border-green-500 border-t-transparent"></div>
                          <span class="text-xs">carregando...</span>
                        </span>
                      ) : (
                        totalSupporters
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Coffee Purchase Form */}
          <CoffeeForm onBuyCoffee={handleBuyCoffee} />
        </div>

        {/* Recent Supporters Section */}
        {!loadingSupporters && supporters.length > 0 && (
          <section class="mt-16">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">
                Últimos Apoiadores ❤️
              </h3>
              <p class="text-gray-600">
                Obrigado a todos que me apoiaram recentemente!
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supporters.slice(0, 6).map((supporter, index) => (
                <div
                  key={index}
                  class="bg-white rounded-xl p-4 shadow-md border border-orange-100 hover:shadow-lg transition-shadow"
                >
                  <div class="flex items-center space-x-3">
                    {/* Avatar */}
                    <div class="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {supporter.address.slice(0, 3)}
                    </div>

                    <div class="flex-1">
                      <p class="font-medium text-gray-800">
                        {formatAddress(supporter.address)}
                      </p>
                      <div class="flex items-center space-x-2 text-sm text-gray-600">
                        <span>
                          ☕ {formatXLM(supporter.amount.toString())} XLM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {loadingSupporters && (
          <section class="mt-16">
            <div class="text-center">
              <div class="flex items-center justify-center space-x-2 mb-4">
                <div class="animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent"></div>
                <span class="text-gray-600">Carregando apoiadores...</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
