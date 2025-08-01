module sui_modules2::vault {
    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::sui::SUI;
    use sui_modules2::content_token::{Self, ContentToken, CONTENT_TOKEN, burn_content_tokens, get_balance};
    use sui::coin::{Self, Coin, TreasuryCap};
    use std::vector;

    /// Errors
    const EZeroAmount: u64 = 0;
    const EInsufficientFunds: u64 = 1;
    const EInvalidBurnAmount: u64 = 2;
    const EUnauthorized: u64 = 3;

    /// Vault object — one per song
    public struct Vault has key, store {
        id: UID,
        track_id: vector<u8>,         // Song ID
        creator: address,             // Creator address
        total_supply: u64,            // Total CONTENT_TOKEN supply for this song
        total_funds: Balance<SUI>,    // SUI funds in vault
    }

    /// Registry storing vault addresses (safe for vector)
    public struct VaultRegistry has key, store {
        id: UID,
        vault_ids: vector<address>,   // Object IDs of vaults
    }

    /// Events
    public struct VaultCreated has copy, drop {
        track_id: vector<u8>,
        creator: address,
        vault_id: address,
    }

    public struct RevenueDeposited has copy, drop {
        track_id: vector<u8>,
        amount: u64,
    }

    public struct RewardsClaimed has copy, drop {
        track_id: vector<u8>,
        user: address,
        burned_tokens: u64,
        withdrawn_sui: u64,
    }

    public struct CreatorWithdrawal has copy, drop {
        track_id: vector<u8>,
        creator: address,
        withdrawn_sui: u64,
    }

    /// Math helper
    fun mul_div(a: u64, b: u64, c: u64): u64 {
        (a * b) / c
    }


    /// Generic withdraw function for other modules like bonding curve
    public fun withdraw_sui(
        vault: &mut Vault,
        amount: u64,
        ctx: &mut TxContext
    ): Coin<SUI> {
        assert!(amount > 0 && amount <= balance::value(&vault.total_funds), EInsufficientFunds);

        let bal = balance::split(&mut vault.total_funds, amount);
        coin::from_balance(bal, ctx)
    }


    /// Create registry
    public fun create_registry(ctx: &mut TxContext): VaultRegistry {
        VaultRegistry {
            id: object::new(ctx),
            vault_ids: vector::empty<address>(),
        }
    }

    /// Create vault for a song
    public entry fun create_vault(
        registry: &mut VaultRegistry,
        track_id: vector<u8>,
        creator: address,
        ctx: &mut TxContext
    ) {
        let vault = Vault {
            id: object::new(ctx),
            track_id,
            creator,
            total_supply: 0,
            total_funds: balance::zero(),
        };

        let vault_id = sui::object::uid_to_address(&vault.id);
        vector::push_back(&mut registry.vault_ids, vault_id);

        event::emit(VaultCreated {
            track_id,
            creator,
            vault_id,
        });

        // Share vault object so others can interact
        transfer::share_object(vault);
    }

    /// Deposit revenue into a vault


    public entry fun deposit_revenue(
        vault: &mut Vault,
        coin_in: sui::coin::Coin<SUI>
    )
    {
        let amount = coin::into_balance(coin_in);
        assert!(balance::value(&amount) > 0, EZeroAmount);

        balance::join(&mut vault.total_funds, amount);
        event::emit(RevenueDeposited {
            track_id: vault.track_id,
            amount: balance::value(&vault.total_funds),
        });
    }


    /// Update total supply (when minting new tokens for this song)
    public fun update_supply(vault: &mut Vault, new_tokens: u64) {
        vault.total_supply = vault.total_supply + new_tokens;
    }

    /// Withdraw revenue by burning tokens
    public entry fun withdraw_after_burn(
        vault: &mut Vault,
        token: &mut ContentToken,
        burn_amount: u64,
        treasury: &mut TreasuryCap<CONTENT_TOKEN>,
        ctx: &mut TxContext
    ) {
        assert!(vault.total_supply > 0, EInsufficientFunds);
        assert!(burn_amount > 0 && burn_amount <= get_balance(token), EInvalidBurnAmount);

        // Burn tokens
        content_token::burn_content_tokens_internal(treasury, token, burn_amount, ctx);


        // Calculate proportional SUI
        let total_funds_val = balance::value(&vault.total_funds);
        let withdraw_amount = mul_div(total_funds_val, burn_amount, vault.total_supply);

        assert!(withdraw_amount > 0, EInsufficientFunds);

        // Reduce vault total supply
        vault.total_supply = vault.total_supply - burn_amount;

        // Split and transfer funds to user
        let sui_funds = balance::split(&mut vault.total_funds, withdraw_amount);
        let coin_out = coin::from_balance(sui_funds, ctx);
        transfer::public_transfer(coin_out, sui::tx_context::sender(ctx));

        event::emit(RewardsClaimed {
            track_id: vault.track_id,
            user: sui::tx_context::sender(ctx),
            burned_tokens: burn_amount,
            withdrawn_sui: withdraw_amount,
        });
    }

    /// Creator withdrawal (no burn required)
    public entry fun creator_withdraw(
        vault: &mut Vault,
        amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(sui::tx_context::sender(ctx) == vault.creator, EUnauthorized);
        assert!(amount > 0 && amount <= balance::value(&vault.total_funds), EInsufficientFunds);

        let sui_funds = balance::split(&mut vault.total_funds, amount);
        let coin_out = coin::from_balance(sui_funds, ctx);
        transfer::public_transfer(coin_out, vault.creator);

        event::emit(CreatorWithdrawal {
            track_id: vault.track_id,
            creator: vault.creator,
            withdrawn_sui: amount,
        });
    }

    /// Getters
    public fun total_supply(vault: &Vault): u64 {
        vault.total_supply
    }

    public fun total_funds(vault: &Vault): u64 {
        balance::value(&vault.total_funds)
    }
}
