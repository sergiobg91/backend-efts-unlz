import Router from 'express';
import { authenticateToken } from '../services/auth.services.js';
import { recordExerciseCompletion, getProgressByModule, getProgressForAllModules } from '../services/progress.services.js'

const router = Router();

// router.post('/complete-exercise', authenticateToken, recordExerciseCompletion);
router.post('/complete-exercise', recordExerciseCompletion);

router.get('/:userId/progress/:moduleId', getProgressByModule )
// api/v1/users/:userId/progress/:moduleId

// router.get('/:userId/progress', authenticateToken, getProgress);
router.get('/:userId/progress', getProgressForAllModules);

export default router;
