import { Router } from 'express';
import { purchase } from '../controllers/purchaseController.js';

const router = Router();
router.post('/', purchase);

export default router;
