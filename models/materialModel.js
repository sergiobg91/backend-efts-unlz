import  mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: String,
  type: String, enum: ['text', 'pdf', 'video', 'image', 'audio'],
  // unitNumber: {type: Number, ref: 'Unit'},
  unitId: {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
  content: Object,
})

export default mongoose.model('Material', materialSchema);