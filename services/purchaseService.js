export const buyToken = async (songId) => {
  console.log(`Buying token for songId: ${songId}`);

  // Simulated receipt
  return {
    transactionHash: "0xabc123",
    songId,
    status: "success",
  };
};
