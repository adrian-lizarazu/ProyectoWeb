require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
   

const app = express();
app.use(express.json());

const editorRoutes = require("./routes/editor");
app.use("/editor", editorRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const cuestionarioRoutes = require("./routes/cuestionarios");
app.use("/cuestionarios", cuestionarioRoutes);

const usuariosRoutes = require("./routes/Usuarios");
app.use("/usuarios", usuariosRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});


