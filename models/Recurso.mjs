import mongoose from 'mongoose';


// Recurso Schema
const RecursoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    capacidad: { type: Number, required: true },
    estado: { type: String, required: true },
});

const Recurso = mongoose.model('Recurso', RecursoSchema);

export default Recurso;