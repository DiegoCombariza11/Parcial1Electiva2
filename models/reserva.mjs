import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    recurso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recurso',
        required: [true, 'El recurso es obligatorio']
    },
    solicitante: {
        type: String,
        required: [true, 'El nombre del solicitante es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    horaInicio: {
        type: String,
        required: [true, 'La hora de inicio es obligatoria'],
        match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:MM)']
    },
    horaFin: {
        type: String,
        required: [true, 'La hora de fin es obligatoria'],
        match: [/^([0-1]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido (HH:MM)']
    },
    motivo: {
        type: String,
        trim: true,
        maxlength: [300, 'El motivo no puede exceder 300 caracteres']
    }
}, { timestamps: true });

const Reserva = mongoose.model('Reserva', reservaSchema);
export default Reserva;
