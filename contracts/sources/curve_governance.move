module sui_modules2::curve_governance {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::table::{Self, Table};
    use std::vector;

    // Curve types
    const LINEAR: u8 = 0;
    const EXPONENTIAL: u8 = 1;
    const LOGARITHMIC: u8 = 2;

    // Errors
    const ENotAdmin: u64 = 0;
    const EInvalidCurveType: u64 = 1;
    const ETrackNotFound: u64 = 2;

    // Struct to hold curve parameters
    public struct CurveParams has copy, drop, store {
        base_price: u64, // Starting price
        slope: u64,      // Price growth rate
        curve_type: u8,  // LINEAR / EXPONENTIAL / LOGARITHMIC
    }

    // Governance storage for track-specific curve parameters
    public struct CurveGovernance has key, store {
        id: UID,
        admin: address,                              // Admin wallet
        curves: Table<vector<u8>, CurveParams>,     // Mapping: track_id → params
    }

    // --- GETTERS for CurveParams ---
    public fun get_base_price(params: &CurveParams): u64 {
        params.base_price
    }

    public fun get_slope(params: &CurveParams): u64 {
        params.slope
    }

    public fun get_curve_type(params: &CurveParams): u8 {
        params.curve_type
    }
    // --- END GETTERS ---

    // Initialize governance contract
    public entry fun create_governance(ctx: &mut TxContext) {
        let governance = CurveGovernance {
            id: object::new(ctx),
            admin: tx_context::sender(ctx),
            curves: table::new(ctx),
        };
        transfer::share_object(governance);
    }


    // Update curve parameters for a track
    public entry fun update_curve_params(
        governance: &mut CurveGovernance,
        track_id: vector<u8>,
        base_price: u64,
        slope: u64,
        curve_type: u8,
        ctx: &TxContext
    ) {
        // Admin-only access
        assert!(tx_context::sender(ctx) == governance.admin, ENotAdmin);

        // Validate curve_type
        assert!(
            curve_type == LINEAR || curve_type == EXPONENTIAL || curve_type == LOGARITHMIC,
            EInvalidCurveType
        );

        let new_params = CurveParams {
            base_price,
            slope,
            curve_type,
        };

        if (table::contains(&governance.curves, track_id)) {
            let params = table::borrow_mut(&mut governance.curves, track_id);
            *params = new_params;
        } else {
            table::add(&mut governance.curves, track_id, new_params);
        };
    }

    // Get curve params for a track (used by curve.move)
    public fun get_curve_params(
        governance: &CurveGovernance,
        track_id: vector<u8>
    ): CurveParams {
        assert!(table::contains(&governance.curves, track_id), ETrackNotFound);
        *table::borrow(&governance.curves, track_id)
    }

    // Transfer admin rights
    public entry fun transfer_admin(
        governance: &mut CurveGovernance,
        new_admin: address,
        ctx: &TxContext
    ) {
        assert!(tx_context::sender(ctx) == governance.admin, ENotAdmin);
        governance.admin = new_admin;
    }
}
