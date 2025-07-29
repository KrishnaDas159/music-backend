// backend/routes/listenerRoutes.js
import express from "express";
import {
  getListenerProfile,
  getListenerNFTs,
  getListenerVaults,
  getLikedSongs,
  getFollowing,
} from "../controllers/listenerController.js";

const router = express.Router();

router.get("/:listenerId", getListenerProfile);
router.get("/:listenerId/nfts", getListenerNFTs);
router.get("/:listenerId/vaults", getListenerVaults);
router.get("/:listenerId/liked-songs", getLikedSongs);
router.get("/:listenerId/following", getFollowing);

export default router;
