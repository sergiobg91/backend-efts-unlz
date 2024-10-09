import Exercise from '../models/exerciseModel.js';
import User from '../models/userModel.js';
import Module from '../models/moduleModel.js';
import Unit from '../models/unitModel.js';
import Progress from '../models/progressModel.js';

export const recordExerciseCompletion = async (req, res) => {
  const { userId, exerciseId } = req.body;

  try {
    // Verificar si el ejercicio existe en la coleccion Exercise
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }

    // Obtener el unitId al que pertenece el ejercicio
    const unitId = exercise.unitId;

    let progress = await Progress.findOne({ userId });

    // Si no se encuentra el progreso del usuario, crear uno nuevo
    if (!progress) {
      // Obtener los módulos y las unidades del sistema para inicializar el progreso
      const modules = await Module.find({});
      const newModuleProgress = [];

      for (const module of modules) {
        const units = await Unit.find({ moduleId: module._id });
        const unitProgress = units.map(unit => ({
          unitId: unit._id,
          materialProgress: [], // Inicializa vacio
          exerciseProgress: [], // Inicializa vacio
          unitCompleted: false
        }));

        newModuleProgress.push({
          moduleId: module._id,
          unitProgress,
          moduleCompleted: false,
          moduleProgressPercentage: 0
        });
      }

      // Crear un nuevo documento de progreso para el usuario
      progress = new Progress({
        userId,
        moduleProgress: newModuleProgress
      });

      await progress.save();
    }

    // Buscar el modulo y la unidad correspondiente al ejercicio
    let exerciseFound = false;
    progress.moduleProgress.forEach(module => {
      module.unitProgress.forEach(unit => {
        if (unit.unitId.toString() === unitId.toString()) {
          // Buscar el ejercicio en el progreso de la unidad
          unit.exerciseProgress.forEach(ex => {
            if (ex.exerciseId.toString() === exerciseId) {
              ex.completed = true;
              exerciseFound = true;
            }
          });

          // Si el ejercicio no esta en exerciseProgress, lo agregamos
          if (!exerciseFound) {
            unit.exerciseProgress.push({
              exerciseId: exerciseId,
              completed: true
            });
          }
        }
      });
    });

    await progress.save();
    res.status(200).json({ message: 'Ejercicio registrado como completado' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgressWithDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: 'Progreso no encontrado para el usuario' });
    }

    // Traer todos los modulos y las unidades de la base de datos
    const modules = await Module.find({});
    const units = await Unit.find({});

    // Iterar sobre el progreso del usuario para agregar los detalles
    const progressWithDetails = progress.moduleProgress.map(moduleProgress => {
      // Buscar los detalles del modulo
      const module = modules.find(m => m._id.toString() === moduleProgress.moduleId.toString());
      
      // Calcular el total de ejercicios en el módulo
      let totalExercisesInModule = 0;
      let completedExercisesInModule = 0;

      // Iterar sobre las unidades para obtener los detalles de cada una
      const unitProgressWithDetails = moduleProgress.unitProgress.map(unitProgress => {
        const unit = units.find(u => u._id.toString() === unitProgress.unitId.toString());
      
        // Sumar la cantidad de ejercicios en esta unidad
        totalExercisesInModule += unitProgress.exerciseProgress.length;
        // Contar cuantos ejercicios estan completados en esta unidad
        completedExercisesInModule += unitProgress.exerciseProgress.filter(ex => ex.completed).length;

        return {          
          ...unitProgress._doc, // Copiar los campos existentes del progreso de la unidad
          unitName: unit ? unit.name : 'Nombre de unidad no encontrado',
        };
      });

      // console.log("total: " + totalExercisesInModule)
      // console.log("completos: " + completedExercisesInModule)
      // Calcular el porcentaje de progreso del módulo
      const moduleProgressPercentage = totalExercisesInModule > 0
        ? (completedExercisesInModule / totalExercisesInModule) * 100
        : 0;

      return {
        ...moduleProgress._doc, // Copiar los campos existentes del progreso del modulo
        moduleName: module ? module.name : 'Nombre de modulo no encontrado',
        moduleDescription: module ? module.description : 'Descripcion de modulo no encontrada',
        moduleProgressPercentage: Math.round(moduleProgressPercentage * 100) / 100, // Redondear a 2 decimales
        unitProgress: unitProgressWithDetails // Reemplazar las unidades con los detalles agregados
      };
    });
    // const result = [
    //   {
    //     userId: progress.userId,
    //     moduleProgress: progressWithDetails
    //   }
    // ];

    // Enviar la respuesta con el array que contiene el progreso detallado
    return res.status(200).json(
        {
          userId: progress.userId,
          moduleProgress: progressWithDetails
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

