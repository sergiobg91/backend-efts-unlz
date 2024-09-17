import  mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  id:  Number,
  name: String,
  description: String,
  units: Number
})

export default mongoose.model('Module', moduleSchema);