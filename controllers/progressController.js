import Exercise from '../models/exerciseModel.js';
import Material from '../models/materialModel.js';
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
      // Obtener los modulos y las unidades del sistema para inicializar el progreso
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

// export const getProgressWithDetails = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const progress = await Progress.findOne({ userId });

//     if (!progress) {
//       return res.status(404).json({ message: 'Progreso no encontrado para el usuario' });
//     }

//     // Traer todos los modulos y las unidades de la base de datos
//     const modules = await Module.find({});
//     const units = await Unit.find({});

//     // Iterar sobre el progreso del usuario para agregar los detalles
//     const progressWithDetails = progress.moduleProgress.map(moduleProgress => {
//       // Buscar los detalles del modulo
//       const module = modules.find(m => m._id.toString() === moduleProgress.moduleId.toString());
      
//       // Calcular el total de ejercicios en el módulo
//       let totalExercisesInModule = 0;
//       let completedExercisesInModule = 0;

//       // Iterar sobre las unidades para obtener los detalles de cada una
//       const unitProgressWithDetails = moduleProgress.unitProgress.map(unitProgress => {
//         const unit = units.find(u => u._id.toString() === unitProgress.unitId.toString());
      
//         // Sumar la cantidad de ejercicios en esta unidad
//         totalExercisesInModule += unitProgress.exerciseProgress.length;
//         // Contar cuantos ejercicios estan completados en esta unidad
//         completedExercisesInModule += unitProgress.exerciseProgress.filter(ex => ex.completed).length;

//         return {          
//           ...unitProgress._doc, // Copiar los campos existentes del progreso de la unidad
//           unitName: unit ? unit.name : 'Nombre de unidad no encontrado',
//         };
//       });

//       // console.log("total: " + totalExercisesInModule)
//       // console.log("completos: " + completedExercisesInModule)
//       // Calcular el porcentaje de progreso del módulo
//       const moduleProgressPercentage = totalExercisesInModule > 0 ? (completedExercisesInModule / totalExercisesInModule) * 100
//         : 0;

//       return {
//         ...moduleProgress._doc, // Copiar los campos existentes del progreso del modulo
//         moduleName: module ? module.name : 'Nombre de modulo no encontrado',
//         moduleDescription: module ? module.description : 'Descripcion de modulo no encontrada',
//         moduleProgressPercentage: Math.round(moduleProgressPercentage * 100) / 100, // Redondear a 2 decimales
//         unitProgress: unitProgressWithDetails // Reemplazar las unidades con los detalles agregados
//       };
//     });
//     // const result = [
//     //   {
//     //     userId: progress.userId,
//     //     moduleProgress: progressWithDetails
//     //   }
//     // ];

//     // Enviar la respuesta con el array que contiene el progreso detallado
//     return res.status(200).json(
//         {
//           userId: progress.userId,
//           moduleProgress: progressWithDetails
//         });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

/////////////////////-----------------------------//////////////////////////////////
export const createInitialProgress = async (userId, res) => {

  try {
    const modules = await Module.find();
    const moduleProgress = await Promise.all(modules.map(async (module) => {
      
      const units = await Unit.find({ moduleId: module._id });

      const unitProgress = await Promise.all(units.map(async (unit) => {
      const materials = await Material.find({ unitId: unit._id });
      const exercises = await Exercise.find({ unitId: unit._id });

      return {
          unitId: unit._id,
          materialProgress: materials.map(material => ({ materialId: material._id, read: false })),
          exerciseProgress: exercises.map(exercise => ({ exerciseId: exercise._id, completed: false })),
          unitCompleted: false
        };
      }));

      return {
        moduleId: module._id,
        unitProgress,
        moduleCompleted: false,
        moduleProgressPercentage: 0
      };
    }));

    const newProgress = new Progress({
      userId,
      moduleProgress
    });

    await newProgress.save();
    return newProgress;
  } catch (error) {
    return  res.status(500).json({ error: error.message });
  }
};

