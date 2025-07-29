// backend/controllers/vaultController.js
import {nftData} from '../data/mockVaults.js';
import { claimData } from "../data/claimData.js";
import { revenueVaults } from "../data/revenuestats.js";

export const getToken = (req, res) => {
  const { listenerId } = req.params;
  res.json(nftData[listenerId] || []);
};

export const getRevenueVaults = (req, res) => {
    const { userId } = req.params;
  
    const userVaults = revenueVaults[userId];
  
    if (!userVaults) {
      return res.status(404).json({ message: "No vaults found for this user ID" });
    }
  
    res.json(userVaults || []);;
  };

  export const getClaimData = (req, res) => {
    const { userId } = req.params;
  
    const data = claimData[userId];
  
    if (!data) {
      return res.status(404).json({ message: "No claim data found for this user." });
    }
  
    return res.json(data);
  };