import express from 'express';
import { createReserva, getAllReservas } from '../controllers/controll-reserva.mjs';

const router = express.Router();

router.get('/', getAllReservas);
router.post('/', createReserva);

export default router;
