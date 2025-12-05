const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const validarEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const validarNombre = (nombre) => {
  return /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre);
};

exports.crearUsuarioDesdeAPI = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res
        .status(400)
        .json({ error: "Faltan parámetros: nombre, email, password o rol." });
    }

    if (!validarNombre(nombre)) {
      return res
        .status(400)
        .json({ error: "Nombre inválido: sólo letras y espacios." });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    const rolesPermitidos = ["Administrador", "Editor", "Estudiante"];
    if (!rolesPermitidos.includes(rol)) {
      return res.status(400).json({ error: "Rol inválido." });
    }

    const requester = req.user;

    if (!requester) {
      if (!["Administrador", "Editor"].includes(rol)) {
        return res.status(403).json({
          error:
            "Usuarios no autenticados sólo pueden crear Administrador o Editor.",
        });
      }
    } else {
      if (requester.rol !== "Administrador") {
        return res.status(403).json({
          error:
            "Sólo Administrador puede crear usuarios cuando está autenticado.",
        });
      }

      if (rol !== "Estudiante") {
        return res.status(403).json({
          error: "Administrador autenticado sólo puede crear Estudiantes.",
        });
      }
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    const usuario = new Usuario({ nombre, email, password, rol, activo: true });
    await usuario.save();

    const { password: _, ...usuarioSafe } = usuario.toObject();

    return res
      .status(201)
      .json({ message: "Usuario creado", usuario: usuarioSafe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
