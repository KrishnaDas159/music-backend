// backend/controllers/listenerController.js
import { listeners, nftData, vaultStats, likedSongs, following } from "../data/listenerData.js";


export const getListenerProfile = (req, res) => {
  const { listenerId } = req.params;
  const data = listeners[listenerId];
  if (!data) return res.status(404).json({ error: "Listener not found" });
  res.json(data);
};

export const getListenerNFTs = (req, res) => {
  const { listenerId } = req.params;
  res.json(nftData[listenerId] || []);
};

export const getListenerVaults = (req, res) => {
  const { listenerId } = req.params;
  res.json(vaultStats[listenerId] || []);
};

export const getLikedSongs = (req, res) => {
  const { listenerId } = req.params;
  res.json(likedSongs[listenerId] || []);
};

export const getFollowing = (req, res) => {
  const { listenerId } = req.params;
  res.json(following[listenerId] || []);
};
