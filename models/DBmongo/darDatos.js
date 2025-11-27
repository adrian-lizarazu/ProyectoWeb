const mongoose = require("mongoose");
require("dotenv").config();

const RangoEdad = require("../RangoEdad");
const Dificultad = require("../Dificultad");
const Categoria = require("../Categoria");
const Subcategoria = require("../Subcategoria");

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

const seedData = async () => {
  try {
    console.log("Limpiando datos existentes");
    await Subcategoria.deleteMany({});
    await Categoria.deleteMany({});
    await Dificultad.deleteMany({});
    await RangoEdad.deleteMany({});

    const rangosEdad = await RangoEdad.insertMany([
      { edadMinima: 6, edadMaxima: 8 },
      { edadMinima: 9, edadMaxima: 12 },
      { edadMinima: 13, edadMaxima: 17 },
      { edadMinima: 18, edadMaxima: 25 },
      { edadMinima: 26, edadMaxima: 40 },
    ]);
    console.log(`${rangosEdad.length} rangos de edad insertados`);

    const dificultades = await Dificultad.insertMany([
      { nombre: "Muy Fácil", medida: "Baja", nivel: 1 },
      { nombre: "Fácil", medida: "Media-Baja", nivel: 2 },
      { nombre: "Intermedia", medida: "Media", nivel: 3 },
      { nombre: "Difícil", medida: "Media-Alta", nivel: 4 },
      { nombre: "Muy Difícil", medida: "Alta", nivel: 5 },
      { nombre: "Experto", medida: "Muy Alta", nivel: 6 },
    ]);
    console.log(`${dificultades.length} niveles de dificultad insertados`);

    const categorias = await Categoria.insertMany([
      { titulo: "Matematicas", descripcion: "" },
      { titulo: "Lenguaje", descripcion: "" },
      { titulo: "Biologia", descripcion: "" },
      { titulo: "Computacion", descripcion: "" },
      {
        titulo: "Ciencias Sociales",
        descripcion: "Actividades culinarias y gastronómicas",
      },
    ]);
    console.log(`${categorias.length} categorías insertadas`);

    const subcategorias = await Subcategoria.insertMany([
      { titulo: "Algebra", categoria: categorias[0]._id },
      { titulo: "Calculo", categoria: categorias[0]._id },
      { titulo: "Factorizacino", categoria: categorias[0]._id },

      { titulo: "Lectura", categoria: categorias[1]._id },
      { titulo: "Verbos", categoria: categorias[1]._id },
      { titulo: "Sujeto y predicado", categoria: categorias[1]._id },

      { titulo: "Zoologia", categoria: categorias[2]._id },
      { titulo: "Botanica", categoria: categorias[2]._id },
      { titulo: "Vertebrados", categoria: categorias[2]._id },

      { titulo: "Programación", categoria: categorias[3]._id },
      { titulo: "Robótica", categoria: categorias[3]._id },
      { titulo: "Diseño Web", categoria: categorias[3]._id },
      { titulo: "Ofimatica", categoria: categorias[3]._id },

      { titulo: "Historia de Bolivia", categoria: categorias[4]._id },
      { titulo: "Segunda Guerra Mundial", categoria: categorias[4]._id },
      { titulo: "Geografia", categoria: categorias[4]._id },
    ]);
    console.log(` ${subcategorias.length} subcategorías insertadas`);

    console.log("\n ¡Todos los datos insertados correctamente!");
    console.log(`Resumen:`);
    console.log(`   - ${rangosEdad.length} rangos de edad`);
    console.log(`   - ${dificultades.length} niveles de dificultad`);
    console.log(`   - ${categorias.length} categorías`);
    console.log(`   - ${subcategorias.length} subcategorías`);

    return true;
  } catch (error) {
    console.error(" Error insertando datos:", error);
    return false;
  }
};

const runSeed = async () => {
  console.log(" Iniciando inserción de datos...\n");

  const connected = await connectDB();
  if (!connected) {
    console.log(" No se pudo conectar a la base de datos");
    process.exit(1);
  }

  const seeded = await seedData();
  if (seeded) {
    console.log("\n Script completado exitosamente");
  } else {
    console.log("\n Hubo errores en la inserción de datos");
  }

  mongoose.connection.close();
  console.log("Conexión a MongoDB cerrada");
  process.exit(0);
};

if (require.main === module) {
  runSeed();
}

module.exports = {
  connectDB,
  seedData,
  runSeed,
  RangoEdad,
  Dificultad,
  Categoria,
  Subcategoria,
};
