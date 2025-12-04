const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Usuario = require("../Usuario");
const { getActiveUser } = require("../../authState");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado correctamente");
    return true;
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    return false;
  }
};

function validarNombre(nombre) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarRol(rol) {
  return ["Administrador", "Editor", "Estudiante"].includes(rol);
}

async function crearUsuario(nombre, email, password, rolDeseado) {
  const rolActual = getActiveUser();
  if (!nombre || !email || !password || !rolDeseado) {
    throw new Error("Faltan parámetros: nombre, email, password o rolDeseado.");
  }

  if (!validarNombre(nombre)) {
    throw new Error("El nombre solo puede contener letras y espacios.");
  }

  if (!validarEmail(email)) {
    throw new Error("El email no tiene un formato válido.");
  }

  if (!validarRol(rolDeseado)) {
    throw new Error(
      "El rol deseado no es válido. Solo se permiten los roles: Administrador, Editor, Estudiante."
    );
  }

  if (rolActual === "Inactivo") {
    if (rolDeseado === "Estudiante") {
      throw new Error(
        "Error: inicie sesión en su cuenta de Administrador para crear usuarios Estudiante."
      );
    }
  } else if (rolActual === "Administrador") {
    if (rolDeseado !== "Estudiante") {
      throw new Error("Un Administrador solo puede crear usuarios Estudiante.");
    }
  } else {
    throw new Error(
      "El rol de " + rolActual + " no tiene permisos para crear usuarios."
    );
  }

  const existe = await Usuario.findOne({ email });
  if (existe)
    throw new Error("Ya existe un usuario con ese correo electrónico.");

  const passwordHash = await bcrypt.hash(password, 10);

  const usuario = new Usuario({
    nombre,
    email,
    password: passwordHash,
    rol: rolDeseado,
    activo: true,
  });

  await usuario.save();
  console.log(`Usuario ${rolDeseado} creado correctamente`);
  return usuario;
}

const run = async () => {
  const connected = await connectDB();
  if (!connected) return;

  try {
    await crearUsuario("Juan Perez", "juan@mail.com", "123456", "Estudiante");
  } catch (err) {
    console.log("Error:", err.message);
  }

  mongoose.connection.close();
  console.log("Conexión cerrada.");
};

if (require.main === module) {
  run();
}

module.exports = { crearUsuario, connectDB };
