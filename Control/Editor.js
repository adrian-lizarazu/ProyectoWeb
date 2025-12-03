module.exports = (req, res, next) => {
  const rol = req.usuario.rol;

  if (rol === "Editor" || rol === "Admin") {
    return next();
  }

  res.status(403).json({
    mensaje: "Acceso solo para editores o administradores",
  });
};
