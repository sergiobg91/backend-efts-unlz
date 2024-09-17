import Router from 'express';
import  { getUnits, getUnit } from '../controllers/unitController.js';
import { authenticateToken } from '../services/auth.services.js';

const router = Router();

router.get('/:id/units', getUnits);

export default router;