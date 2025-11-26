const mongoose = require('mongoose');

const subcategoriaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
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

// Índice compuesto para evitar subcategorías duplicadas en la misma categoría
subcategoriaSchema.index({ titulo: 1, categoria: 1 }, { unique: true });

module.exports = mongoose.model('Subcategoria', subcategoriaSchema);