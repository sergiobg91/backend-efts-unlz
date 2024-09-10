import  mongoose from 'mongoose';
import { hashPassword } from '../services/password.services.js';


// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   profilePicture: { type: String, default: '' }
// });

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  profilePicture: String
});


// Middleware para hashear la contrasenia antes de guardar el usuario
userSchema.pre('save', async function (next) {
  this.password = await hashPassword(this.password)
  next();
});

export default  mongoose.model('User', userSchema);
