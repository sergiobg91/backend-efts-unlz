import  mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  //Referencia al usuario
  moduleProgress: [
    {
      moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },  //Referencia al modulo
      unitProgress: [
        {
          unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },  //Referencia a la unidad
          materialProgress: [
            {
              materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },  //Referencia al material
              read: { type: Boolean, default: false }  // 
            }
          ],
          exerciseProgress: [
            {
              exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },  // Referencia al ejercicio dentro de unidad
              completed: { type: Boolean, default: false }
            }
          ],
          unitCompleted: { type: Boolean, default: false }  //flag para front de unidad marcada
        }
      ],
      moduleCompleted: { type: Boolean, default: false },  //flag para front de modulo marcado
      moduleProgressPercentage: { type: Number, default: 0 }  // Progreso del modulo en porcentaje
    }
  ]
});

export default mongoose.model('Progress', progressSchema);