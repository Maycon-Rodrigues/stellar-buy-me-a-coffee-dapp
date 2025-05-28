use soroban_sdk::contracterror;

#[contracterror]
#[derive(Clone, Debug, PartialEq)]
pub enum ContractError {
    FailedToGetBalance = 1,
    InvalidAmount = 2,
}
