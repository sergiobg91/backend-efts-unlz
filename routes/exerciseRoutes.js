import Router from 'express';
import { getExerciseByUnit, markExerciseAsComplete } from '../controllers/exerciseController.js';

const router = Router();

// Ruta para obtener ejercicios por unidad dentro de una unidad
router.get('/', getExerciseByUnit);
router.post('/complete', markExerciseAsComplete);

export default router;