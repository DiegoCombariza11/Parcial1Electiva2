import Reserva from '../models/Reserva.mjs';
import Recurso from '../models/recurso.mjs';

async function createReserva(req, res) {
    try {
        const { recurso, solicitante, fecha, horaInicio, horaFin } = req.body;

        const recursoExiste = await Recurso.findById(recurso);
        if (!recursoExiste || !recursoExiste.isActive) {
            return res.status(404).json({ state: false, message: 'El recurso no existe o está inactivo' });
        }

        if (horaFin <= horaInicio) {
            return res.status(400).json({ state: false, message: 'La hora de fin debe ser posterior a la hora de inicio' });
        }

        const fechaDate = new Date(fecha);
        const reservasExistentes = await Reserva.find({
            recurso,
            fecha: {
                $gte: new Date(fechaDate.toISOString().split('T')[0]),
                $lt: new Date(new Date(fechaDate.getTime() + 86400000).toISOString().split('T')[0])
            }
        });

        const hayConflicto = reservasExistentes.some(r => {
            return horaInicio < r.horaFin && horaFin > r.horaInicio;
        });

        if (hayConflicto) {
            return res.status(409).json({
                state: false,
                message: `El recurso "${recursoExiste.nombre}" no está disponible en ese horario para la fecha seleccionada`
            });
        }

        const reserva = new Reserva({ recurso, solicitante, fecha, horaInicio, horaFin });
        await reserva.save();
        await reserva.populate('recurso');

        res.status(201).json({ state: true, message: 'Reserva creada exitosamente', data: reserva });
    } catch (error) {
        res.status(400).json({ state: false, message: error.message });
    }
}

async function getAllReservas(req, res) {
    try {
        const reservas = await Reserva.find().populate('recurso').sort({ fecha: 1 });
        res.status(200).json({ state: true, data: reservas, total: reservas.length });
    } catch (error) {
        res.status(500).json({ state: false, message: error.message });
    }
}

export { createReserva, getAllReservas };
