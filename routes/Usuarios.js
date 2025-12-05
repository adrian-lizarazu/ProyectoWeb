const express = require("express");
const router = express.Router();

const { optionalAuth } = require("../optionalAuth");
const { crearUsuarioDesdeAPI } = require("../Control/usuarioController");

router.post("/crear", optionalAuth, crearUsuarioDesdeAPI);

module.exports = router;
