import mongoose from 'mongoose';

//pasar luego a un archivo .env
const uri = 'mongodb://localhost:27017/parcial1Electiva'; 
//proximamente, conectar con atlas, para eso se debe crear un cluster y obtener la uri de conexión, que se verá algo así:
//const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/apimongo?retryWrites=true&w=majority';

//también se puede dejar el nombre de la db como variable externa
//const dbName = 'apimongo';

async function connectDB() {
	try {
		await mongoose.connect(uri);
		console.log('MongoDB connected');
	} catch (error) {
		console.error('MongoDB connection error:', error);
	}
}

export default connectDB;
