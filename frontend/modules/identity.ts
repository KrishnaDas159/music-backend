export async function getNonce(address: string): Promise<number> {
    const res = await fetch(`/api/nonce?address=${address}`)
    const data = await res.json()
    return data.nonce || 0
}

export async function fetchKycBadge(address: string): Promise<string | null> {
    const res = await fetch(`/api/kyc-badge?address=${address}`)
    const data = await res.json()
    return data.badge || null
}
