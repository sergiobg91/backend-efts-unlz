import Router from 'express';
import { recordExerciseCompletion, getProgress } from '../controllers/progressController.js';
import { authenticateToken } from '../services/auth.services.js';

const router = Router();

//router.post('/complete-exercise', authenticateToken, recordExerciseCompletion);
router.post('/complete-exercise', recordExerciseCompletion);

router.get('/:userId/progress', authenticateToken, getProgress);

export default router;
