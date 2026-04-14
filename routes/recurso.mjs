import express from 'express';
import { createRecurso, getAllRecursos, getRecursoById } from '../controllers/controll-recurso.mjs';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getAllRecursos);
router.get('/:id', getRecursoById);
router.post('/', verifyToken, createRecurso);

export default router;
