import dotenv from 'dotenv';
import express from 'express';
// import authRoutes from '../routes/authRoutes.js'
// import usersRoutes from '../routes/userRoutes.js'
dotenv.config()

const app = express()
app.use(express.json())//middleware para uso de json

//Route authenticate
// app.use('/auth', authRoutes)
// app.use('/users', usersRoutes)
app.use('/', ()=> {})

export default app
