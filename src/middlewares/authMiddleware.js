const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. No hay token." });
  }
  try {  
    const cifrado = jwt.verify(token, process.env.JWT_SECRET); 
    req.usuario = cifrado;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token no válido o expirado" });
  }
};

module.exports = {
    verificarToken
} 
