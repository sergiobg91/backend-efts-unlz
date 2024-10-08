import  mongoose from 'mongoose';
import { hashPassword } from '../services/password.services.js';

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  profilePicture: String,
  passwordResetToken: String,  
  passwordResetExpires: Date ,
  // exercisesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }]
});

// Middleware para hashear la contrasenia antes de guardar el usuario
userSchema.pre('save', async function (next) {
  this.password = await hashPassword(this.password)
  next();
});

export default mongoose.model('User', userSchema)
