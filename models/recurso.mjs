import mongoose from 'mongoose';

const recursoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'El ID del recurso es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del recurso es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad es obligatoria'],
        min: [1, 'La capacidad debe ser al menos 1 persona']
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria'],
        trim: true,
        maxlength: [200, 'La ubicación no puede exceder 200 caracteres']
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Recurso = mongoose.model('Recurso', recursoSchema);
export default Recurso;
