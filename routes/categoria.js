const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

// CREATE
router.post("/", async (req, res) => {
  try {
    const item = new Categoria(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Registro duplicado" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Datos inválidos", errors: error.errors });
    }
    res.status(500).json({ message: "Error del servidor", error });
  }
});

// READ
router.get("/", async (req, res) => {
  const items = await Categoria.find();
  res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const item = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) return res.status(404).json({ message: "No encontrado" });

    res.json(item);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Registro duplicado" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Datos inválidos", errors: error.errors });
    }
    res.status(500).json({ message: "Error del servidor", error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const item = await Categoria.findByIdAndDelete(req.params.id);

  if (!item) return res.status(404).json({ message: "No encontrado" });

  res.json({ message: "Eliminado" });
});

module.exports = router;
