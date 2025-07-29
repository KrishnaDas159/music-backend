export const signMetaTx = async (signer : string, payload) => {
  const message = JSON.stringify(payload)
  const signature = await signer.signMessage(message)
  return { payload, signature }
}
export const sendMetaTx = async (signedPayload) => {
  const res = await fetch('/api/relay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signedPayload)
  })

  return res.json();
}
export const verifyReceipt = async (txHash : string) => {
  const res = await fetch(`/api/receipt?txHash=${txHash}`)
  return await res.json()
}
