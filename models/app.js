const express = require('express');
const connectDB = require('../config/database');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/catalogos', require('./routes/catalogos'));

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando con MongoDB' });
});

// Ejemplo de ruta para usuarios
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});