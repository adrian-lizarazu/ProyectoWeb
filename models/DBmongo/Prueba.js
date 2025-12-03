const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const RangoEdad = require("../RangoEdad");
const Dificultad = require("../Dificultad");
const Categoria = require("../Categoria");
const Subcategoria = require("../Subcategoria");
const Usuario = require("../Usuario"); // Nuevo modelo de usuarios


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

/* ============================
   Crear un usuario (admin o editor)
============================ */
const crearUsuario = async () => {
  try {
    const existe = await Usuario.findOne({ email: "admin@mail.com" });
    if (existe) {
      console.log("El usuario admin ya existe");
      return existe;
    }

    const passwordHash = await bcrypt.hash("123456", 10);

    const usuario = new Usuario({
      nombre: "Admin",
      email: "admin@mail.com",
      password: passwordHash,
      rol: "admin",
      activo: true,
    });

    await usuario.save();
    console.log("Usuario admin creado correctamente");
    return usuario;
  } catch (error) {
    console.error("Error creando usuario:", error.message);
  }
};

/* ============================
   Insertar datos base (solo para admin/editor)
============================ */
const seedData = async () => {
  try {
    console.log("Limpiando datos existentes...");
    await Subcategoria.deleteMany({});
    await Categoria.deleteMany({});
    await Dificultad.deleteMany({});
    await RangoEdad.deleteMany({});

    /* --------------------
       Rangos de edad
    -------------------- */
    const rangosEdad = await RangoEdad.insertMany([
      { edadMinima: 6, edadMaxima: 8 },
      { edadMinima: 9, edadMaxima: 12 },
      { edadMinima: 13, edadMaxima: 17 },
      { edadMinima: 18, edadMaxima: 25 },
      { edadMinima: 26, edadMaxima: 40 },
    ]);
    console.log(`${rangosEdad.length} rangos de edad insertados`);

    /* --------------------
       Dificultades
    -------------------- */
    const dificultades = await Dificultad.insertMany([
      { nombre: "Muy Fácil", medida: "Baja", nivel: 1 },
      { nombre: "Fácil", medida: "Media Baja", nivel: 2 },
      { nombre: "Intermedia", medida: "Media", nivel: 3 },
      { nombre: "Difícil", medida: "Media Alta", nivel: 4 },
      { nombre: "Muy Difícil", medida: "Alta", nivel: 5 },
      { nombre: "Experto", medida: "Muy Alta", nivel: 6 },
    ]);
    console.log(`${dificultades.length} niveles de dificultad insertados`);

    /* --------------------
       Categorías
    -------------------- */
    const categorias = await Categoria.insertMany([
      { titulo: "Matemáticas", descripcion: "Descripción matemática" },
      { titulo: "Lenguaje", descripcion: "Descripción lenguaje" },
      { titulo: "Biología", descripcion: "Descripción biología" },
      { titulo: "Computación", descripcion: "Descripción computación" },
      { titulo: "Ciencias Sociales", descripcion: "Descripción ciencias sociales" },
    ]);
    console.log(`${categorias.length} categorías insertadas`);

    /* --------------------
       Subcategorías
    -------------------- */
    const subcategorias = await Subcategoria.insertMany([
      { titulo: "Algebra", categoria: categorias[0]._id },
      { titulo: "Cálculo", categoria: categorias[0]._id },
      { titulo: "Lectura", categoria: categorias[1]._id },
      { titulo: "Verbos", categoria: categorias[1]._id },
      { titulo: "Zoología", categoria: categorias[2]._id },
      { titulo: "Botánica", categoria: categorias[2]._id },
      { titulo: "Programación", categoria: categorias[3]._id },
      { titulo: "Robótica", categoria: categorias[3]._id },
      { titulo: "Historia", categoria: categorias[4]._id },
    ]);
    console.log(`${subcategorias.length} subcategorías insertadas`);

    console.log("\n¡Datos insertados correctamente!");
  } catch (error) {
    console.error("Error insertando datos:", error.message);
  }
};

/* ============================
   Ejecutar todo
============================ */
const runSeed = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.log("No se pudo conectar a la base de datos");
    process.exit(1);
  }

  await crearUsuario(); // Crea usuario admin
  await seedData(); // Crea categorías, subcategorías, rangos y dificultades

  mongoose.connection.close();
  console.log("Conexión a MongoDB cerrada");
  process.exit(0);
};


if (require.main === module) {
  runSeed();
}

module.exports = {
  connectDB,
  crearUsuario,
  seedData,
};
