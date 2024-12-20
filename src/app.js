import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../routes/authRoutes.js'
import usersRoutes from '../routes/userRoutes.js'
import moduleRoutes from '../routes/moduleRoutes.js'
import unitRoutes from '../routes/unitRoutes.js'
import resetRoutes from '../routes/resetRoutes.js';
import progressRoutes from '../routes/progressRoutes.js';
import materialRoutes from '../routes/materialRoutes.js';
import exerciseRoutes from '../routes/exerciseRoutes.js'
dotenv.config()

const app = express()
app.use(express.json())//middleware para uso de json

//conexion a la BD
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection;


//Rutas USER
app.use('/api/v1/users/auth', authRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/reset', resetRoutes);

//Rutas MODULES
app.use('/api/v1/modules', moduleRoutes)

//Rutas UNITS
app.use('/api/v1/units', unitRoutes)

//Rutas MATERIALS
app.use('/api/v1/materials', materialRoutes)

//Rutas EXCERCISES
app.use('/api/v1/exercises', exerciseRoutes)

//Rutas PROGRESS
app.use('/api/v1/progress', progressRoutes);

export default app

