import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './drivers/connect-db.mjs';
import recursoRoutes from './routes/recurso.mjs';
import reservaRoutes from './routes/reserva.mjs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3400;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Rutas API
app.use('/api/recursos', recursoRoutes);
app.use('/api/reservas', reservaRoutes);

// Ruta principal - vista
app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Reservas - UPTC Sogamoso' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
