'use client'

import { useEvmWallet } from '@/modules/ethWallet';
import { useSuiWallet } from '@/modules/suiWallet';
import { ConnectButton } from '@suiet/wallet-kit';
import React, { useEffect } from 'react';

const Navbar = () => {
    const { address: evmAddress, authenticated, login, logout } = useEvmWallet()
    const { name, address: suiAddress, publicKey, connected, disconnect } = useSuiWallet()

    useEffect(() => {
        if (!connected) return
        console.log('🔗 Connected Sui Wallet:', {
            name,
            address: suiAddress,
            publicKey,
        })
    }, [connected]);

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 text-black">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600">Discover and collect amazing music NFTs</p>
            </div>

            
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ConnectButton label='Connect SUI Wallet' className='bg-black text-white' style={{ marginRight: '10px' }} />
                {connected && (
                    <span style={{ fontSize: 12, color: '#888' }}>
                        {suiAddress?.slice(0, 6)}...{suiAddress?.slice(-4)}
                    </span>
                )}
            </div>

            {authenticated && <button onClick={logout} className='bg-black text-white p-2'>Logout EVM</button>}
            {connected && <button onClick={disconnect} className='bg-black text-white p-2'>Logout SUI</button>}

            <button
                onClick={() => !authenticated && login()}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                }}
            >
                {authenticated
                    ? `EVM: ${evmAddress?.slice(0, 6)}...${evmAddress?.slice(-4)}`
                    : 'Connect EVM Wallet'}
            </button>
        </nav>
    );
};

export default Navbar;
