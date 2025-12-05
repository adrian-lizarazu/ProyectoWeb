const express = require("express");
const router = express.Router();
const soloEditor = require("../middlewares/soloEditor");
const {
  crearCategoria,
  actualizarCategoria,
  crearSubcategoria,
  actualizarSubcategoria,
  crearDificultad,
  actualizarDificultad,
  crearRangoEdad,
  actualizarRangoEdad,
} = require("../Control/editorController");

router.post("/categoria", soloEditor, crearCategoria);
router.put("/categoria/:id", soloEditor, actualizarCategoria);

router.post("/subcategoria", soloEditor, crearSubcategoria);
router.put("/subcategoria/:id", soloEditor, actualizarSubcategoria);

router.post("/dificultad", soloEditor, crearDificultad);
router.put("/dificultad/:id", soloEditor, actualizarDificultad);

router.post("/rangoEdad", soloEditor, crearRangoEdad);
router.put("/rangoEdad/:id", soloEditor, actualizarRangoEdad);

module.exports = router;
