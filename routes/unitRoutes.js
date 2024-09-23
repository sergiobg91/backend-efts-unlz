import Router from 'express';
import  { getUnits, getUnit } from '../controllers/unitController.js';

const router = Router();

router.get('/:id/units', getUnits);
router.get('/:id/units/:id', getUnit);

export default router;