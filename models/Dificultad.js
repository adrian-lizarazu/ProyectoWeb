const mongoose = require("mongoose");

const DificultadSchema = new mongoose.Schema({
  nombre: String,
});

module.exports = mongoose.model("Dificultad", DificultadSchema);
