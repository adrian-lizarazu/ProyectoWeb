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
      validate: {
        validator: (v) =>
          v === "" || /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ,.()-]+$/.test(v),
        message: "La descripción contiene caracteres no permitidos",
      },
    },
    activa: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categoria", categoriaSchema);
