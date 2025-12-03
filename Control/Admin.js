module.exports = (req, res, next) => {
  if (req.usuario.rol !== "Admin") {
    return res.status(403).json({ mensaje: "Acceso solo para administradores" });
  }
  next();
};
