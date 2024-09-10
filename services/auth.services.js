import jwt from "jsonwebtoken"

const JWT_SECRET= process.env.JWT_SECRET || 'default-secret'

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {expiresIn: '1h'})
}

export const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] //token despues del bearer

  if(!token) {
    res.status(401).json({message: "No autorizado"})
  }

  jwt.verify((token || 'token'), (JWT_SECRET || 'default'), (err, decoded)=> {

    if (err) {
      console.error("Error en la autenticacion")
      return res.status(403).json({error: "Sin acceso al recurso"})
    }
  })
  
  next()
}