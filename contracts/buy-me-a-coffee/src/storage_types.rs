use soroban_sdk::{contracttype, Address};

#[contracttype]
#[derive(Debug, Clone)]
pub enum DataKey {
    Owner,
    TokenAddress,
    Supporters,
}

#[contracttype]
#[derive(Debug, Clone)]
pub struct Supporter {
    pub address: Address,
    pub amount: i128,
}
