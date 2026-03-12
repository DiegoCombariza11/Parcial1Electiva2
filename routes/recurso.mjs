import express from 'express';
import { createRecurso, getAllRecursos, getRecursoById } from '../controllers/controll-recurso.mjs';

const router = express.Router();

router.get('/', getAllRecursos);
router.get('/:id', getRecursoById);
router.post('/', createRecurso);

export default router;
