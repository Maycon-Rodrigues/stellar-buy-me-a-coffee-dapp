# 🌐 Buy Me a Coffee - Frontend

> Interface web moderna e responsiva para o DApp Buy Me a Coffee na rede Stellar

[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![Preact](https://img.shields.io/badge/Preact-673AB8?logo=preact&logoColor=white)](https://preactjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Sobre

Este é o frontend da aplicação Buy Me a Coffee, uma interface web moderna construída com Astro e Preact que permite aos usuários interagir com o smart contract Soroban na rede Stellar de forma intuitiva e segura.

## ✨ Funcionalidades

- 🎨 **Design Moderno**: Interface responsiva com Tailwind CSS
- 🦊 **Multi-Carteira**: Suporte a Freighter, Albedo e outras carteiras Stellar
- ⚡ **Performance**: Otimizado com Astro para carregamento rápido
- 📱 **Mobile-First**: Experiência otimizada para dispositivos móveis
- 🔄 **Tempo Real**: Atualizações automáticas do saldo e apoiadores
- 🎯 **UX Intuitiva**: Fluxo simples para comprar cafés
- 🔐 **Seguro**: Integração segura com carteiras Stellar

## 🏗️ Arquitetura

### 📁 Estrutura de Pastas

```text
frontend/
├── 📁 src/
│   ├── 📁 components/              # Componentes Preact
│   │   ├── CoffeeApp.tsx          # App principal
│   │   └── CoffeeForm.tsx         # Formulário de compra
│   ├── 📁 lib/                    # Utilitários e clientes
│   │   ├── coffee-transaction.ts  # Lógica de transações
│   │   ├── contract-client.ts     # Cliente do contrato
│   │   ├── wallet.ts              # Configuração da carteira
│   │   └── utils.ts               # Funções utilitárias
│   ├── 📁 layouts/                # Layouts Astro
│   │   └── Layout.astro           # Layout principal
│   ├── 📁 pages/                  # Páginas da aplicação
│   │   └── index.astro            # Página inicial
│   └── polyfills.ts               # Polyfills para browser
├── 📁 public/                     # Arquivos estáticos
├── package.json                   # Dependências
├── astro.config.mjs              # Configuração do Astro
├── tailwind.config.mjs           # Configuração do Tailwind
└── tsconfig.json                 # Configuração do TypeScript
```

### 🧩 Componentes Principais

#### `CoffeeApp.tsx` - Aplicação Principal

- Gerenciamento de estado global
- Carregamento de dados do blockchain
- Coordenação entre componentes
- Dashboard com estatísticas

#### `CoffeeForm.tsx` - Formulário de Compra

- Seleção de quantidade de cafés
- Integração com carteiras
- Feedback visual das transações
- Tratamento de erros

### 📚 Bibliotecas e Utilitários

#### `coffee-transaction.ts` - Lógica de Transações

```typescript
export async function buyCoffeeTransaction(
  amount: number,
  callbacks: CoffeeTransactionCallbacks
): Promise<CoffeeTransactionResult>;
```

#### `contract-client.ts` - Cliente do Contrato

```typescript
const createContractClient = () => {
  return new Client({
    contractId: networks.testnet.contractId,
    networkPassphrase: networks.testnet.networkPassphrase,
    rpcUrl: "https://soroban-testnet.stellar.org",
    signTransaction, // Função de assinatura
  });
};
```

#### `wallet.ts` - Configuração da Carteira

```typescript
export function walletKit() {
  return new StellarWalletsKit({
    network: WalletNetwork.TESTNET,
    selectedWalletId: "freighter",
    modules: allowAllModules(),
  });
}
```

## 🚀 Começando

### 📋 Pré-requisitos

- 📦 [Node.js](https://nodejs.org/) (versão 18+)
- 🧶 [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- 🦊 [Freighter Wallet](https://freighter.app/) (extensão do navegador)

### 🔧 Instalação

1. **Navegue para o diretório do frontend**

   ```bash
   cd frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o ambiente (opcional)**

   ```bash
   cp env.example .env
   # Edite .env se necessário
   ```

4. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**

   Abra [http://localhost:4321](http://localhost:4321) no seu navegador

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento com hot reload

# Build
npm run build        # Build de produção otimizada
npm run preview      # Preview da build de produção

# Linting e Formatação
npm run lint         # Verificar código com ESLint
npm run format       # Formatar código com Prettier

# Tipo checking
npm run type-check   # Verificar tipos TypeScript
```

## 🎨 Design System

### 🎨 Paleta de Cores

```css
/* Cores principais (tema café) */
--amber-400: #fbbf24    /* Botões primários */
--amber-500: #f59e0b    /* Hover states */
--orange-500: #f97316   /* Gradientes */
--orange-600: #ea580c   /* Hover gradientes */

/* Cores de apoio */
--blue-50: #eff6ff      /* Backgrounds informativos */
--blue-500: #3b82f6     /* Links e ações secundárias */
--green-500: #10b981    /* Estados de sucesso */
--red-500: #ef4444      /* Estados de erro */
```

### 🧩 Componentes de UI

#### Botões

```tsx
// Botão primário (comprar café)
<button class="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-lg hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200">
  Comprar Café ☕
</button>

// Botão secundário
<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200">
  Ação Secundária
</button>
```

#### Cards

```tsx
// Card de estatística
<div class="bg-white rounded-xl p-4 shadow-md border border-orange-100">
  <div class="flex items-center space-x-3">
    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
      <span class="text-blue-600 text-sm">💰</span>
    </div>
    <div>
      <p class="text-sm text-gray-500">Total Arrecadado</p>
      <p class="font-bold text-gray-800">{balance} XLM</p>
    </div>
  </div>
</div>
```

## 🔧 Configuração

### 🌐 Variáveis de Ambiente

```bash
# .env (opcional)
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
CONTRACT_ID=CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT
```

### ⚙️ Configuração do Astro

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [preact(), tailwind()],
  vite: {
    define: {
      global: "globalThis",
    },
    optimizeDeps: {
      include: ["buffer", "process"],
    },
  },
});
```

### 🎨 Configuração do Tailwind

```javascript
// tailwind.config.mjs
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        stellar: {
          blue: "#1e40af",
          purple: "#7c3aed",
        },
      },
    },
  },
  plugins: [],
};
```

## 🔄 Fluxo de Dados

### 📊 Estado da Aplicação

```typescript
// Estados principais
const [balance, setBalance] = useState<bigint | null>(null);
const [supporters, setSupporters] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [transactionStatus, setTransactionStatus] = useState<string>("");
```

### 🔄 Ciclo de Vida das Transações

1. **Inicialização**: Usuário clica em "Comprar Café"
2. **Seleção de Carteira**: Modal para escolher carteira
3. **Conexão**: Conecta com a carteira selecionada
4. **Preparação**: Cria e simula a transação
5. **Assinatura**: Usuário aprova na carteira
6. **Envio**: Transação é enviada para a rede
7. **Confirmação**: Aguarda confirmação da rede
8. **Atualização**: Recarrega dados da interface

### 📡 Integração com Smart Contract

```typescript
// Operações de leitura (sem carteira)
const contract = createContractClient();
const balance = await contract.get_balance();
const supporters = await contract.get_supporters();

