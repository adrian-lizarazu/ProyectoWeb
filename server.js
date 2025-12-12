require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const https = require("https");

const app = express();
app.use(express.json());

// RUTAS
const editorRoutes = require("./routes/editor");
app.use("/editor", editorRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const cuestionarioRoutes = require("./routes/cuestionarios");
app.use("/cuestionarios", cuestionarioRoutes);

const usuariosRoutes = require("./routes/Usuarios");
app.use("/usuarios", usuariosRoutes);

// CONEXIÓN A MONGO
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

// RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente con HTTPS (HTTP/1.1).");
});

// CONFIGURACIÓN DEL CERTIFICADO
const certDir = path.join(__dirname, "certs");

const httpsOptions = {
  key: fs.readFileSync(path.join(certDir, "localhost.key")),
  cert: fs.readFileSync(path.join(certDir, "localhost.crt")),
};

// SERVIDOR HTTPS ÚNICO
https.createServer(httpsOptions, app).listen(8443, () => {
  console.log("Servidor HTTPS Express en https://localhost:8443");
});
