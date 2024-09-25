import Exercise from '../models/exerciseModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const Progress = User.progress
export const recordExerciseCompletion = async (req, res) => {
  const { userId, exerciseId } = req.body;
  console.log(exerciseId, userId)

  try {
    console.log(exerciseId)
     const objectIdExerciseId = new mongoose.Types.ObjectId(exerciseId);
    console.log(objectIdExerciseId)
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Buscar si el ejercicio ya fue agregado
     if (!user.exercisesCompleted.includes(objectIdExerciseId)) {
            user.exercisesCompleted.push(objectIdExerciseId); 
    }else{
      return res.status(409).json({ message: 'Ejercicio ya hecho' });
    }
    await user.save();

    res.status(200).json({ message: 'Ejercicio registrado como completado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgressByModule = async (req, res) => {
  const { userId, moduleId } = req.params;

  try {
    // Busca al usuario por ID
    const user = await User.findById(userId).populate('exercisesCompleted');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Busca todos los ejercicios del modulo
    const exercisesInModule = await Exercise.find();
    console.log(exercisesInModule)
    if (exercisesInModule.length === 0) {
      return res.status(404).json({ message: 'No hay ejercicios en este modulo' });
    }

    // Filtra los ejercicios completados que pertenecen al modulo
    const completedExercisesInModule = user.exercisesCompleted.filter(ex => ex.moduleId.toString() === moduleId);

    // Calcula el porcentaje de progreso
    const progressPercentage = (completedExercisesInModule.length / exercisesInModule.length)// * 100;

    return res.status(200).json({
      progress: Math.round(progressPercentage * 100) / 100,
      //totalExercises: exercisesInModule.length,
      //completedExercises: completedExercisesInModule.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

