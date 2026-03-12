import mongoose from 'mongoose';

// un autor también tiene libros
const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		//acá se pueden usar regex 
		required: true
	},
	bio: String,
	birthdate: Date,
	books: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Book'
	}]
});

const Author = mongoose.model('Author', authorSchema);

export default Author;

//JSON para insertar un autor sin libros asociados
/*
{
	"name": "Gabriel García Márquez",
	"bio": "Gabriel García Márquez was a Colombian novelist, short-story writer, and journalist.",
	"birthdate": "1928-03-06"
}
*/