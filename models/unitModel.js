import  mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  name: String,
  material: Boolean,
  excercise: Boolean,
  icon: Number, //sirve como id numerico para identificar la unidad tambien
  moduleNumber: { type: Number , ref: 'Module' } 
})

export default mongoose.model('Unit', unitSchema);