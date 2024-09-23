import  mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: String,
  type: String, enum: ['text', 'pdf', 'video', 'image', 'audio'],
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module'},
  unitId: {type: Number, ref: 'Unit'},
  isRead: {type: Boolean, default: false},
  content: Object,
})

export default mongoose.model('Material', materialSchema);