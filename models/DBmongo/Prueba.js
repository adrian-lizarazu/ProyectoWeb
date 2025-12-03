const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


mongoose
  .connect("mongodb://127.0.0.1:27017/cuestionarios_test")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log("Error MongoDB:", err));


const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  rol: { type: String, enum: ["admin", "editor", "estudiante"], default: "estudiante" },
});

usuarioSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

usuarioSchema.methods.verificarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

const categoriaSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true },
  descripcion: String,
  activa: { type: Boolean, default: true },
});

const Categoria = mongoose.model("Categoria", categoriaSchema);


const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token requerido" });

    const decoded = jwt.verify(token, "secreto123");
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin")
    return res.status(403).json({ msg: "Solo admin" });
  next();
};

const soloEditor = (req, res, next) => {
  if (req.usuario.rol === "admin" || req.usuario.rol === "editor")
    return next();
  res.status(403).json({ msg: "Solo editor/admin" });
};


const app = express();
app.use(express.json());




app.post("/usuarios/crear", auth, soloAdmin, async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json({ msg: "Usuario creado", nuevo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post("/usuarios/login", async (req, res) => {
  const { email, password } = req.body;
  const u = await Usuario.findOne({ email });

  if (!u) return res.status(404).json({ msg: "Usuario no existe" });

  const ok = await u.verificarPassword(password);
  if (!ok) return res.status(401).json({ msg: "Credenciales incorrectas" });

  const token = jwt.sign({ id: u._id, rol: u.rol }, "secreto123", {
    expiresIn: "7d",
  });

  res.json({ token });
});


app.post("/categoria", auth, soloEditor, async (req, res) => {
  try {
    const cat = new Categoria(req.body);
    await cat.save();
    res.json({ msg: "Categoría creada", categoria: cat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get("/categoria", auth, async (req, res) => {
  const lista = await Categoria.find();
  res.json(lista);
});


app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
