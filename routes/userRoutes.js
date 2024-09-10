import Router from 'express';
import  { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticateToken } from '../services/auth.services.js';

const router = Router();

router.get('/:id', authenticateToken, getProfile);
router.put('/:id', authenticateToken, updateProfile);

export default router;
