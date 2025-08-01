module sui_modules2::uniswap_amm {
    use std::option;
    use 0x2::coin::{Self, Coin, TreasuryCap};
    use 0x2::balance::{Self, Balance};
    use 0x2::sui::SUI;
    use 0x2::event;
    use sui::tx_context;

    // Error codes
    const E_ZERO_AMOUNT: u64 = 0;
    const E_ZERO_LIQUIDITY: u64 = 2;
    const E_INSUFFICIENT_LIQUIDITY: u64 = 3;

    // One-time witness for currency creation
    public struct UNISWAP_AMM has drop {}

    // Liquidity pool struct
    public struct Pool has key, store {
        id: 0x2::object::UID,
        reserve_a: Balance<SUI>,
        reserve_b: Balance<SUI>,
        lp_treasury: TreasuryCap<UNISWAP_AMM>,
    }

    // LP token struct (used as an object)
    public struct LP_TOKEN has key, store {
        id: 0x2::object::UID,
        lp_balance: Balance<UNISWAP_AMM>,
    }

    // Event structs
    public struct AddLiquidity has copy, drop {
        provider: address,
        amount_a: u64,
        amount_b: u64,
        lp_minted: u64,
    }

    public struct RemoveLiquidity has copy, drop {
        provider: address,
        amount_a: u64,
        amount_b: u64,
        lp_burned: u64,
    }

    public struct Swap has copy, drop {
        sender: address,
        amount_in: u64,
        amount_out: u64,
        is_a_to_b: bool,
    }

    // Accessor function for lp_balance
    public fun get_lp_balance(lp_token: &LP_TOKEN): u64 {
        balance::value(&lp_token.lp_balance)
    }

    // Simple square root function (approximation for testing)
    fun sqrt(y: u64): u64 {
        if (y == 0) return 0;
        let mut x = y / 2 + 1;
        let mut y_temp = x;
        while (x * x > y) {
            y_temp = x;
            x = (x + y / x) / 2;
        };
        if (y_temp < x) y_temp else x
    }

    // Initialize the module with one-time witness
    fun init(witness: UNISWAP_AMM, ctx: &mut sui::tx_context::TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            9,
            b"LP_TOKEN",
            b"SUI-USDC LP Token",
            b"Uniswap-style AMM LP Token",
            std::option::none(),
            ctx
        );
        0x2::transfer::public_freeze_object(metadata);

        let pool = Pool {
            id: 0x2::object::new(ctx),
            reserve_a: balance::zero<SUI>(),
            reserve_b: balance::zero<SUI>(),
            lp_treasury: treasury_cap,
        };
        0x2::transfer::share_object(pool);
    }

    // Initialize the pool for testing
    #[test_only]
    public entry fun init_pool(ctx: &mut sui::tx_context::TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            UNISWAP_AMM {},
            9,
            b"LP_TOKEN",
            b"SUI-USDC LP Token",
            b"Uniswap-style AMM LP Token",
            std::option::none(),
            ctx
        );
        0x2::transfer::public_freeze_object(metadata);

        let pool = Pool {
            id: 0x2::object::new(ctx),
            reserve_a: balance::zero<SUI>(),
            reserve_b: balance::zero<SUI>(),
            lp_treasury: treasury_cap,
        };
        0x2::transfer::share_object(pool);
    }

    // Add liquidity to the pool
    public entry fun add_liquidity(
        pool: &mut Pool,
        coin_a: Coin<SUI>,
        coin_b: Coin<SUI>,
        ctx: &mut sui::tx_context::TxContext
    ) {
        let amount_a = coin::value(&coin_a);
        let amount_b = coin::value(&coin_b);
        assert!(amount_a > 0 && amount_b > 0, E_ZERO_AMOUNT);

        let lp_minted: u64;
        let total_supply = coin::total_supply(&pool.lp_treasury);

        if (total_supply == 0) {
            lp_minted = sqrt(amount_a * amount_b);
        } else {
            let lp_minted_a = (amount_a * total_supply) / balance::value(&pool.reserve_a);
            let lp_minted_b = (amount_b * total_supply) / balance::value(&pool.reserve_b);
            lp_minted = if (lp_minted_a < lp_minted_b) { lp_minted_a } else { lp_minted_b };
        };

        assert!(lp_minted > 0, E_ZERO_LIQUIDITY);

        // Update reserves
        balance::join(&mut pool.reserve_a, coin::into_balance(coin_a));
        balance::join(&mut pool.reserve_b, coin::into_balance(coin_b));

        // Mint LP tokens and wrap in LP_TOKEN object
        let lp_balance = coin::mint_balance(&mut pool.lp_treasury, lp_minted);
        let lp_token = LP_TOKEN {
            id: 0x2::object::new(ctx),
            lp_balance,
        };
        0x2::transfer::public_transfer(lp_token, sui::tx_context::sender(ctx));

        // Emit event
        event::emit(AddLiquidity {
            provider: sui::tx_context::sender(ctx),
            amount_a,
            amount_b,
            lp_minted,
        });
    }

    // Remove liquidity from the pool
    public entry fun remove_liquidity(
        pool: &mut Pool,
        lp_token: LP_TOKEN,
        ctx: &mut sui::tx_context::TxContext
    ) {
        let LP_TOKEN { id, lp_balance } = lp_token;
        0x2::object::delete(id);
        let lp_amount = balance::value(&lp_balance);
        assert!(lp_amount > 0, E_ZERO_AMOUNT);

        let total_supply = coin::total_supply(&pool.lp_treasury);
        let amount_a = (lp_amount * balance::value(&pool.reserve_a)) / total_supply;
        let amount_b = (lp_amount * balance::value(&pool.reserve_b)) / total_supply;
        assert!(amount_a > 0 && amount_b > 0, E_INSUFFICIENT_LIQUIDITY);

        // Burn LP tokens
        let lp_coin = coin::from_balance(lp_balance, ctx);
        coin::burn(&mut pool.lp_treasury, lp_coin);

        // Transfer tokens back
        0x2::transfer::public_transfer(
            coin::from_balance(balance::split(&mut pool.reserve_a, amount_a), ctx),
            sui::tx_context::sender(ctx)
        );
        0x2::transfer::public_transfer(
            coin::from_balance(balance::split(&mut pool.reserve_b, amount_b), ctx),
            sui::tx_context::sender(ctx)
        );

        // Emit event
        event::emit(RemoveLiquidity {
            provider: sui::tx_context::sender(ctx),
            amount_a,
            amount_b,
            lp_burned: lp_amount,
        });
    }

    // Swap tokens
    public entry fun swap(
        pool: &mut Pool,
        coin_in: Coin<SUI>,
        coin_out_min: u64,
        is_a_to_b: bool,
        ctx: &mut sui::tx_context::TxContext
    ) {
        let amount_in = coin::value(&coin_in);
        assert!(amount_in > 0, E_ZERO_AMOUNT);

        let (reserve_in, reserve_out) = if (is_a_to_b) {
            (balance::value(&pool.reserve_a), balance::value(&pool.reserve_b))
        } else {
            (balance::value(&pool.reserve_b), balance::value(&pool.reserve_a))
        };

        // Apply 0.3% fee
        let amount_in_with_fee = (amount_in * 997) / 1000;
        let amount_out = (amount_in_with_fee * reserve_out) / (reserve_in + amount_in_with_fee);
        assert!(amount_out >= coin_out_min && amount_out < reserve_out, E_INSUFFICIENT_LIQUIDITY);

        // Update reserves
        if (is_a_to_b) {
            balance::join(&mut pool.reserve_a, coin::into_balance(coin_in));
            0x2::transfer::public_transfer(
                coin::from_balance(balance::split(&mut pool.reserve_b, amount_out), ctx),
                sui::tx_context::sender(ctx)
            );
        } else {
            balance::join(&mut pool.reserve_b, coin::into_balance(coin_in));
            0x2::transfer::public_transfer(
                coin::from_balance(balance::split(&mut pool.reserve_a, amount_out), ctx),
                sui::tx_context::sender(ctx)
            );
        };

        // Emit event
        event::emit(Swap {
            sender: sui::tx_context::sender(ctx),
            amount_in,
            amount_out,
            is_a_to_b,
        });
    }

    // Get reserves
    public fun get_reserves(pool: &Pool): (u64, u64) {
        (balance::value(&pool.reserve_a), balance::value(&pool.reserve_b))
    }
}