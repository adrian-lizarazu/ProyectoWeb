const express = require("express");
const router = express.Router();
const editorController = require("../Control/editorController");

// CATEGORÍA
router.get("/categoria", editorController.obtenerCategorias);
router.post("/categoria", editorController.crearCategoria);
router.put("/categoria/:id", editorController.actualizarCategoria);

// SUBCATEGORÍA
router.get("/subcategoria", editorController.obtenerSubcategorias);
router.post("/subcategoria", editorController.crearSubcategoria);
router.put("/subcategoria/:id", editorController.actualizarSubcategoria);

// DIFICULTAD
router.get("/dificultad", editorController.obtenerDificultades);
router.post("/dificultad", editorController.crearDificultad);
router.put("/dificultad/:id", editorController.actualizarDificultad);

// RANGO EDAD
router.get("/rangoEdad", editorController.obtenerRangosEdad);
router.post("/rangoEdad", editorController.crearRangoEdad);
router.put("/rangoEdad/:id", editorController.actualizarRangoEdad);

module.exports = router;
