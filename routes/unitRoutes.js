import Router from 'express';
import  { getUnits } from '../controllers/unitController.js';

const router = Router();

router.get('/', getUnits);

export default router;