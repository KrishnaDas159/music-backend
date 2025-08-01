module sui_modules2::curve {
    use sui::tx_context::{TxContext, sender};
    use sui::object::{UID, ID, Self};
    use sui::transfer;
    use sui::coin;
    use sui::coin::{Coin, TreasuryCap};
    use sui::sui::SUI;

    use sui_modules2::content_token;
    use sui_modules2::vault;
    use sui_modules2::vault::Vault;

    /// Errors
    const E_INSUFFICIENT_PAYMENT: u64 = 100;
    const E_SUPPLY_TOO_LOW: u64 = 101;

    /// The bonding curve struct
    public struct Curve has key, store {
        id: UID,
        slope: u64,
        base_price: u64,
        total_supply: u64,
        vault_id: ID, // linked vault for payments
    }

    /// Create a new bonding curve linked to a vault
    public fun create_curve(
        slope: u64,
        base_price: u64,
        vault_id: ID,
        ctx: &mut TxContext
    ): Curve {
        Curve {
            id: object::new(ctx),
            slope,
            base_price,
            total_supply: 0,
            vault_id
        }
    }

    /// Initialize and share
    public fun initialize(
        slope: u64,
        base_price: u64,
        vault: &vault::Vault,
        ctx: &mut TxContext
    ) {
        let curve = Self::create_curve(
            slope,
            base_price,
            object::id(vault),
            ctx
        );
        transfer::public_share_object(curve);
    }

    /// Getter for slope
    public fun slope(curve: &Curve): u64 { curve.slope }

    /// Getter for base_price
    public fun base_price(curve: &Curve): u64 { curve.base_price }

    /// Getter for total_supply
    public fun get_total_supply(curve: &Curve): u64 { curve.total_supply }

    /// Price for given token index
    public fun get_curve_price(curve: &Curve, amount: u64): u64 {
        curve.base_price + curve.slope * amount
    }

    /// Total cost to mint a range of tokens
    public fun calculate_cost_to_mint(curve: &Curve, start: u64, end: u64): u64 {
        let n = end - start;
        let first = Self::get_curve_price(curve, start);
        let last = Self::get_curve_price(curve, end - 1);
        n * (first + last) / 2
    }

    /// Total return for burning a range of tokens
    public fun calculate_return_on_burn(curve: &Curve, start: u64, end: u64): u64 {
        let n = end - start;
        let first = Self::get_curve_price(curve, start);
        let last = Self::get_curve_price(curve, end - 1);
        n * (first + last) / 2
    }

    /// Mint tokens via bonding curve (requires payment)
    public fun mint(
        curve: &mut Curve,
        vault: &mut vault::Vault,
        registry: &mut content_token::TrackSupplyRegistry,
        treasury: &mut TreasuryCap<content_token::CONTENT_TOKEN>,
        creator_id: address,
        track_id: vector<u8>,
        mut payment: Coin<SUI>,
        amount: u64,
        ctx: &mut TxContext
    )
    {
        let start = curve.total_supply;
        let end = start + amount;

        let cost = Self::calculate_cost_to_mint(curve, start, end);

        // Ensure user paid enough
        assert!(coin::value(&payment) >= cost, E_INSUFFICIENT_PAYMENT);

        // Send cost to vault (this function must exist in vault.move)
        let vault_payment = coin::split(&mut payment, cost, ctx);
        vault::deposit_revenue(vault, vault_payment);


        // Mint content tokens to user
        content_token::mint_content_tokens(
            registry,        // &mut TrackSupplyRegistry
            treasury,        // &mut TreasuryCap<CONTENT_TOKEN>
            sender(ctx),     // to: address
            amount,          // amount
            creator_id,      // address of creator
            track_id,        // vector<u8>
            ctx
        );


        // Update supply
        curve.total_supply = end;

        // Return leftover SUI change to user
        if (coin::value(&payment) > 0) {
            transfer::public_transfer(payment, sender(ctx));
        } else {
            coin::destroy_zero(payment);
        }
    }

    /// Burn tokens via bonding curve (optional refund)
    public fun burn(
        curve: &mut Curve,
        vault: &mut vault::Vault,
        treasury: &mut TreasuryCap<content_token::CONTENT_TOKEN>,
        user_token: &mut content_token::ContentToken,
        amount: u64,
        ctx: &mut TxContext
    )
    {
        assert!(curve.total_supply >= amount, E_SUPPLY_TOO_LOW);

        let start = curve.total_supply - amount;
        let end = curve.total_supply;

        let refund = Self::calculate_return_on_burn(curve, start, end);

        // Burn content tokens from user
        content_token::burn_content_tokens(
            treasury,
            user_token,
            amount,
            ctx
        );


        // Update supply
        curve.total_supply = start;

        // Withdraw from vault and return refund (this function must exist in vault.move)
        let refund_coin = vault::withdraw_sui(vault, refund, ctx);
        transfer::public_transfer(refund_coin, sender(ctx));
    }
}
