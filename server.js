const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/cuestionario")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

const dificultadRoutes = require("./routes/dificultad");
app.use("/dificultad", dificultadRoutes);

const categoriaRoutes = require("./routes/categoria");
app.use("/categoria", categoriaRoutes);

const subcategoriaRoutes = require("./routes/subcategoria");
app.use("/subcategoria", subcategoriaRoutes);

const rangoEdadRoutes = require("./routes/rangoEdad");
app.use("/rangoEdad", rangoEdadRoutes);
