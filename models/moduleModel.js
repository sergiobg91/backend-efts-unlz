import  mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  moduleNumber:  Number,
  name: String,
  description: String,
  units: Number
})

//con este esquema resolvemos array de objetos para el frontend
const mainModuleSchema = new mongoose.Schema({
  modules: [moduleSchema]
})

export default mongoose.model('Module', mainModuleSchema);