// Operações de escrita (com carteira)
const result = await buyCoffeeTransaction(amount, {
  onStatusChange: (status) => setTransactionStatus(status),
  onSuccess: (amount) => onBuyCoffee(amount, "Anônimo"),
  onError: (error) => setTransactionStatus(`❌ ${error}`),
});
```

## 🦊 Integração com Carteiras

### 🔧 Carteiras Suportadas

- **Freighter** 🦊 - Carteira mais popular
- **Albedo** 🌟 - Carteira web
- **WalletConnect** 🔗 - Protocolo universal
- **xBull Wallet** 📱 - Carteira mobile

### 🎯 Modal de Seleção

```typescript
kit.openModal({
  onWalletSelected: async (option) => {
    console.log("Carteira selecionada:", option.name);
    await kit.setWallet(option.id);
    // ... lógica da transação
  },
  onClosed: (reason) => {
    console.log("Modal fechado:", reason);
  },
});
```

## 🧪 Testes e Desenvolvimento

### 🔍 Debug

```typescript
// Logs detalhados para desenvolvimento
console.log("Endereço conectado:", address.address);
console.log("Resultado da simulação:", result);
console.log("Transação enviada:", sentTx);
```

### 🌐 Testnet

- **Rede**: Stellar Testnet
- **RPC**: https://soroban-testnet.stellar.org
- **Explorer**: https://stellar.expert/explorer/testnet
- **Friendbot**: Para obter XLM de teste

### 🧪 Comandos de Teste

```bash
# Verificar tipos
npm run type-check

# Lint do código
npm run lint

# Build de teste
npm run build && npm run preview
```

## 🚀 Deploy

### 🌍 Plataformas Suportadas

#### Vercel

```bash
npm install -g vercel
vercel --prod
```

#### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### ⚙️ Configurações de Deploy

```bash
# Variáveis de ambiente para produção
STELLAR_NETWORK=mainnet
STELLAR_RPC_URL=https://soroban-mainnet.stellar.org
CONTRACT_ID=<seu-contract-id-mainnet>
```

## 🤝 Contribuindo

### 📝 Diretrizes

- **TypeScript**: Use tipagem estrita
- **Componentes**: Mantenha componentes pequenos e focados
- **Estilos**: Use Tailwind CSS classes
- **Estado**: Prefira useState para estado local
- **Async**: Use async/await para operações assíncronas

### 🔧 Padrões de Código

```typescript
// ✅ Bom: Componente tipado e focado
interface CoffeeFormProps {
  onBuyCoffee: (amount: number, name: string) => void;
}

export default function CoffeeForm({ onBuyCoffee }: CoffeeFormProps) {
  // ... implementação
}

// ✅ Bom: Função utilitária tipada
export function formatXLM(amount: string): string {
  const num = parseFloat(amount) / 10000000;
  return num.toFixed(2);
}
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](../LICENSE) para detalhes.

## 🙏 Agradecimentos

- ⚡ [Astro Team](https://astro.build/) - Framework web moderno
- ⚛️ [Preact Team](https://preactjs.com/) - Biblioteca reativa leve
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- 🦊 [Freighter Team](https://freighter.app/) - Carteira Stellar
- 🌟 [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) - Integração com carteiras

---

**Feito com ❤️ e muito ☕ para a comunidade Stellar**  
⭐ Se este frontend te ajudou, considere dar uma estrela no projeto!

### 🔗 Links Úteis

- 📖 [Documentação do Astro](https://docs.astro.build/)
- ⚛️ [Documentação do Preact](https://preactjs.com/guide/v10/getting-started)
- 🎨 [Documentação do Tailwind](https://tailwindcss.com/docs)
- 🦊 [Freighter Docs](https://docs.freighter.app/)
- 🌟 [Stellar Docs](https://developers.stellar.org/)
