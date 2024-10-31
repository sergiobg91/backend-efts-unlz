import Router from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { authenticateToken } from "../services/auth.services.js";
import { recordExerciseCompletion } from "../controllers/progressController.js";

const router = Router();

router.get("/:id", getProfile);
router.put("/:id", updateProfile);

router.post("/complete-exercise", recordExerciseCompletion);

export default router;
