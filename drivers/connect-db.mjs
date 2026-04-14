
import mongoose from "mongoose";

const connectMongo = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("La variable MONGO_URI no esta definida en el archivo .env");
  }

  await mongoose.connect(uri);
  console.log("MongoDB conectado correctamente");
};

export default connectMongo;
