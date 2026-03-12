import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publishedDate: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    pages: Number
});


const Book = mongoose.model('Book', bookSchema);
export default Book;

//JSON para insertar un libro asociado a un autor (el id del autor se pasa en el campo author)
/*
{
    "title": "One Hundred Years of Solitude",
    "publishedDate": "1967-05-30",
    "pages": 417
}
*/