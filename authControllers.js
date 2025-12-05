const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("./models/Usuario");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.findOne({ email });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Contraseña incorrecta" });

  // Genera token con id y rol
  const token = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({ mensaje: "Login exitoso", token });
};
