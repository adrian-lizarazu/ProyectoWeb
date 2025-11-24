const express = require("express");
const router = express.Router();
const Dificultad = require("../models/Dificultad");

// CREATE
router.post("/", async (req, res) => {
  const item = new Dificultad(req.body);
  await item.save();
  res.json(item);
});

// READ
router.get("/", async (req, res) => {
  const items = await Dificultad.find();
  res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const item = await Dificultad.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Dificultad.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
});

module.exports = router;
