import Router from 'express';
import  { getModules } from '../controllers/moduleController.js';
import { authenticateToken } from '../services/auth.services.js';

const router = Router();

router.get('/', getModules);
// router.put('/:id', authenticateToken, updateProfile);

export default router;