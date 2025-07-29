'use client'
import { usePrivy } from '@privy-io/react-auth'

export const useEvmWallet = () => {
    const { ready, authenticated, user, login, logout } = usePrivy()
    const address = user?.wallet?.address || null
    const connectWallet = login
    const disconnectWallet = logout
    return {
        ready,
        authenticated,
        address,
        login,
        logout,
        connectWallet,
        disconnectWallet,
    }
}
