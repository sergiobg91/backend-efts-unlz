import Exercise from "../models/exerciseModel.js";
import Progress from '../models/progressModel.js';
import { updateModuleProgressPercentage } from './progressController.js'

// Obtener los ejercicios de una unidad especifica
export const getExerciseByUnit = async (req, res) => {
  
  const { moduleId, unitId, exerciseId } = req.query;
  try {
    // Buscar ejercicios dependiendo los params
    const exercises = await Exercise.find(exerciseId ? { moduleId, unitId, _id: exerciseId } : { moduleId, unitId });

    if (!exercises.length) {
      return res.status(404).json({ getExerciseByUnit: 'No se encontro ejercicios para la unidad seleccionada' });
    }

    return res.status(200).json(exercises);

  } catch (error) {
    return res.status(500).json({ getExerciseByUnit: 'Error en servidor: ', error });
  }
};

//marcar un ejercicio como completado dentro del progreso del usuario
export const markExerciseAsComplete = async (req, res) => {
  try {
    const { userId, moduleId, unitId, exerciseId } = req.body;

    
    if (!userId || !moduleId || !unitId || !exerciseId) {
      return res.status(400).json({ markExerciseAsComplete: "Parametros requeridos incompletos" });
    }

    // Buscar el progreso del usuario en el modulo y unidad especificada
    const progress = await Progress.findOne({ userId, "moduleProgress.moduleId": moduleId });

    if (!progress) {
      return res.status(404).json({ markExerciseAsComplete: "Progreso no existe para el usuario y modulo" });
    }

    // Buscar la unidad dentro del modulo
    const moduleProgress = progress.moduleProgress.find(mp => mp.moduleId.toString() === moduleId);
    const unitProgress = moduleProgress.unitProgress.find(up => up.unitId.toString() === unitId);

    if (!unitProgress) {
      return res.status(404).json({ markExerciseAsComplete: "Progreso de unidad no encontrado" });
    }

    const exerciseProgress = unitProgress.exerciseProgress.find(mp => mp.exerciseId.toString() === exerciseId);

    if (!exerciseProgress) {
      return res.status(404).json({ markExerciseAsComplete: "Progreso de ejercicio no encontrado" });
    }

    exerciseProgress.completed = true;
    await progress.save();

    //actualiza progreso cada vez que completa material
    await updateModuleProgressPercentage(userId, moduleId);

    return res.status(200).json({ message: "Ejercicio marcado como completado"});
  } catch (error) {
      return res.status(500).json({ markExerciseAsComplete: error.message });
  }
};