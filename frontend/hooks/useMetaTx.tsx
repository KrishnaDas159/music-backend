import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { TX_RELAYER_ABI, TX_RELAYER_ADDRESS } from '@/wallet-identity-module/constants/metaTxLayer'

export function useMetaTxRelayer() {
    const { ready: authReady } = usePrivy()
    const { wallets, ready: walletsReady } = useWallets()
    const [contract, setContract] = useState<ethers.Contract | null>(null)
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)

    const initialize = useCallback(async () => {
        if (!authReady || !walletsReady || wallets.length === 0) return

        const wallet = wallets[0]
        const ethProvider = await wallet.getEthereumProvider()
        const browserProvider = new ethers.BrowserProvider(ethProvider)
        const signer = await browserProvider.getSigner()

        const contractInstance = new ethers.Contract(
            TX_RELAYER_ADDRESS,
            TX_RELAYER_ABI,
            signer
        )

        setSigner(signer)
        setContract(contractInstance)
    }, [authReady, walletsReady, wallets])

    useEffect(() => {
        initialize()
    }, [initialize])

    return { contract, signer }
}
