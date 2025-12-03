require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

const usuariosRoutes = require("./routes/Usuarios");
app.use("/usuarios", usuariosRoutes);

const dificultadRoutes = require("./routes/dificultad");
app.use("/dificultad", dificultadRoutes);

const categoriaRoutes = require("./routes/categoria");
app.use("/categoria", categoriaRoutes);

const subcategoriaRoutes = require("./routes/subcategoria");
app.use("/subcategoria", subcategoriaRoutes);

const rangoEdadRoutes = require("./routes/rangoEdad");
app.use("/rangoEdad", rangoEdadRoutes);
