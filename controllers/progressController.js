import Exercise from '../models/exerciseModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import Models from '../models/moduleModel.js';
import Unit from '../models/unitModel.js';

const { Module } = Models;

export const recordExerciseCompletion = async (req, res) => {
  const { userId, exerciseId } = req.body;

  try {
     const objectIdExerciseId = new mongoose.Schema.Types.ObjectId(exerciseId);
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    //Buscar si el ejercicio ya fue agregado
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
    const user = await User.findById(userId).populate('exercisesCompleted');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const exercisesInModule = await Exercise.find();
    if (exercisesInModule.length === 0) {
      return res.status(404).json({ message: 'No hay ejercicios en este modulo' });
    }

    //Filtra los ejercicios completados del modulo
    const completedExercisesInModule = user.exercisesCompleted.filter(ex => ex.moduleId.toString() === moduleId);

    //Calcula el porcentaje de progreso
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

export const getProgressForAllModules = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('exercisesCompleted');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const modules = await Module.find({}); 
    if (modules.length === 0) {
      return res.status(404).json({ message: 'No hay módulos disponibles' });
    }
    const progressList = [];
    var exercisesInModule = []
    for (const module of modules) {
      const unitsInModule = await Unit.find({ moduleId: module._id });
      for (const unit of unitsInModule){
        const exercises = await Exercise.find({ unitId: unit._id})
        for(const exercise of exercises){
          exercisesInModule.push(exercise)
        }
      }
    }

    for (const module of modules) {
    if (exercisesInModule.length > 0) {
      //Trae los ejercicios completadosdel modulo
      const completedExercisesInModule = user.exercisesCompleted.filter(ex => ex.moduleId.toString() === module._id.toString());
      const progressPercentage = (completedExercisesInModule.length / exercisesInModule.length);

      progressList.push({
        moduleId: module._id,
        moduleName: module.name,
        moduleDescription: module.description,
        moduleUnits: module.units,
        progress: Math.round(progressPercentage * 100) / 100 //Redondeo
      });
    } else {
      //Si no hay ejercicios en el modulo se asigna progreso 0%
      progressList.push({
        moduleId: module._id,
        moduleName: module.name,
        moduleDescription: module.description,
        moduleUnits: module.units,
        progress: 0
      });
    }
  }
  var mainProgress = []
  mainProgress.push({
    data: progressList
  })
    return res.status(200).json(mainProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
