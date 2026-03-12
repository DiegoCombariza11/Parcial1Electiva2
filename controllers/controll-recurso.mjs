import Recurso from '../models/recurso.mjs';

async function createRecurso(req, res) {
    try {
        const recurso = new Recurso(req.body);
        await recurso.save();
        res.status(201).json({ state: true, message: 'Recurso creado exitosamente', data: recurso });
    } catch (error) {
        res.status(400).json({ state: false, message: error.message });
    }
}

async function getAllRecursos(req, res) {
    try {
        const recursos = await Recurso.find({ isActive: true }).sort({ nombre: 1 });
        res.status(200).json({ state: true, data: recursos, total: recursos.length });
    } catch (error) {
        res.status(500).json({ state: false, message: error.message });
    }
}

async function getRecursoById(req, res) {
    try {
        const recurso = await Recurso.findOne({ id: req.params.id, isActive: true });
        if (!recurso) {
            return res.status(404).json({ state: false, message: 'Recurso no encontrado' });
        }
        res.status(200).json({ state: true, data: recurso });
    } catch (error) {
        res.status(500).json({ state: false, message: error.message });
    }
}

export { createRecurso, getAllRecursos, getRecursoById };
