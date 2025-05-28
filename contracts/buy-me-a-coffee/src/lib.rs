#![no_std]
mod error;

use error::ContractError;
use soroban_sdk::{contract, contractimpl, symbol_short, token, Address, Env, Symbol};

const OWNER: Symbol = symbol_short!("owner");
const TOKEN_ADDRESS: Symbol = symbol_short!("token");

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn __constructor(env: Env, owner: Address, token_address: Address) {
        env.storage()
            .persistent()
            .set(&TOKEN_ADDRESS, &token_address);
        env.storage().instance().set(&OWNER, &owner);
    }

    pub fn get_owner(env: Env) -> Address {
        env.storage().instance().get(&OWNER).unwrap()
    }

    pub fn get_token_address(env: Env) -> Address {
        env.storage().persistent().get(&TOKEN_ADDRESS).unwrap()
    }

    pub fn get_balance(env: Env) -> Result<i128, ContractError> {
        let token_address = env.storage().persistent().get(&TOKEN_ADDRESS).unwrap();
        let contract_id = env.current_contract_address();
        let token_client = token::Client::new(&env, &token_address);
        let balance = token_client.try_balance(&contract_id).unwrap();

        if balance.is_err() {
            return Err(ContractError::FailedToGetBalance);
        }

        Ok(balance.unwrap())
    }

    pub fn buy_coffee(env: Env, from: Address, amount: i128) -> Result<(), ContractError> {
        from.require_auth();

        let contract_id = env.current_contract_address();
        let token_address = env.storage().persistent().get(&TOKEN_ADDRESS).unwrap();

        if amount <= 0 {
            return Err(ContractError::InvalidAmount);
        }

        let token = token::Client::new(&env, &token_address);

        token.transfer(&from, &contract_id, &amount);

        Ok(())
    }

    pub fn withdraw(env: Env) -> Result<(), ContractError> {
        let owner: Address = env.storage().instance().get(&OWNER).unwrap();
        owner.require_auth();

        let contract_id = env.current_contract_address();
        let token_address = env.storage().persistent().get(&TOKEN_ADDRESS).unwrap();

        let token = token::Client::new(&env, &token_address);

        let balance = token.try_balance(&contract_id).unwrap();

        if balance.is_err() {
            return Err(ContractError::FailedToGetBalance);
        }

        let balance = balance.unwrap();

        token.transfer(&contract_id, &owner, &balance);

        Ok(())
    }
}
