import Author from '../models/author.mjs';
import Book from '../models/book.mjs';

// Funciones para el crud de libros

async function getAllBooks(req, res) {
    try {
        const books = await Book.find().populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Crear libros sin autoresociado
async function createBook(req, res) {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Añadir libro a un autor
async function addBookToAuthor(req, res) {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        const book = new Book(req.body);
        await book.save();
        author.books.push(book._id);
        await author.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Editar un libro de un autor
async function updateBookOfAuthor(req, res) {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Eliminar libro de un autor
async function removeBookFromAuthor(req, res) {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        const bookId = req.params.bookId;   
        await Book.findByIdAndDelete(bookId);
        author.books.pull(bookId);
        await author.save();
        res.status(200).json({ message: 'Book removed from author' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export {
    getAllBooks,
    createBook,
    addBookToAuthor,
    updateBookOfAuthor,
    removeBookFromAuthor
};

