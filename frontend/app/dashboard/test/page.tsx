'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { getIdentityManagerContract } from '@/hooks/useIdentityManager';

export default function TestContract() {
  const { ready: authReady, authenticated, login, logout } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();
  const [registeredWallet, setRegisteredWallet] = useState<string | null>(null);

  // Obtain the EIP-1193 provider from Privy
  const getSigner = async () => {
    if (!authReady || !walletsReady || wallets.length === 0) {
      throw new Error('Wallet not ready');
    }
    const connected = wallets[0];
    const ethProvider = await connected.getEthereumProvider();
    const ethersProvider = new ethers.BrowserProvider(ethProvider); // v6
    return ethersProvider.getSigner();
  };

  async function callContract() {
    try {
      const signer = await getSigner();

        console.log(signer);

      const contract = getIdentityManagerContract(signer);
      const tx = await contract.incrementNonce(signer.address); // or incrementNonce/verifyCreator
      await tx.wait();

      const address = await signer.getAddress();
      const data = await contract.getNonce(address);
        console.log(data);

      setRegisteredWallet(data.toString());
    } catch (err) {
      console.log('Contract interaction failed:', err);
      alert('Error during contract call');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      {!authenticated ? (
        <button onClick={() => login()}>Login / Connect Wallet</button>
      ) : (
        <button onClick={() => logout()}>Logout</button>
      )}

      <button
        onClick={callContract}
        disabled={!authenticated}
        style={{ marginLeft: '1rem' }}
      >
        Interact with IdentityManager
      </button>

      {registeredWallet && (
        <p style={{ marginTop: '1rem' }}>
          Response from `getNonce`: {registeredWallet}
        </p>
      )}
    </div>
  );
}
