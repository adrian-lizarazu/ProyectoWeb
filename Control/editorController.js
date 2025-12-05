const Categoria = require("../models/Categoria");
const Subcategoria = require("../models/Subcategoria");
const Dificultad = require("../models/Dificultad");
const RangoEdad = require("../models/RangoEdad");

exports.crearCategoria = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const categoria = await Categoria.create({ titulo, descripcion });
    res.json({ mensaje: "Categoría creada", categoria });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { titulo, descripcion },
      { new: true }
    );
    res.json({ mensaje: "Categoría actualizada", categoria });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lo mismo para Subcategoria, Dificultad y RangoEdad
exports.crearSubcategoria = async (req, res) => {
  try {
    const { titulo, categoria } = req.body;
    const subcategoria = await Subcategoria.create({ titulo, categoria });
    res.json({ mensaje: "Subcategoría creada", subcategoria });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, categoria } = req.body;
    const subcategoria = await Subcategoria.findByIdAndUpdate(
      id,
      { titulo, categoria },
      { new: true }
    );
    res.json({ mensaje: "Subcategoría actualizada", subcategoria });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.crearDificultad = async (req, res) => {
  try {
    const { nombre, medida, nivel } = req.body;
    const dificultad = await Dificultad.create({ nombre, medida, nivel });
    res.json({ mensaje: "Dificultad creada", dificultad });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarDificultad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, medida, nivel } = req.body;
    const dificultad = await Dificultad.findByIdAndUpdate(
      id,
      { nombre, medida, nivel },
      { new: true }
    );
    res.json({ mensaje: "Dificultad actualizada", dificultad });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.crearRangoEdad = async (req, res) => {
  try {
    const { edadMinima, edadMaxima } = req.body;
    const rangoEdad = await RangoEdad.create({ edadMinima, edadMaxima });
    res.json({ mensaje: "Rango de edad creado", rangoEdad });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizarRangoEdad = async (req, res) => {
  try {
    const { id } = req.params;
    const { edadMinima, edadMaxima } = req.body;
    const rangoEdad = await RangoEdad.findByIdAndUpdate(
      id,
      { edadMinima, edadMaxima },
      { new: true }
    );
    res.json({ mensaje: "Rango de edad actualizado", rangoEdad });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
