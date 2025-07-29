import express from "express";
import { updateWeb3Settings } from "../controllers/web3setting.js";

const router = express.Router();

// Simulated authentication middleware (replace with real auth later)
router.use((req, res, next) => {
  req.userId = "688895d4830067e6640eea10"; 
  next();
});

// PUT: Update Web3 Settings
router.put("/", updateWeb3Settings);

export default router;
