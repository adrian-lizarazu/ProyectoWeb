const express = require("express");
const router = express.Router();
const Subcategoria = require("../models/Subcategoria");

// CREATE
router.post("/", async (req, res) => {
  const item = new Subcategoria(req.body);
  await item.save();
  res.json(item);
});

// READ
router.get("/", async (req, res) => {
  const items = await Subcategoria.find();
  res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const item = await Subcategoria.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Subcategoria.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
});

module.exports = router;
