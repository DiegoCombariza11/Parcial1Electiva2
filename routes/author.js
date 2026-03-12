import express from 'express';
import { getAll, createAuthor, updateAuthor, deleteAuthor } from '../controllers/controll-author.mjs';

const router = express.Router();

router.get('/', getAll);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
