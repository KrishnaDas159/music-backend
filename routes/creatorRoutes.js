// backend/routes/Routes.js
import express from "express";
import {
    getCreatorProfile,
    getCreatorNFTs,
    getCreatorRevenue,
    getLikedSongs,
    getFollowing,
    getVaults
  
  } from "../controllers/creatorController.js";

const router = express.Router();

router.get("/:creatorId", getCreatorProfile);
router.get("/:creatorId/nfts", getCreatorNFTs);
router.get("/:creatorId/revenue", getCreatorRevenue);
router.get("/:creatorId/liked-songs", getLikedSongs);
router.get("/:creatorId/following", getFollowing);
router.get("/:creatorId/vaults", getVaults);

// router.get("/:creatorId/following", getFollowing);

export default router;
