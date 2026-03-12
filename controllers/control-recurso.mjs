import Author from '../models/author.mjs';

// Obtener todos los autores
async function getAll(req, res) {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        //en el fetch podemos validar el status para mostrar un mensaje de error específico
        res.status(500).json({ message: error.message });
    }
}

//método para obtener un autor por id, con sus libros asociados
async function getAuthorById(req, res) {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un autor
async function createAuthor(req, res) {
    try {
        const author = new Author(req.body);
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Actualizar un autor
async function updateAuthor(req, res) {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Eliminar un autor
async function deleteAuthor(req, res) {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json({ message: 'Author deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Funciones para el crud de libros enviando el autor por parametro

async function getAllBooksByAuthor(req, res) {
    try {
        const books = await Book.find({ author: req.params.id }).populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

//



export {
    getAuthorById,
    getAll,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAllBooksByAuthor,
    addBookToAuthor,
    updateBookOfAuthor,
    removeBookFromAuthor
};