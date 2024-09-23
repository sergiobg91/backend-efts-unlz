import Exercise from '../models/exerciseModel.js';
import User from '../models/userModel.js';

export const countExercisesInModule = async (moduleId) => {
  const totalExercises = await Exercise.countDocuments({ moduleId });
  return totalExercises;
};

export const getProgressForStudent = async (userId, moduleId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const totalExercises = await countExercisesInModule(moduleId);

  const userProgress = user.progress.find(progress => progress.moduleId === moduleId);
  const completedExercisesCount = userProgress ? userProgress.completedExercises.length : 0;

  const completionPercentage = totalExercises > 0 ? (completedExercisesCount / totalExercises) * 100 : 0;

  return {
    totalExercises,
    completedExercisesCount,
    completionPercentage,
  };
};
