import  mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  name: String,
  material: Boolean,
  excercise: Boolean,
  //icon: integer -> Agregar número que indique qué unidad es (lo necesita el front)
  moduleId: { type: mongoose.Schema.Types.ObjectId , ref: 'Module' } 
})

export default mongoose.model('Unit', unitSchema);