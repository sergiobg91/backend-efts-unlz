import Router from 'express';
import  { getMaterialsByUnit, markMaterialAsRead } from '../controllers/materialController.js';

const router = Router();

// Ruta para obtener materiales por unidad dentro de una unidad
router.get('/', getMaterialsByUnit);
router.post('/read', markMaterialAsRead);

export default router;