import Material from "../models/exerciseModel.js";

// Obtener los ejercicios de una unidad especifica
export const getExerciseByUnit = async (req, res) => {
  
  const { moduleId, unitId, exerciseId } = req.query;
  try {
    // Buscar ejercicios dependiendo los params
    const exercises = await Material.find(exerciseId ? { moduleId, unitId, _id: exerciseId } : { moduleId, unitId });

    if (!exercises.length) {
      return res.status(404).json({ message: 'No se encontro ejercicios para la unidad seleccionada' });
    }

    return res.status(200).json(exercises);

  } catch (error) {
    return res.status(500).json({ message: 'Error en servidor: ', error });
  }
};