'use client'

import { useState } from 'react'
import { useMetaTxRelayer } from '@/hooks/useMetaTx'
import { ethers } from 'ethers'

export default function MetaTxComponent() {
  const { contract, signer } = useMetaTxRelayer()
  const [status, setStatus] = useState<string | null>(null)

  const handleExecute = async () => {
    if (!contract || !signer) return setStatus('Contract not ready')

    const user = await signer.getAddress()
    const target = '0x1234...abcd' // dummy or mock contract
    const data = '0xabcdef' // callData for target
    const nonce = await contract.nonces(user)

    const hash = ethers.keccak256(
      ethers.solidityPacked(['address', 'address', 'bytes', 'uint256'], [user, target, data, nonce])
    )
    const signed = await signer.signMessage(ethers.getBytes(hash))

    const tx = await contract.executeMetaTx(user, target, data, nonce, signed)
    await tx.wait()

    setStatus('✅ Meta-tx executed')
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleExecute} disabled={!contract}>
        Execute MetaTx
      </button>
      {status && <p>{status}</p>}
    </div>
  )
}
