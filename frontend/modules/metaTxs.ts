export const signMetaTx = async (signer : string, payload : any) => {
  const message = JSON.stringify(payload)
  // const signature = await signer.signMessage(message)
  return { payload }
}
export const sendMetaTx = async (signedPayload : any) => {
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
