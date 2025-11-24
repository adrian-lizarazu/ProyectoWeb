const express = require("express");
const router = express.Router();
const RangoEdad = require("../models/RangoEdad");

// CREATE
router.post("/", async (req, res) => {
  const item = new RangoEdad(req.body);
  await item.save();
  res.json(item);
});

// READ
router.get("/", async (req, res) => {
  const items = await RangoEdad.find();
  res.json(items);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const item = await RangoEdad.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await RangoEdad.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
});

module.exports = router;
