module sui_modules2::content_token {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::sui::SUI;
    use std::option;
    use std::vector;
    use std::string;

    /// Token type for the fungible ContentToken
    public struct CONTENT_TOKEN has drop {}

    /// Struct to hold token metadata and balance
    public struct ContentToken has key, store {
        id: UID,
        balance: Balance<CONTENT_TOKEN>,
        creator_id: address,
        track_id: vector<u8>, // ID for song/video content
    }

    /// Capability to mint/burn tokens, owned by the contract deployer
    public struct AdminCap has key { id: UID }

    /// Total supply per track_id
    public struct TrackSupply has key, store {
        id: UID,
        track_id: vector<u8>,
        total_supply: u64,
    }

    /// Global object holding total supplies (indexed off-chain)
    public struct TrackSupplyRegistry has key, store {
        id: UID,
        supplies: vector<TrackSupply>,
    }

    /// Global registry object (one per module deployment)
    public fun create_supply_registry(ctx: &mut TxContext): TrackSupplyRegistry {
        TrackSupplyRegistry {
            id: object::new(ctx),
            supplies: vector::empty<TrackSupply>(),
        }
    }

    /// Initialize the token
    fun init(_otw: CONTENT_TOKEN, ctx: &mut TxContext) {
        let admin_cap = AdminCap { id: object::new(ctx) };
        transfer::transfer(admin_cap, sui::tx_context::sender(ctx));

        let (treasury_cap, metadata) = coin::create_currency<CONTENT_TOKEN>(
            _otw, // Witness first!
            0,    // decimals
            b"CTK", // symbol
            b"Content Token", // name
            b"Fungible token for content revenue rights", // description
            option::none(), // no icon URL
            ctx
        );

        transfer::public_share_object(treasury_cap);
        transfer::public_transfer(metadata, sui::tx_context::sender(ctx));
    }




    /// Mint ContentTokens and update track supply
    public entry fun mint_content_tokens(
        registry: &mut TrackSupplyRegistry,
        treasury: &mut TreasuryCap<CONTENT_TOKEN>,
        to: address,
        amount: u64,
        creator_id: address,
        track_id: vector<u8>,
        ctx: &mut TxContext
    ) {
        // Keep a copy for supply tracking BEFORE moving into struct
        let track_id_for_supply = track_id;

        // Mint fungible tokens
        let coin = coin::mint(treasury, amount, ctx);
        let balance = coin::into_balance(coin);

        // Create the ContentToken object
        let token = ContentToken {
            id: object::new(ctx),
            balance,
            creator_id,
            track_id: track_id_for_supply, // moved here
        };

        // Transfer token to recipient
        transfer::transfer(token, to);

        // Update total supply using the saved copy
        update_track_supply(registry, track_id_for_supply, amount, ctx);
    }




    /// Update total supply per track_id
    fun update_track_supply(
        registry: &mut TrackSupplyRegistry,
        track_id: vector<u8>,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let supplies = &mut registry.supplies;
        let len = vector::length(supplies);

        let mut i = 0;
        let mut found = false;

        while (i < len) {
            let supply_ref = vector::borrow_mut(supplies, i);
            if (supply_ref.track_id == track_id) {
                supply_ref.total_supply = supply_ref.total_supply + amount;
                found = true;
                break;
            };
            i = i + 1;
        };

        if (!found) {
            let new_supply = TrackSupply {
                id: object::new(ctx),
                track_id: track_id,
                total_supply: amount,
            };
            vector::push_back(supplies, new_supply);
        }
    }

    /// Burn tokens and reduce total supply
    public fun burn_content_tokens_internal(
        treasury: &mut TreasuryCap<CONTENT_TOKEN>,
        token: &mut ContentToken,
        amount: u64,
        ctx: &mut TxContext
    ) {
        let burn_balance = balance::split(&mut token.balance, amount);
        let burn_coin = coin::from_balance(burn_balance, ctx);
        coin::burn(treasury, burn_coin);
    }

    public entry fun burn_content_tokens(
        treasury: &mut TreasuryCap<CONTENT_TOKEN>,
        token: &mut ContentToken,
        amount: u64,
        ctx: &mut TxContext
    ) {
        burn_content_tokens_internal(treasury, token, amount, ctx);
    }


    fun reduce_track_supply(
        registry: &mut TrackSupplyRegistry,
        track_id: vector<u8>,
        amount: u64
    ) {
        let supplies = &mut registry.supplies;
        let len = vector::length(supplies);

        let mut i = 0;
        while (i < len) {
            let supply_ref = vector::borrow_mut(supplies, i);
            if (supply_ref.track_id == track_id) {
                supply_ref.total_supply = supply_ref.total_supply - amount;
                break;
            };
            i = i + 1;
        };
    }

    /// Get user balance
    public fun get_balance(token: &ContentToken): u64 {
        balance::value(&token.balance)
    }

    public fun get_creator_id(token: &ContentToken): address {
        token.creator_id
    }

    public fun get_track_id(token: &ContentToken): vector<u8> {
        token.track_id
    }

    /// Query total supply for a track
    public fun get_total_supply(
        registry: &TrackSupplyRegistry,
        track_id: vector<u8>
    ): u64 {
        let supplies = &registry.supplies;
        let len = vector::length(supplies);
        let mut i = 0;
        while (i < len) {
            let s = vector::borrow(supplies, i);
            if (s.track_id == track_id) {
                return s.total_supply;
            };
            i = i + 1;
        };
        0
    }
}
