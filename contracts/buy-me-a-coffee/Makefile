default: build

all: test

test: build
	cargo test

build:
	stellar contract build
	@ls -l ../../target/wasm32v1-none/release/*.wasm

fmt:
	cargo fmt --all

clean:
	cargo clean

deploy:
	stellar contract deploy \
    --wasm ../../target/wasm32v1-none/release/by_me_a_coffee.wasm \
		--source $$(stellar keys secret maycon) \
		--network testnet \
		--alias test_mode \
		-- \
		--owner $$(stellar keys address maycon) --token-address $$(stellar contract id asset --asset native --network testnet)

get-owner:
	stellar contract invoke \
		--id test_mode \
		--network testnet \
		-- \
		get_owner

get-token-address:
	stellar contract invoke \
		--id test_mode \
		--network testnet \
		-- \
		get_token_address

get-balance:
	stellar contract invoke \
		--id test_mode \
		--network testnet \
		-- \
		get_balance

buy-coffee:
	stellar contract invoke \
		--id test_mode \
		--source $$(stellar keys secret maycon) \
		--network testnet \
		-- \
		buy_coffee --from $$(stellar keys address maycon) --amount 100000000

withdraw:
	stellar contract invoke \
		--id test_mode \
		--source $$(stellar keys secret testnet) \
		--network testnet \
		-- \
		withdraw

