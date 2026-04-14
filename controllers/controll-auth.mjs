import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.mjs';

async function register(req, res) {
    try {
        const { nombre, email, password } = req.body;

        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ state: false, message: 'Ya existe un usuario con ese email.' });
        }

        const usuario = new Usuario({ nombre, email, password });
        await usuario.save();

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
        );

        res.status(201).json({
            state: true,
            message: 'Usuario registrado exitosamente.',
            token,
            usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        res.status(400).json({ state: false, message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ state: false, message: 'Credenciales inválidas.' });
        }

        const passwordCorrecta = await usuario.compararPassword(password);
        if (!passwordCorrecta) {
            return res.status(401).json({ state: false, message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
        );

        res.status(200).json({
            state: true,
            message: 'Login exitoso.',
            token,
            usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        res.status(500).json({ state: false, message: error.message });
    }
}

export { register, login };
