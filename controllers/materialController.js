import Material from "../models/materialModel.js";
import Progress from '../models/progressModel.js';
import { updateModuleProgressPercentage } from './progressController.js'

// Obtener los materiales de una unidad especifica
export const getMaterialsByUnit = async (req, res) => {
  
  const { moduleId, unitId, materialId } = req.query;
  try {
    // Buscar materiales dependiendo los params
    const materials = await Material.find(materialId ? { moduleId, unitId, _id: materialId } : { moduleId, unitId });

    if (!materials.length) {
      return res.status(404).json({ getExerciseByUnit: 'No se encontro material para la unidad seleccionada' });
    }

    return res.status(200).json(materials);

  } catch (error) {
    return res.status(500).json({ getExerciseByUnit: error.message });
  }
};

//marcar un material como leido dentro del progreso del usuario
export const markMaterialAsRead = async (req, res) => {
  try {
    const { userId, moduleId, unitId, materialId } = req.body;

    
    if (!userId || !moduleId || !unitId || !materialId) {
      return res.status(400).json({ markMaterialAsRead: "Parametros requeridos incompletos" });
    }

    // Buscar el progreso del usuario en el modulo y unidad especificada
    const progress = await Progress.findOne({ userId, "moduleProgress.moduleId": moduleId });

    if (!progress) {
      return res.status(404).json({ errorMarkMaterialAsRead: "Progreso no existe para el usuario y modulo" });
    }

    // Buscar la unidad dentro del modulo
    const moduleProgress = progress.moduleProgress.find(mp => mp.moduleId.toString() === moduleId);
    const unitProgress = moduleProgress.unitProgress.find(up => up.unitId.toString() === unitId);

    if (!unitProgress) {
      return res.status(404).json({ markMaterialAsRead: "Progreso de unidad no encontrado" });
    }

    const materialProgress = unitProgress.materialProgress.find(mp => mp.materialId.toString() === materialId);

    if (!materialProgress) {
      return res.status(404).json({ markMaterialAsRead: "Progreso de material no encontrado" });
    }

    materialProgress.read = true;
    await progress.save();

    //actualiza progreso cada vez que completa material
    await updateModuleProgressPercentage(userId, moduleId);

    return res.status(200).json({ message: "Material marcado como leido"});
  } catch (error) {
    console.error("Error al marcar material como leido:", error);
    return res.status(500).json({ errorMarkMaterialAsRead: error });
  }
};
