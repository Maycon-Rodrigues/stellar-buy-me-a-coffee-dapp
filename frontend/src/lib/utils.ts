// Utilitários para formatação

/**
 * Formata um endereço Stellar para exibição
 * @param address Endereço completo
 * @returns Endereço formatado (primeiros 4 + ... + últimos 4 caracteres)
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/**
 * Formata valores XLM para exibição
 * @param amount Valor em stroops (string ou number)
 * @returns Valor formatado em XLM
 */
export function formatXLM(amount: string | number): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Se o valor está em stroops (muito grande), converte para XLM
  if (numAmount > 1000000) {
    return (numAmount / 10000000).toFixed(2);
  }

  // Se já está em XLM
  return numAmount.toFixed(2);
}

/**
 * Converte XLM para stroops
 * @param xlm Valor em XLM
 * @returns Valor em stroops
 */
export function xlmToStroops(xlm: number): bigint {
  return BigInt(Math.round(xlm * 10000000));
}

/**
 * Converte stroops para XLM
 * @param stroops Valor em stroops
 * @returns Valor em XLM
 */
export function stroopsToXlm(stroops: bigint | string): number {
  const numStroops = typeof stroops === "string" ? BigInt(stroops) : stroops;
  return Number(numStroops) / 10000000;
}
