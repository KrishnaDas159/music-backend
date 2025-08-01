module sui_modules2::yield_protocol {
    use 0x2::object::{Self, UID};
    use 0x2::coin::{Self, Coin, TreasuryCap};
    use 0x2::balance::{Self, Balance};
    use 0x2::clock::{Clock, timestamp_ms};
    use 0x2::sui::SUI;
    use 0x2::tx_context::{TxContext, sender};
    use 0x2::transfer;
    use 0x2::event;

    // Error codes
    const E_NOT_ADMIN: u64 = 1;
    const E_INACTIVE: u64 = 2;
    const E_EXPIRED: u64 = 3;
    const E_INVALID_AMOUNT: u64 = 4;
    const E_ALREADY_WITHDRAWN: u64 = 5;

    // Events
    public struct StakeEvent has copy, drop {
        owner: address,
        amount: u64,
        staked_at_ms: u64,
    }

    public struct WithdrawEvent has copy, drop {
        owner: address,
        amount: u64,
        reward: u64,
    }

    public struct ActivateEvent has copy, drop {
        start_time_ms: u64,
        duration_ms: u64,
    }

    public struct DeactivateEvent has copy, drop {
        timestamp_ms: u64,
    }

    // Protocol configuration
    public struct YieldProtocol has key, store {
        id: UID,
        admin: address,
        active: bool,
        start_time_ms: u64,
        duration_ms: u64,
        apr: u64, // in basis points (500 = 5%)
        total_staked: u64,
        vault: Balance<SUI>,
    }

    // Stake data
    public struct Stake has key, store {
        id: UID,
        owner: address,
        amount: u64,
        staked_at_ms: u64,
    }

    // Getter for staked_at_ms
    public fun get_staked_at(stake: &Stake): u64 {
        stake.staked_at_ms
    }

    // Initialize a new protocol object (inactive)
    fun init(ctx: &mut TxContext) {
        let protocol = YieldProtocol {
            id: object::new(ctx),
            admin: sender(ctx),
            active: false,
            start_time_ms: 0,
            duration_ms: 0,
            apr: 500, // 5%
            total_staked: 0,
            vault: balance::zero(),
        };
        transfer::share_object(protocol);
    }

    // Activate the protocol for a certain duration (in seconds)
    public entry fun activate(protocol: &mut YieldProtocol, duration_secs: u64, clock: &Clock, ctx: &mut TxContext) {
        assert!(sender(ctx) == protocol.admin, E_NOT_ADMIN);
        assert!(duration_secs > 0, E_INVALID_AMOUNT);
        protocol.active = true;
        protocol.start_time_ms = timestamp_ms(clock);
        protocol.duration_ms = duration_secs * 1000;
        event::emit(ActivateEvent {
            start_time_ms: protocol.start_time_ms,
            duration_ms: protocol.duration_ms,
        });
    }

    // Stake SUI coins into the protocol
    public entry fun stake(protocol: &mut YieldProtocol, coin: Coin<SUI>, clock: &Clock, ctx: &mut TxContext) {
        assert!(protocol.active, E_INACTIVE);

        let now = timestamp_ms(clock);
        let end = protocol.start_time_ms + protocol.duration_ms;
        assert!(now < end, E_EXPIRED);

        let amount = coin::value(&coin);
        assert!(amount > 0, E_INVALID_AMOUNT);

        protocol.total_staked = protocol.total_staked + amount;
        balance::join(&mut protocol.vault, coin::into_balance(coin));

        let stake = Stake {
            id: object::new(ctx),
            owner: sender(ctx),
            amount,
            staked_at_ms: now,
        };
        event::emit(StakeEvent {
            owner: sender(ctx),
            amount,
            staked_at_ms: now,
        });
        transfer::public_transfer(stake, sender(ctx));
    }

    // Withdraw original stake + yield rewards
    public entry fun withdraw(
        protocol: &mut YieldProtocol,
        stake: Stake,
        clock: &Clock,
        treasury: &mut TreasuryCap<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(sender(ctx) == stake.owner, E_NOT_ADMIN);
        assert!(stake.amount > 0, E_ALREADY_WITHDRAWN);

        let current_time = timestamp_ms(clock);
        let protocol_end_time = protocol.start_time_ms + protocol.duration_ms;
        let end_time = if (current_time > protocol_end_time) {
            protocol_end_time
        } else {
            current_time
        };

        let duration_ms = end_time - stake.staked_at_ms;
        let ms_per_year = 365 * 24 * 60 * 60 * 1000;
        let reward = (stake.amount * duration_ms / ms_per_year) * protocol.apr / 10000;
        let total = stake.amount + reward;

        protocol.total_staked = protocol.total_staked - stake.amount;

        let payout = if (protocol.total_staked >= total) {
            coin::from_balance(balance::split(&mut protocol.vault, total), ctx)
        } else {
            coin::mint(treasury, total, ctx)
        };
        event::emit(WithdrawEvent {
            owner: stake.owner,
            amount: stake.amount,
            reward,
        });

        // Extract owner before destroying stake
        let owner = stake.owner;
        // Explicitly destroy the stake object
        let Stake { id, owner: _, amount: _, staked_at_ms: _ } = stake;
        object::delete(id);
        transfer::public_transfer(payout, owner);
    }

    // Deactivate the protocol
    public entry fun deactivate(protocol: &mut YieldProtocol, clock: &Clock, ctx: &mut TxContext) {
        assert!(sender(ctx) == protocol.admin, E_NOT_ADMIN);
        protocol.active = false;
        event::emit(DeactivateEvent {
            timestamp_ms: timestamp_ms(clock),
        });
    }

    // Test-only initialization function
    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}