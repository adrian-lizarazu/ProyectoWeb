const mongoose = require('mongoose');

const dificultadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    medida: {
        type: String,
        required: true,
        trim: true
    },
    nivel: {
        type: Number,
        default: 1,
        min: 1,
        max: 10
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Dificultad', dificultadSchema);