import User from '../models/userModel.js';
import { generateToken } from '../services/auth.services.js'
import { comparePassword } from '../services/password.services.js';

// Registro
export const register = async (req, res) => {

  const { name, lastName, email, password } = req?.body;

  if (!name || ! lastName || !email || !password)
    return res.status(400).json({messege: 'Todos los campos son requeridos'})

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Usuario ya registrado" });

    const user = new User(
      { 
        name,
        lastName,
        email,
        password
      });

    await user.save();

    const token = generateToken(user)
    return res.status(201).json({ token, userId: user._id });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Credenciales incorrectas" });

    const ifPasswordOk  = await comparePassword(password, user.password)
    if (!ifPasswordOk)
      return res.status(400).json({ message: "Credenciales incorrectas" });

    const token = generateToken(user)
    return res.status(200).json({ token, userId: user._id });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
