#![no_std]
mod error;
mod storage_types;

use error::ContractError;
use soroban_sdk::{contract, contractimpl, token, Address, Env, Vec};
use storage_types::{DataKey, Supporter};

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    pub fn __constructor(env: Env, owner: Address, token_address: Address) {
        env.storage()
            .persistent()
            .set(&DataKey::TokenAddress, &token_address);
        env.storage().instance().set(&DataKey::Owner, &owner);
    }

    pub fn get_owner(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Owner).unwrap()
    }

    pub fn get_token_address(env: Env) -> Address {
        env.storage()
            .persistent()
            .get(&DataKey::TokenAddress)
            .unwrap()
    }

    pub fn get_balance(env: Env) -> Result<i128, ContractError> {
        let token_address = env
            .storage()
            .persistent()
            .get(&DataKey::TokenAddress)
            .unwrap();
        let contract_id = env.current_contract_address();
        let token_client = token::Client::new(&env, &token_address);
        let balance = token_client.try_balance(&contract_id).unwrap();

        if balance.is_err() {
            return Err(ContractError::FailedToGetBalance);
        }

        Ok(balance.unwrap())
    }

    pub fn get_supporters(env: Env) -> Result<Vec<Supporter>, ContractError> {
        let supporters: Vec<Supporter> = env
            .storage()
            .persistent()
            .get(&DataKey::Supporters)
            .unwrap_or(Vec::new(&env));

        if supporters.is_empty() {
            return Err(ContractError::NoSupporters);
        }

        Ok(supporters)
    }

    pub fn buy_coffee(env: Env, from: Address, amount: i128) -> Result<(), ContractError> {
        from.require_auth();

        let contract_id = env.current_contract_address();
        let token_address = env
            .storage()
            .persistent()
            .get(&DataKey::TokenAddress)
            .unwrap();

        let mut supporters: Vec<Supporter> = env
            .storage()
            .persistent()
            .get(&DataKey::Supporters)
            .unwrap_or(Vec::new(&env));

        if amount <= 0 {
            return Err(ContractError::InvalidAmount);
        }

        let token = token::Client::new(&env, &token_address);

        token.transfer(&from, &contract_id, &amount);

        supporters.push_front(Supporter {
            address: from,
            amount,
        });
        env.storage()
            .persistent()
            .set(&DataKey::Supporters, &supporters);

        Ok(())
    }

    pub fn withdraw(env: Env) -> Result<(), ContractError> {
        let owner: Address = env.storage().instance().get(&DataKey::Owner).unwrap();
        owner.require_auth();

        let contract_id = env.current_contract_address();
        let token_address = env
            .storage()
            .persistent()
            .get(&DataKey::TokenAddress)
            .unwrap();

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
