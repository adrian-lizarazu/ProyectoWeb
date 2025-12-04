const mongoose = require("mongoose");

const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

const dificultadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      unique: true,
      validate: {
        validator: (v) => {
          if (!v) return false;
          const texto = v.trim();
          if (texto.length === 0) return false;
          return soloLetras.test(texto);
        },
        message: "El nombre solo puede contener letras y no puede estar vacío",
      },
    },
    medida: {
      type: String,
      required: [true, "La medida es obligatoria"],
      trim: true,
      validate: {
        validator: (v) => {
          if (!v) return false;
          const texto = v.trim();
          if (texto.length === 0) return false;
          return soloLetras.test(texto);
        },
        message: "La medida solo puede contener letras y no puede estar vacía",
      },
    },
    nivel: {
      type: Number,
      default: 1,
      min: [1, "El nivel mínimo es 1"],
      max: [10, "El nivel máximo es 10"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dificultad", dificultadSchema);
