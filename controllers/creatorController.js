// backend/controllers/creatorController.js
import { creators, nftData,revenueData, likedSongs,followingData,vaultStats } from "../data/creatorData.js";


export const getCreatorProfile = (req, res) => {
  const { creatorId } = req.params;
  const data = creators[creatorId];
  if (!data) return res.status(404).json({ error: "Listener not found" });
  res.json(data);
};

export const getCreatorNFTs = (req, res) => {
  const { creatorId } = req.params;
  res.json(nftData[creatorId] || []);
};

export const getCreatorRevenue = (req, res) => {
  const { creatorId } = req.params;
  res.json(revenueData[creatorId] || []);
};

export const getLikedSongs = (req, res) => {
  const { creatorId } = req.params;
  res.json(likedSongs[creatorId] || []);
};


export const getFollowing = (req, res) => {
  const { creatorId } = req.params;
  res.json(followingData[creatorId] || []);
};


export const getVaults = (req, res) => {
  const { creatorId } = req.params;
  res.json(vaultStats[creatorId] || []);
};