
import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  id: { type: Number, required: true }, 
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  type: { String, enum: ['multiple-choice', 'youtube', 'listening', 'writing', 'complete-blanks'] },
  content: Object
});

export default mongoose.model('Exercise', exerciseSchema);

