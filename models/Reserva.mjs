import mongoose from 'mongoose';


// Reserva Schema
const ReservaSchema = new mongoose.Schema({
    recurso: { type: mongoose.Schema.Types.ObjectId, ref: 'Recurso', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha: { type: Date, required: true },
    horaInicio: { type: String, required: true },
    horaFin: { type: String, required: true },
    
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

export default Reserva;