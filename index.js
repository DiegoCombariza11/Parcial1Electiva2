import express from 'express';
import routesAuthor from './routes/author.js';
import routesBook from './routes/book.js';
import connectDB from './drivers/connect-db.mjs';

const app = express();


// Conectar a MongoDB
connectDB();

const PORT = 3400;

// Middleware para parsear JSON
app.use(express.json());


//para manejar una única ruta

app.use('/author', routesAuthor);
app.use('/book', routesBook);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});