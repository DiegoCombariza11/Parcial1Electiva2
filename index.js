// Acá arrancamos el servidor. Configuramos Express, conectamos la base de datos,
// le decimos que use EJS para mostrar la página web y registramos las rutas de la API.

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

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use('/api/recursos', recursoRoutes);
app.use('/api/reservas', reservaRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Sistema de Reservas - UPTC Sogamoso' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
