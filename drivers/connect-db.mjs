import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado:', process.env.MONGODB_URI);
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;
