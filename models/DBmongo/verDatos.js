const mongoose = require("mongoose");
require("dotenv").config();

const RangoEdad = require("./models/DBmongo/RangoEdad");
const Dificultad = require("./models/DBmongo/Dificultad");
const Categoria = require("./models/DBmongo/Categoria");
const Subcategoria = require("./models/DBmongo/Subcategoria");

const verDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("CONTENIDO DE LA BASE DE DATOS\n");

    console.log(" RANGOS DE EDAD:");
    const rangos = await RangoEdad.find().sort({ edadMinima: 1 });
    rangos.forEach((rango) => {
      console.log(`   ${rango.edadMinima}-${rango.edadMaxima} años`);
    });

    console.log("\n DIFICULTADES:");
    const dificultades = await Dificultad.find().sort({ nivel: 1 });
    dificultades.forEach((diff) => {
      console.log(`   ${diff.nivel}. ${diff.nombre} (${diff.medida})`);
    });

    console.log("\n CATEGORÍAS Y SUBCATEGORÍAS:");
    const categorias = await Categoria.find();

    for (let categoria of categorias) {
      console.log(`\n  ${categoria.titulo}:`);
      const subcategorias = await Subcategoria.find({
        categoria: categoria._id,
      });
      subcategorias.forEach((sub) => {
        console.log(`      └─ ${sub.titulo}`);
      });
    }

    console.log("\n ESTADÍSTICAS:");
    console.log(`   Total Rangos de Edad: ${rangos.length}`);
    console.log(`   Total Dificultades: ${dificultades.length}`);
    console.log(`   Total Categorías: ${categorias.length}`);
    const totalSubcategorias = await Subcategoria.countDocuments();
    console.log(`   Total Subcategorías: ${totalSubcategorias}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

verDatos();
