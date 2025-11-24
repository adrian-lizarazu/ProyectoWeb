const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

// CREATE
router.post("/", async (req, res) => {
  const item = new Categoria(req.body);
  await item.save();
  res.json(item);
});

// READ
router.get("/", async (req, res) => {
  const items = await Categoria.find();
  res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const item = await Categoria.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
});

module.exports = router;
