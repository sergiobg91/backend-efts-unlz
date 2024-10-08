import  mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({  
  id: { type: Number, required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true },
  units:{ type: Number, required: true } //total de unidades dentro del front
})

 export default mongoose.model('Module', moduleSchema);
