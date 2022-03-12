import express  from 'express';
import upload from "../middlewares/multer.js";

// Iniciación de router
const routerArchivos = express.Router();

// Endpoint POST: Subir un archivo
routerArchivos.post("/", upload.single("archivo"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Archivo no encontrado");
      return next(error);
    }
    res.status(200).send(file);
});

// Export
export default routerArchivos;