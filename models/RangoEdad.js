const mongoose = require("mongoose");

const rangoEdadSchema = new mongoose.Schema(
  {
    edadMinima: {
      type: Number,
      required: [true, "La edad mínima es obligatoria"],
      min: [0, "La edad mínima no puede ser negativa"],
    },
    edadMaxima: {
      type: Number,
      required: [true, "La edad máxima es obligatoria"],
      validate: {
        validator(value) {
          return value > this.edadMinima;
        },
        message: "La edad máxima debe ser mayor que la edad mínima",
      },
    },
    descripcion: {
      type: String,
      default() {
        return `${this.edadMinima}-${this.edadMaxima} años`;
      },
    },
  },
  { timestamps: true }
);

rangoEdadSchema.index({ edadMinima: 1, edadMaxima: 1 }, { unique: true });

module.exports = mongoose.model("RangoEdad", rangoEdadSchema);
