import Router from 'express';
import  { getMaterialsByUnit } from '../controllers/materialController.js';

const router = Router();

// Ruta para obtener materiales por unidad dentro de un modulo
router.get('/:id_module/units/:id_unit/materials', getMaterialsByUnit);

export default router;