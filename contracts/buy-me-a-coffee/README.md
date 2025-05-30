# 🦀 Buy Me a Coffee - Smart Contract

> Smart contract Soroban desenvolvido em Rust para receber doações na rede Stellar

[![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Soroban](https://img.shields.io/badge/Soroban-Stellar-blue)](https://soroban.stellar.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)

## 📋 Sobre

Este é o smart contract principal da aplicação Buy Me a Coffee, desenvolvido em Rust usando o framework Soroban da Stellar. Permite receber doações em XLM de forma descentralizada e segura.

## ✨ Funcionalidades

- 🎯 **Doações Simples**: Receba doações em XLM token Stellar
- 🔒 **Seguro**: Apenas o proprietário pode sacar os fundos
- 💰 **Transparente**: Consulte o saldo a qualquer momento
- 👥 **Histórico**: Armazena lista de apoiadores
- ⚡ **Eficiente**: Baixo custo de transação na rede Stellar
- 🛡️ **Validação**: Verificações de segurança integradas

## 🏗️ Arquitetura

### 📁 Estrutura do Contrato

```text
src/
├── lib.rs              # 📝 Contrato principal e funções públicas
├── storage_types.rs    # 🗃️ Tipos de dados e estruturas
└── error.rs           # ⚠️ Definições de erros customizados
```

### 🧩 Componentes Principais

#### `lib.rs` - Contrato Principal

```rust
#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    // Construtor
    pub fn __constructor(env: Env, owner: Address, token_address: Address)

    // Consultas (view functions)
    pub fn get_owner(env: Env) -> Address
    pub fn get_token_address(env: Env) -> Address
    pub fn get_balance(env: Env) -> Result<i128, ContractError>
    pub fn get_supporters(env: Env) -> Result<Vec<Supporter>, ContractError>

    // Transações (state-changing functions)
    pub fn buy_coffee(env: Env, from: Address, amount: i128) -> Result<(), ContractError>
    pub fn withdraw(env: Env) -> Result<(), ContractError>
}
```

#### `storage_types.rs` - Tipos de Dados

```rust
#[contracttype]
pub enum DataKey {
    Owner,           // Proprietário do contrato
    TokenAddress,    // Endereço do token aceito (XLM)
    Supporters,      // Lista de apoiadores
}

#[contracttype]
pub struct Supporter {
    pub address: Address,  // Endereço do apoiador
    pub amount: i128,      // Quantidade total doada
}
```

#### `error.rs` - Tratamento de Erros

```rust
#[contracterror]
pub enum ContractError {
    FailedToGetBalance = 1,  // Erro ao consultar balance
    InvalidAmount = 2,       // Quantidade inválida (≤ 0)
    NoSupporters = 3,        // Nenhum apoiador encontrado
}
```

## 🚀 Começando

### 📋 Pré-requisitos

- 🦀 [Rust](https://rustup.rs/) (versão 1.70+)
- 🌟 [Soroban CLI](https://soroban.stellar.org/docs/getting-started/setup)
- 💻 [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools)

### 🔧 Instalação

1. **Navegue para o diretório do contrato**

   ```bash
   cd contracts/buy-me-a-coffee
   ```

2. **Compile o contrato**

   ```bash
   stellar contract build
   ```

3. **Configure suas chaves (primeira vez)**

   ```bash
   stellar keys generate maycon --network testnet
   stellar keys fund maycon --network testnet
   ```

4. **Deploy no testnet**
   ```bash
   make deploy
   ```

## 📦 Comandos do Makefile

### 🔧 Build e Deploy

```bash
# Compilar o contrato
make build

# Deploy no testnet
make deploy

# Deploy com parâmetros customizados
make deploy OWNER=GXXX... TOKEN=CXXX...
```

### 📊 Consultas (View Functions)

```bash
# Consultar proprietário
make get-owner

# Consultar saldo atual
make get-balance

# Consultar lista de apoiadores
make get-supporters

# Consultar endereço do token
make get-token-address
```

### 💰 Transações (State-Changing Functions)

```bash
# Comprar café (doar)
make buy-coffee AMOUNT=50000000  # 5 XLM em stroops

# Sacar fundos (apenas proprietário)
make withdraw
```

### 🧪 Testes

```bash
# Executar testes unitários
make test

# Executar testes com output detalhado
cargo test -- --nocapture
```

## 🎯 Funções Detalhadas

### 🏗️ Construtor

```rust
pub fn __constructor(env: Env, owner: Address, token_address: Address)
```

**Descrição**: Inicializa o contrato com o proprietário e endereço do token
**Parâmetros**:

- `owner`: Endereço do proprietário que pode sacar fundos
- `token_address`: Endereço do token que será aceito como doação (XLM)

**Exemplo de uso**:

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/buy_me_a_coffee.wasm \
  --source maycon \
  --network testnet \
  -- \
  --owner GBAU5NOADMJAISCOIQV2WPN7A4WJ4WB6WMXIUO4NGLP4JVB72RMLMZCY \
  --token_address CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAOBKKG6ZHPDS
```

### ☕ Comprar Café (Doar)

```rust
pub fn buy_coffee(env: Env, from: Address, amount: i128) -> Result<(), ContractError>
```

**Descrição**: Permite que usuários façam doações
**Parâmetros**:

- `from`: Endereço de quem está doando
- `amount`: Quantidade de tokens a doar (em stroops)

**Validações**:

- ✅ Quantidade deve ser maior que zero
- ✅ Endereço `from` deve assinar a transação
- ✅ Usuário deve ter saldo suficiente

**Exemplo de uso**:

```bash
stellar contract invoke \
  --id CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT \
  --source maycon \
  --network testnet \
  -- \
  buy_coffee \
  --from GBAU5NOADMJAISCOIQV2WPN7A4WJ4WB6WMXIUO4NGLP4JVB72RMLMZCY \
  --amount 50000000
```

### 💰 Sacar Fundos

```rust
pub fn withdraw(env: Env) -> Result<(), ContractError>
```

**Descrição**: Permite ao proprietário sacar todos os fundos
**Restrições**:

- ⚠️ Apenas o proprietário pode executar
- ⚠️ Deve haver saldo disponível

**Exemplo de uso**:

```bash
stellar contract invoke \
  --id CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT \
  --source maycon \
  --network testnet \
  -- \
  withdraw
```

### 📊 Consultar Saldo

```rust
pub fn get_balance(env: Env) -> Result<i128, ContractError>
```

**Descrição**: Retorna o saldo atual do contrato
**Retorno**: Quantidade de tokens no contrato (em stroops)

**Exemplo de uso**:

```bash
stellar contract invoke \
  --id CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT \
  --source maycon \
  --network testnet \
  -- \
  get_balance
```

### 👥 Consultar Apoiadores

```rust
pub fn get_supporters(env: Env) -> Result<Vec<Supporter>, ContractError>
```

**Descrição**: Retorna a lista de apoiadores e suas contribuições
**Retorno**: Vector de estruturas `Supporter`

**Exemplo de uso**:

```bash
stellar contract invoke \
  --id CBLX7FASEAQCOYPEVZN2ZUTOK2AWJAD7BYE5HFTQPAJGESOPFFIOFWAT \
  --source maycon \
  --network testnet \
  -- \
  get_supporters
```

## 🔐 Segurança

### ✅ Validações Implementadas

- **Autenticação**: Todas as operações sensíveis requerem autenticação
- **Validação de Entrada**: Valores de doação devem ser maiores que zero
- **Controle de Propriedade**: Apenas o proprietário pode sacar fundos
- **Tratamento de Erros**: Falhas são tratadas adequadamente

### 🛡️ Boas Práticas

```rust
// ✅ Sempre validar entradas
if amount <= 0 {
    return Err(ContractError::InvalidAmount);
}

// ✅ Sempre autenticar operações sensíveis
from.require_auth();

// ✅ Usar Result<T, E> para tratamento de erros
pub fn buy_coffee(env: Env, from: Address, amount: i128) -> Result<(), ContractError>
```

## 🧪 Testes

### 📝 Estrutura de Testes

```rust
#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_buy_coffee() {
        // Setup do ambiente de teste
        let env = Env::default();
        let contract_id = env.register_contract(None, Contract);

        // Teste da funcionalidade
        // ...
    }
}
```

### 🔍 Executar Testes

```bash
# Testes unitários
cargo test

# Testes com output detalhado
cargo test -- --nocapture

# Teste específico
cargo test test_buy_coffee

# Testes com coverage
cargo test --coverage
```

## 🌐 Deploy

### 🧪 Testnet

```bash
# 1. Configurar chaves
stellar keys generate maycon --network testnet
stellar keys fund maycon --network testnet

# 2. Build do contrato
stellar contract build

# 3. Deploy
make deploy

# 4. Verificar deploy
make get-owner
```

### 🌍 Mainnet

```bash
# 1. Configurar chaves de produção
stellar keys generate production --network mainnet

# 2. Atualizar Makefile para mainnet
# STELLAR_NETWORK = mainnet
# SOROBAN_RPC_URL = https://soroban-mainnet.stellar.org

# 3. Deploy
make deploy OWNER=<seu-endereço-mainnet>
```

### 📋 Configurações de Deploy

```makefile
# Makefile - Configurações principais
STELLAR_NETWORK = testnet
SOROBAN_RPC_URL = https://soroban-testnet.stellar.org
OWNER = GBAU5NOADMJAISCOIQV2WPN7A4WJ4WB6WMXIUO4NGLP4JVB72RMLMZCY
TOKEN_ADDRESS = CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAOBKKG6ZHPDS
```

## 📊 Monitoramento

### 🔍 Logs e Debug

```rust
// Logs para desenvolvimento
log!(env, "Coffee purchased: {} stroops from {}", amount, from);
log!(env, "Current balance: {}", current_balance);
```

### 📈 Métricas

- **Saldo Total**: `get_balance()`
- **Número de Apoiadores**: `get_supporters().len()`
- **Maior Doação**: Calculado a partir dos apoiadores
- **Doação Média**: Total / Número de apoiadores

## 🔧 Desenvolvimento

### 🛠️ Setup do Ambiente

```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Instalar target wasm32
rustup target add wasm32-unknown-unknown

# Instalar Stellar CLI
curl -sSL https://stellar.org/install.sh | bash
```

### 📝 Convenções de Código

```rust
// ✅ Bom: Função pública bem documentada
/// Permite que usuários comprem café (façam doações)
///
/// # Argumentos
/// * `from` - Endereço do doador
/// * `amount` - Quantidade em stroops
///
/// # Erros
/// * `InvalidAmount` - Se amount <= 0
pub fn buy_coffee(env: Env, from: Address, amount: i128) -> Result<(), ContractError>

// ✅ Bom: Validação de entrada
if amount <= 0 {
    return Err(ContractError::InvalidAmount);
}

// ✅ Bom: Autenticação obrigatória
from.require_auth();
```

## 🤝 Contribuindo

### 📝 Diretrizes

- **Rust**: Siga as convenções do Rust e Clippy
- **Testes**: Adicione testes para novas funcionalidades
- **Documentação**: Documente funções públicas
- **Segurança**: Sempre validar entradas e autenticar operações

### 🔧 Workflow de Contribuição

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Implemente** com testes
4. **Execute** `cargo test` e `cargo clippy`
5. **Submeta** um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](../../LICENSE) para detalhes.

## 🙏 Agradecimentos

- 🌟 [Stellar Development Foundation](https://stellar.org/)
- 🦀 [Rust Community](https://www.rust-lang.org/community)
- ⚡ [Soroban Team](https://soroban.stellar.org/)

---

**Feito com ❤️ e muito ☕ para a comunidade Stellar**  
⭐ Se este contrato te ajudou, considere dar uma estrela no projeto!

### 🔗 Links Úteis

- 📖 [Documentação Soroban](https://soroban.stellar.org/docs)
- 🦀 [Rust Book](https://doc.rust-lang.org/book/)
- 🌟 [Stellar Docs](https://developers.stellar.org/)
- 🧪 [Soroban Examples](https://github.com/stellar/soroban-examples)
- 🌐 [Stellar Expert](https://stellar.expert/) (Explorer)
