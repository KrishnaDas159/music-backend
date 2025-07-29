'use client'
import { useWallet } from '@suiet/wallet-kit'

export const useSuiWallet = () => {
    const wallet = useWallet()
    const address = wallet.account?.address || null
    const publicKey = wallet.address;
    const connectWallet = () => {
        if (!wallet.connected && wallet) {
            wallet.select(wallet.name || "");
        }
    }

    const disconnectWallet = wallet.disconnect

    return {
        ...wallet,
        address,
        publicKey,
        connectWallet,
        connected: wallet.connected,
        disconnect: wallet.disconnect,
        disconnectWallet
    }
}
