const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
