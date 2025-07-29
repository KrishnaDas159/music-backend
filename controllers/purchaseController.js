import { buyToken } from '../services/purchaseService.js';

export const purchase = async (req, res) => {
  const { songId } = req.body;
  if (!songId) return res.status(400).json({ error: "songId is required" });

  try {
    const receipt = await buyToken(songId);
    return res.json({ success: true, receipt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Purchase failed" });
  }
};
