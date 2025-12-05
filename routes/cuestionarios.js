const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/responder", verifyToken, (req, res) => {
  const rol = req.user.rol;

  if (rol !== "Estudiante") {
    return res
      .status(403)
      .json({ error: `Rol ${rol} no puede responder cuestionarios` });
  }

  // Aquí iría la lógica real del cuestionario
  res.json({ mensaje: "Cuestionario respondido correctamente" });
});

module.exports = router;
