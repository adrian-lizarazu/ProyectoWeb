const jwt = require("jsonwebtoken");

function soloEditor(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Debe iniciar sesión" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.rol !== "Editor") {
      return res.status(403).json({
        error: `Acceso denegado: el rol ${decoded.rol} no tiene permisos para editar la base de datos`,
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = soloEditor;
