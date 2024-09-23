// import Progress from '../models/progressModel.js';
import User from '../models/userModel.js'
import mongoose from 'mongoose';

import { getProgressForStudent } from '../services/progress.services.js';

// export const getStudentProgress = async (req, res) => {
//   const { moduleId } = req.params;
//   // Asumiendo que el usuario está autenticado y el id esta en req.user
//   const userId = req.user.id;  

//   try {
//     const progress = await getProgressForStudent(userId, moduleId);
//     return res.status(200).json(progress);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
// Marcar ejercicio como completo
const Progress = User.progress
export const recordExerciseCompletion = async (req, res) => {
  // const { userId, moduleId, unitId, exerciseId } = req.body;
  const { userId, exerciseId } = req.body;
  console.log(exerciseId, userId)

  try {
    // Convert exerciseId to an ObjectId using 'new' keyword
    const objectIdExerciseId = new mongoose.Types.ObjectId(exerciseId);

    // Find the user by their ID
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Check if the exerciseId is already in the exercisesCompleted array
    if (!user.exercisesCompleted.includes(objectIdExerciseId)) {
      user.exercisesCompleted.push(objectIdExerciseId); // Add the exerciseId if not already completed
    }

    // Save the user's updated progress
    await user.save();

    res.status(200).json({ message: 'Ejercicio registrado como completado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// // Marcar ejercicio como completo
// const Progress = User.progress
// export const recordExerciseCompletion = async (req, res) => {
//   // const { userId, moduleId, unitId, exerciseId } = req.body;
//   const { userId, exerciseId } = req.body;
//   console.log(exerciseId)

//   try {
//     let progress = await Progress.findOne({exerciseId});
//     if (!progress) {
//       progress = new Progress({ exercisesCompleted: [] });
//     }

//     if (!progress.exercisesCompleted.includes(exerciseId)) {
//       progress.exercisesCompleted.push(exerciseId);
//     }

//     await progress.save();
//     res.status(200).json({ message: 'Ejercicio completo' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

import Unit from '../models/unitModel.js';
import Exercise from '../models/exerciseModel.js';

// // Contar total de ejercicios en un módulo
// export const countExercisesInModule = async (req, res) => {
//   const { moduleId } = req.params;

//   try {
//     const units = await Unit.find({ moduleId }).select('_id');
//     const totalExercises = await Exercise.countDocuments({ unitId: { $in: units } });

//     return res.status(200).json({ totalExercises });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };


export const getProgress = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const progress = await Progress.find({ userId }).populate('moduleId unitId exercisesCompleted');

//     const progressReport = progress.map(p => {
//       const totalExercises = // lógica para contar ejercicios en el módulo/unidad;
//       const completedExercises = p.exercisesCompleted.length;
//       const completionPercentage = (completedExercises / totalExercises) * 100;

//       return {
//         moduleId: p.moduleId,
//         unitId: p.unitId,
//         completionPercentage,
//       };
//     });

//     res.status(200).json(progressReport);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
};
