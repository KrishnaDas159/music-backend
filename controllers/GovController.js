// backend/controllers/vaultController.js
import {proposals} from '../data/proposalData.js';


export const getProposal = (req, res) => {
    res.json(proposals);
};

