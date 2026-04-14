import express from 'express';
import { createReserva, getAllReservas } from '../controllers/controll-reserva.mjs';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getAllReservas);
router.post('/', verifyToken, createReserva);

export default router;
