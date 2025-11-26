const mongoose = require('mongoose');

const rangoEdadSchema = new mongoose.Schema({
    edadMinima: {
        type: Number,
        required: true,
        min: 0
    },
    edadMaxima: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.edadMinima;
            },
            message: 'La edad máxima debe ser mayor que la edad mínima'
        }
    },
    descripcion: {
        type: String,
        default: function() {
            return `${this.edadMinima}-${this.edadMaxima} años`;
        }
    }
}, {
    timestamps: true
});

// Índice para evitar rangos duplicados
rangoEdadSchema.index({ edadMinima: 1, edadMaxima: 1 }, { unique: true });

module.exports = mongoose.model('RangoEdad', rangoEdadSchema);