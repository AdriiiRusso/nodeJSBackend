import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from '../utils/loggers/Log4jsLogger.js';

dotenv.config();

mongoose.connect(process.env.MONGODB, (err) => {
    err
        ? logger.error("Error al conectarse a MongoDB")
        : logger.info("Conectado a MongoDB")
})

export default mongoose;