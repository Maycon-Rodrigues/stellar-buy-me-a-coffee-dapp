# ☕ Buy Me a Coffee - DApp Completo na Stellar

> 💫 Uma aplicação descentralizada completa na rede Stellar que permite receber doações em XLM de forma transparente e segura

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue?logo=stellar)](https://stellar.org/)
[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Sobre o Projeto

O **Buy Me a Coffee** é uma DApp completa desenvolvida para a blockchain Stellar usando Soroban smart contracts. Permite receber doações em XLM de forma descentralizada com uma interface web moderna e intuitiva.

### ✨ Funcionalidades

- 🎯 **Doações Simples**: Receba doações em XLM na rede Stellar
- 🔒 **Seguro**: Apenas o proprietário pode sacar os fundos
- 💰 **Transparente**: Consulte saldo e apoiadores em tempo real
- ⚡ **Eficiente**: Baixo custo de transação na rede Stellar
- 🌐 **Interface Web**: Frontend moderno e responsivo
- 🦊 **Multi-Carteira**: Suporte a Freighter, Albedo e outras carteiras Stellar

## 🏗️ Estrutura do Projeto

```text
.
├── 📁 contracts/                    # 🦀 Smart Contracts (Rust/Soroban)
│   └── buy-me-a-coffee/
│       ├── src/lib.rs              # 📝 Contrato principal
│       ├── Cargo.toml              # ⚙️ Configurações do contrato
│       └── Makefile                # 🔧 Comandos úteis
├── 📁 frontend/                     # 🌐 Interface Web (Astro/Preact)
│   ├── src/
│   │   ├── components/             # 🧩 Componentes React
│   │   ├── lib/                    # 📚 Utilitários e clientes
│   │   └── pages/                  # 📄 Páginas da aplicação
│   ├── package.json                # 📦 Dependências do frontend
│   └── README.md                   # 📖 Documentação do frontend
├── 📁 buymeacoffee-sdk/            # 📦 SDK gerado automaticamente
│   └── src/index.ts                # 🔌 Bindings TypeScript
├── Cargo.toml                      # 🔧 Workspace principal
└── README.md                       # 📖 Este arquivo
```

## 🚀 Começando

### 📋 Pré-requisitos

**Para o Smart Contract:**

- 🦀 [Rust](https://rustup.rs/) (versão 1.70+)
- 🌟 [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup)
- 💻 [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools)

**Para o Frontend:**

- 📦 [Node.js](https://nodejs.org/) (versão 18+)
- 🧶 [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- 🦊 [Freighter Wallet](https://freighter.app/) (extensão do navegador)

### 🔧 Instalação Rápida

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Maycon-Rodrigues/stellar-buy-me-a-coffee-dapp.git buymeacoffee
   cd buymeacoffee
   ```

2. **Configure o Smart Contract**

   ```bash
   # Compile o contrato
   stellar contract build

   # Use o Makefile para comandos específicos
   cd contracts/buy-me-a-coffee
   make deploy  # Deploy para testnet
   make get-balance  # Consultar saldo
   ```

3. **Configure o Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Acesse a aplicação**

   Abra [http://localhost:4321](http://localhost:4321) no seu navegador

## 📚 Documentação Detalhada

### 🦀 Smart Contract (Soroban)

- 📖 **[Documentação do Contrato](contracts/buy-me-a-coffee/README.md)**
- 🔧 **[Makefile Commands](contracts/buy-me-a-coffee/Makefile)**

### 🌐 Frontend (Astro/Preact)

- 📖 **[Documentação do Frontend](frontend/README.md)**
- 🎨 **[Componentes e Arquitetura](frontend/src/components/)**

### 📦 SDK TypeScript

- 🔌 **[SDK Gerado](buymeacoffee-sdk/)**
- 📝 **[Bindings TypeScript](buymeacoffee-sdk/src/index.ts)**

## 🎯 Funcionalidades Principais

### 🏗️ Smart Contract

#### ☕ Comprar Café (Doar)

```rust
buy_coffee(from: Address, amount: i128)
```

#### 💰 Sacar Fundos

```rust
withdraw() // Apenas proprietário
```

#### 📊 Consultar Dados

```rust
get_balance() -> i128
get_supporters() -> Vec<Supporter>
get_owner() -> Address
```

### 🌐 Frontend

#### 🎨 Interface Moderna

- Design responsivo com Tailwind CSS
- Componentes reutilizáveis em Preact
- Animações e feedback visual

#### 🦊 Integração com Carteiras

- Modal de seleção de carteira
- Suporte a múltiplas carteiras Stellar
- Feedback em tempo real das transações

#### 📊 Dashboard em Tempo Real

- Saldo total arrecadado
- Lista de apoiadores
- Histórico de transações

## 🔐 Segurança

- ✅ **Autenticação**: Todas as operações sensíveis requerem assinatura
- ✅ **Validação**: Valores de doação devem ser maiores que zero
- ✅ **Propriedade**: Apenas o proprietário pode sacar fundos
- ✅ **Tratamento de Erros**: Falhas são tratadas adequadamente
- ✅ **Rede Segura**: Transações na blockchain Stellar

## 🛠️ Desenvolvimento

### 🧪 Testes do Contrato

```bash
cd contracts/buy-me-a-coffee
make test
```

### 🌐 Desenvolvimento do Frontend

```bash
cd frontend
npm run dev     # Servidor de desenvolvimento
npm run build   # Build para produção
npm run preview # Preview da build
```

### 📦 Regenerar SDK

```bash
# Após mudanças no contrato
stellar contract bindings typescript \
  --contract-id CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT \
  --output-dir ./buymeacoffee-sdk \
  --overwrite
```

## 🌐 Deploy

### 🚀 Smart Contract (Testnet)

```bash
cd contracts/buy-me-a-coffee
make deploy
```

### 🌍 Frontend

O frontend pode ser deployado em qualquer plataforma que suporte sites estáticos:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Via GitHub Actions

## 🤝 Contribuindo

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

### 📝 Diretrizes de Contribuição

- **Smart Contract**: Siga as convenções do Rust e Soroban
- **Frontend**: Use TypeScript e siga os padrões do ESLint
- **Documentação**: Mantenha os READMEs atualizados
- **Testes**: Adicione testes para novas funcionalidades

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Feito com ❤️ para a comunidade Stellar**  
⭐ Se este projeto te ajudou, considere dar uma estrela!

### 🔗 Links Úteis

- 📖 [Documentação Stellar](https://developers.stellar.org/)
- 🌟 [Soroban Docs](https://soroban.stellar.org/)
- 🦊 [Freighter Wallet](https://freighter.app/)
- 🌐 [Stellar Expert](https://stellar.expert/) (Explorer)
