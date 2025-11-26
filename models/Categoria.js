const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    activa: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Categoria', categoriaSchema);