const mongoose = require("mongoose");

const dificultadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      unique: true,
      validate: {
        validator: (v) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(v),
        message: "El nombre solo puede contener letras y espacios",
      },
    },
    medida: {
      type: String,
      required: [true, "La medida es obligatoria"],
      trim: true,
      validate: {
        validator: (v) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(v),
        message: "La medida solo puede contener letras y espacios",
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
