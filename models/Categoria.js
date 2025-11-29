const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      unique: true,
      validate: {
        validator: (v) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(v),
        message: "El título solo puede contener letras y espacios",
      },
    },
    descripcion: {
      type: String,
      trim: true,
    },
    activa: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categoria", categoriaSchema);
