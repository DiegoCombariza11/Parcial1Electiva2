import express from 'express';
import { createReserva, getAllReservas } from '../controllers/controll-reserva.mjs';
import { verificarToken } from '../middlewares/auth.mjs';

const router = express.Router();

router.use(verificarToken);

router.get('/', getAllReservas);
router.post('/', createReserva);

export default router;
