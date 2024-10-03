import  mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({  
  id: { type: Number, required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  units:{ type: Number, required: true }
})

//con este esquema resolvemos array de objetos para el frontend
const mainModuleSchema = new mongoose.Schema({
  modules: [moduleSchema]
})

const MainModule = mongoose.model('mainModule', mainModuleSchema); 
const Module = mongoose.model('Module', moduleSchema); 

export default {
  MainModule,
  Module
};