# ☕ Buy Me a Coffee - Contrato Soroban

> 💫 Um contrato inteligente na rede Stellar que permite receber doações em tokens de forma descentralizada

[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue?logo=stellar)](https://stellar.org/)
[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Sobre o Projeto

O **Buy Me a Coffee** é um contrato inteligente desenvolvido em Rust para a blockchain Stellar usando o framework Soroban. Ele permite receber doações em tokens de forma transparente e descentralizada.

### ✨ Funcionalidades

- 🎯 **Doações Simples**: Receba doações em XLM token Stellar
- 🔒 **Seguro**: Apenas o proprietário pode sacar os fundos
- 💰 **Transparente**: Consulte o saldo a qualquer momento
- ⚡ **Eficiente**: Baixo custo de transação na rede Stellar

## 🏗️ Estrutura do Projeto

```text
.
├── contracts/
│   └── by-me-a-coffee/
│       ├── src/
│       │   └── lib.rs          # 📝 Contrato principal
│       └── Cargo.toml          # ⚙️ Configurações do contrato
├── Cargo.toml                  # 🔧 Workspace principal
└── README.md                   # 📖 Este arquivo
```

## 🚀 Começando

### 📋 Pré-requisitos

- 🦀 [Rust](https://rustup.rs/) (versão 1.70+)
- 🌟 [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup)
- 💻 [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools)

### 🔧 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Maycon-Rodrigues/stellar-buy-me-a-coffee-dapp.git buymeacoffee
   cd buymeacoffee
   ```

2. **Compile o contrato**

   ```bash
   stellar contract build
   ```

3. **Use o MakeFile**

   ```bash
   cd buymeacoffee/contracts/buy-me-a-cofee
   make {variavel}
   ``
   ```

## 📚 Como Usar

### 🎯 Funções Principais

#### 🏗️ Construtor

```rust
__constructor(env: Env, owner: Address, token_address: Address)
```

- **Descrição**: Inicializa o contrato com o proprietário e endereço do token
- **Parâmetros**:
  - `owner`: Endereço do proprietário que pode sacar fundos
  - `token_address`: Endereço do token que será aceito como doação

#### ☕ Comprar Café (Doar)

```rust
buy_coffee(env: Env, from: Address, amount: i128)
```

- **Descrição**: Permite que usuários façam doações
- **Parâmetros**:
  - `from`: Endereço de quem está doando
  - `amount`: Quantidade de tokens a doar

#### 💰 Sacar Fundos

```rust
withdraw(env: Env)
```

- **Descrição**: Permite ao proprietário sacar todos os fundos
- **Restrição**: ⚠️ Apenas o proprietário pode executar

#### 📊 Consultar Saldo

```rust
get_balance(env: Env) -> i128
```

- **Descrição**: Retorna o saldo atual do contrato
- **Retorno**: Quantidade de tokens no contrato

#### 👤 Obter Proprietário

```rust
get_owner(env: Env) -> Address
```

- **Descrição**: Retorna o endereço do proprietário
- **Retorno**: Endereço do proprietário

#### 🪙 Obter Token

```rust
get_token_address(env: Env) -> Address
```

- **Descrição**: Retorna o endereço do token aceito
- **Retorno**: Endereço do token

## 🔐 Segurança

- ✅ **Autenticação**: Todas as operações sensíveis requerem autenticação
- ✅ **Validação**: Valores de doação devem ser maiores que zero
- ✅ **Propriedade**: Apenas o proprietário pode sacar fundos
- ✅ **Tratamento de Erros**: Falhas são tratadas adequadamente

## 🛠️ Desenvolvimento

### 🧪 Use o MakeFile

```bash
  cd bymeacoffee/contracts/by-me-a-cofee
  make {variavel}
```

## 🤝 Contribuindo

1. 🍴 Faça um fork do projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔄 Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- 🌟 [Stellar Development Foundation](https://stellar.org/)
- 🦀 [Rust Community](https://www.rust-lang.org/community)
- ☕ Todos que compraram um café! ☕

---

**Feito com ❤️ para a comunidade Stellar**  
⭐ Se este projeto te ajudou, considere dar uma estrela!
