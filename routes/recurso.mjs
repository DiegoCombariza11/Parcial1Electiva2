import express from 'express';
import { createRecurso, getAllRecursos, getRecursoById } from '../controllers/controll-recurso.mjs';
import { verificarToken } from '../middlewares/auth.mjs';

const router = express.Router();

router.use(verificarToken);

router.get('/', getAllRecursos);
router.get('/:id', getRecursoById);
router.post('/', createRecurso);

export default router;
