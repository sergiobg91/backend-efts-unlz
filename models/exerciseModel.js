
import mongoose from 'mongoose';

// const exerciseSchema = new mongoose.Schema({
//   title: { type: String, required: true }, 
//   moduleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Module'},
//   unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
//   excerciseNumber: {type: Number, require: true},
//   type: { type: String, required: true }, //'multiple-choice', 'youtube', 'listening', 'writing', 'fill-blanks',
//   content: Object
// });

// export default mongoose.model('Exercise', exerciseSchema);

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  exerciseNumber: { type: Number, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['multiple-choice', 'video', 'audio', 'writing', 'fill-blanks'] 
  }, 
  content: {
    prompts: { type: [String], required: true },
    answers: { type: [mongoose.Schema.Types.Mixed], required: true },
    media: { type: String }// URL para type video y audio
  }
});

export default mongoose.model('Exercise', exerciseSchema);