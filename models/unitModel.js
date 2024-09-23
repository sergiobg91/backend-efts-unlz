import  mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
  name: String,
  material: Boolean,
  excercise: Boolean,
  icon: Number,
  moduleId: { type: mongoose.Schema.Types.ObjectId , ref: 'Module' } 
})

export default mongoose.model('Unit', unitSchema);