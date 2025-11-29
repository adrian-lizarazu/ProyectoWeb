const mongoose = require("mongoose");

const subcategoriaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      validate: {
        validator: (v) => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(v),
        message: "El título solo puede contener letras y espacios",
      },
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoría es obligatoria"],
    },
    descripcion: {
      type: String,
      trim: true,
    },
    activa: { type: Boolean, default: true },
  },
  { timestamps: true }
);

subcategoriaSchema.index({ titulo: 1, categoria: 1 }, { unique: true });

module.exports = mongoose.model("Subcategoria", subcategoriaSchema);
