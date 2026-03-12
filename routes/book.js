import express from 'express';
import { getAllBooks, addBookToAuthor, updateBookOfAuthor, removeBookFromAuthor, createBook} from '../controllers/controll-book.mjs';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.post('/:id', addBookToAuthor);
router.put('/:bookId', updateBookOfAuthor);
router.delete('/:bookId', removeBookFromAuthor);




export default router;
