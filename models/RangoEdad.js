const mongoose = require("mongoose");

const RangoEdadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edadMin: { type: Number, required: true },
  edadMax: { type: Number, required: true },
});

module.exports = mongoose.model("RangoEdad", RangoEdadSchema);
