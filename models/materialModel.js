import  mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, //'text', 'pdf', 'video', 'image', 'audio'
  moduleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Module'},
  unitId: {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
  content: Object,
})

export default mongoose.model('Material', materialSchema);