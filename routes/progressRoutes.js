import Router from "express";
import { authenticateToken } from "../services/auth.services.js";
import {
  recordExerciseCompletion,
  getProgressWithDetails
} from "../controllers/progressController.js";

const router = Router();

// router.post('/complete-exercise', authenticateToken, recordExerciseCompletion);
router.post("/complete-exercise", recordExerciseCompletion);

// router.get('/progress/details/:userId', authenticateToken, getProgressWithDetails);
router.get('/details/:userId', getProgressWithDetails);

export default router;
