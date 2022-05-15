import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGODB, (err) => {
    err
        ? console.log("Error al conectarse a MongoDB")
        : console.log("Conectado a MongoDB")
})

export default mongoose;