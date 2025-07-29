
import express from "express";
import {getRevenueVaults, getToken,getClaimData } from "../controllers/vaultController.js";


const router = express.Router();

router.get("/:userId/nfts", getToken);
router.get("/:userId/revenue", getRevenueVaults);
router.get("/:userId/claims", getClaimData);
export default router;
