import Router from 'express';
import  { getExerciseByUnit } from '../controllers/exerciseController.js';

const router = Router();

// Ruta para obtener ejercicios por unidad dentro de una unidad
router.get('/', getExerciseByUnit);

export default router;