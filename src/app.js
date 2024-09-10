import dotenv from 'dotenv';
import express from 'express';
import mongosee from 'mongoose';
import authRoutes from '../routes/authRoutes.js'
import usersRoutes from '../routes/userRoutes.js'
dotenv.config()

const app = express()
app.use(express.json())//middleware para uso de json

//conexion a la BD
mongosee.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongosee.connection;
 
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

//Rutas
app.use('/api/v1/users/auth', authRoutes)
app.use('/api/v1/users', usersRoutes)



export default app
