import mongoose from 'mongoose';


// usuario Schema
const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;