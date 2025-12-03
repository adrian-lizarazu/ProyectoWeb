const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const auth = require("../Control/autenticación");
const soloAdmin = require("../Control/Admin");


router.post("/crear", auth, soloAdmin, async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  const valido = await usuario.verificarPassword(password);
  if (!valido) return res.status(401).json({ mensaje: "Credenciales incorrectas" });

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    "secreto123",
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
