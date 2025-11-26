const mongoose = require("mongoose");
require("dotenv").config();

// Importar modelos - ajusta las rutas según tu estructura
const RangoEdad = require("../RangoEdad");
const Dificultad = require("../Dificultad");
const Categoria = require("../Categoria");
const Subcategoria = require("../Subcategoria");

// Función para conectar a la base de datos - VERSIÓN CORREGIDA
const connectDB = async () => {
  try {
    // Conexión simplificada - sin opciones obsoletas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB conectado correctamente");
    return true;
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    return false;
  }
};

// El resto del código permanece igual...
const seedData = async () => {
  try {
    console.log("🗑️  Limpiando datos existentes...");

    // Limpiar datos existentes en orden correcto (por dependencias)
    await Subcategoria.deleteMany({});
    await Categoria.deleteMany({});
    await Dificultad.deleteMany({});
    await RangoEdad.deleteMany({});

    console.log("📝 Insertando datos iniciales...");

    // 1. Insertar Rangos de Edad
    const rangosEdad = await RangoEdad.insertMany([
      { edadMinima: 0, edadMaxima: 2 },
      { edadMinima: 3, edadMaxima: 5 },
      { edadMinima: 6, edadMaxima: 8 },
      { edadMinima: 9, edadMaxima: 12 },
      { edadMinima: 13, edadMaxima: 17 },
      { edadMinima: 18, edadMaxima: 25 },
      { edadMinima: 26, edadMaxima: 40 },
      { edadMinima: 41, edadMaxima: 60 },
      { edadMinima: 61, edadMaxima: 100 },
    ]);
    console.log(`✅ ${rangosEdad.length} rangos de edad insertados`);

    // 2. Insertar Dificultades
    const dificultades = await Dificultad.insertMany([
      { nombre: "Muy Fácil", medida: "Baja", nivel: 1 },
      { nombre: "Fácil", medida: "Media-Baja", nivel: 2 },
      { nombre: "Intermedia", medida: "Media", nivel: 3 },
      { nombre: "Difícil", medida: "Media-Alta", nivel: 4 },
      { nombre: "Muy Difícil", medida: "Alta", nivel: 5 },
      { nombre: "Experto", medida: "Muy Alta", nivel: 6 },
    ]);
    console.log(`✅ ${dificultades.length} niveles de dificultad insertados`);

    // 3. Insertar Categorías
    const categorias = await Categoria.insertMany([
      { titulo: "Deportes", descripcion: "Actividades deportivas y físicas" },
      { titulo: "Arte", descripcion: "Expresiones artísticas y creativas" },
      {
        titulo: "Educación",
        descripcion: "Actividades de aprendizaje y desarrollo",
      },
      {
        titulo: "Tecnología",
        descripcion: "Actividades relacionadas con tecnología",
      },
      {
        titulo: "Cocina",
        descripcion: "Actividades culinarias y gastronómicas",
      },
    ]);
    console.log(`✅ ${categorias.length} categorías insertadas`);

    // 4. Insertar Subcategorías
    const subcategorias = await Subcategoria.insertMany([
      // Subcategorías para Deportes
      { titulo: "Fútbol", categoria: categorias[0]._id },
      { titulo: "Baloncesto", categoria: categorias[0]._id },
      { titulo: "Natación", categoria: categorias[0]._id },
      { titulo: "Ciclismo", categoria: categorias[0]._id },

      // Subcategorías para Arte
      { titulo: "Pintura", categoria: categorias[1]._id },
      { titulo: "Música", categoria: categorias[1]._id },
      { titulo: "Danza", categoria: categorias[1]._id },
      { titulo: "Escultura", categoria: categorias[1]._id },

      // Subcategorías para Educación
      { titulo: "Matemáticas", categoria: categorias[2]._id },
      { titulo: "Ciencias", categoria: categorias[2]._id },
      { titulo: "Idiomas", categoria: categorias[2]._id },
      { titulo: "Historia", categoria: categorias[2]._id },

      // Subcategorías para Tecnología
      { titulo: "Programación", categoria: categorias[3]._id },
      { titulo: "Robótica", categoria: categorias[3]._id },
      { titulo: "Diseño Web", categoria: categorias[3]._id },
      { titulo: "Inteligencia Artificial", categoria: categorias[3]._id },

      // Subcategorías para Cocina
      { titulo: "Repostería", categoria: categorias[4]._id },
      { titulo: "Cocina Internacional", categoria: categorias[4]._id },
      { titulo: "Cocina Saludable", categoria: categorias[4]._id },
      { titulo: "Bebidas", categoria: categorias[4]._id },
    ]);
    console.log(`✅ ${subcategorias.length} subcategorías insertadas`);

    console.log("\n🎉 ¡Todos los datos insertados correctamente!");
    console.log(`📊 Resumen:`);
    console.log(`   - ${rangosEdad.length} rangos de edad`);
    console.log(`   - ${dificultades.length} niveles de dificultad`);
    console.log(`   - ${categorias.length} categorías`);
    console.log(`   - ${subcategorias.length} subcategorías`);

    return true;
  } catch (error) {
    console.error("❌ Error insertando datos:", error);
    return false;
  }
};

// Función para ejecutar el script completo
const runSeed = async () => {
  console.log("🚀 Iniciando inserción de datos...\n");

  const connected = await connectDB();
  if (!connected) {
    console.log("❌ No se pudo conectar a la base de datos");
    process.exit(1);
  }

  const seeded = await seedData();
  if (seeded) {
    console.log("\n✅ Script completado exitosamente");
  } else {
    console.log("\n❌ Hubo errores en la inserción de datos");
  }

  // Cerrar conexión
  mongoose.connection.close();
  console.log("🔌 Conexión a MongoDB cerrada");
  process.exit(0);
};

// Ejecutar solo si se llama directamente desde la línea de comandos
if (require.main === module) {
  runSeed();
}

// Exportar las funciones para usar en otros archivos
module.exports = {
  connectDB,
  seedData,
  runSeed,
  RangoEdad,
  Dificultad,
  Categoria,
  Subcategoria,
};