export const getProgressWithDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const progress = await Progress.find({ userId })
    //estos populate nos sirve si queremos devolver todo el contenido de todo y no solo el progreso (?
      // .populate('moduleProgress.moduleId')
      // .populate('moduleProgress.unitProgress.unitId')
      // .populate('moduleProgress.unitProgress.materialProgress.materialId')
      // .populate('moduleProgress.unitProgress.exerciseProgress.exerciseId');

    if (!progress)
      return res.status(500).json({ message: "Error de consistencia en la base, el progreso debe existir" });

    return res.status(200).json(progress);
  } catch (error) {
      return res.status(500).json({ mensaje: error.message});
  }
};

//Esto puede volar por los aires, usar con sabiduria
export const updateDeltaProgressByUser = async (req, res) => {

  try {
    const { userId } = req.params;
    const progress = await Progress.findOne({ userId });

    //si no existe, lo creamos
    if (!progress) {
      try {
        await createInitialProgress(userId, res);
      }catch(error) {
        console.log("Error al crear progreso desde updateDelta: ", error);
      }
    }

    // Obtener todos los modulos, unidades, materiales y ejercicios actuales de la base
    const modules = await Module.find();
    
    for (let module of modules) {
      let moduleProgress = progress.moduleProgress.find(mp => mp.moduleId.toString() === module._id.toString());
      
      if (!moduleProgress) {
        console.log("en if delta modulo");
        const units = await Unit.find({ moduleId: module._id });
        const unitProgress = await Promise.all(units.map(async (unit) => {

          const materials = await Material.find({ unitId: unit._id });
          const exercises = await Exercise.find({ unitId: unit._id });
          
          return {
            unitId: unit._id,
            materialProgress: materials.map(material => ({ materialId: material._id, read: false })),
            exerciseProgress: exercises.map(exercise => ({ exerciseId: exercise._id, completed: false })),
            unitCompleted: false
          };
        }));

        //Agrega delta de modulo
        progress.moduleProgress.push({
          moduleId: module._id,
          unitProgress,
          moduleCompleted: false,
          moduleProgressPercentage: 0
        });
      } else {
        console.log("en else de unidades");
        //modulo existe, pero verificamos unidades nuevas
        const units = await Unit.find({ moduleId: module._id });

        for (let unit of units) {
          let unitProgress = moduleProgress.unitProgress.find(up => up.unitId.toString() === unit._id.toString());
          console.log("en for de unidades dentro de un modulo: ", unit);
          if (!unitProgress) {
            console.log("en if delta unidad");
            const materials = await Material.find({ unitId: unit._id });
            const exercises = await Exercise.find({ unitId: unit._id });

            //Agrega delta de unidad con material y ejercicios
            moduleProgress.unitProgress.push({
              unitId: unit._id,
              materialProgress: materials.map(material => ({ materialId: material._id, read: false })),
              exerciseProgress: exercises.map(exercise => ({ exerciseId: exercise._id, completed: false })),
              unitCompleted: false
            });
          } else {
            //Unidad existe, pero verificamos nuevos materiales o ejercicios
            const materials = await Material.find({ unitId: unit._id });
            const exercises = await Exercise.find({ unitId: unit._id });

            for (let material of materials) {
              if (!unitProgress.materialProgress.some(mp => mp.materialId.toString() === material._id.toString())) {
                console.log("en if delta material");
                unitProgress.materialProgress.push({ materialId: material._id, read: false });
              }
            }

            for (let exercise of exercises) {
              if (!unitProgress.exerciseProgress.some(ep => ep.exerciseId.toString() === exercise._id.toString())) {
                console.log("en if delta ejercicio");
                unitProgress.exerciseProgress.push({ exerciseId: exercise._id, completed: false });
              }
            }
          }
        }
      }
    }
    await progress.save();
    return res.status(200).json({ mensaje: "Progreso del usuario actualizado", progress });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
