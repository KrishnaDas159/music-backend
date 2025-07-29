
import express from "express";
import {getProposal } from "../controllers/GovController.js";


const router = express.Router();

router.get("/", getProposal );

export default router;
