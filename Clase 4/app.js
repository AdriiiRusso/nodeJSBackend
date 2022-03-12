import ProdRoutes from "./routes/productos.js";
import SubirRoutes from "./routes/archivos.js";
import express  from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup del servidor
class App {
   constructor (PUERTO) {
      this.port = PUERTO;
      this.app = express();
   }
   listen() {
      this.app.listen(this.port);
   }
   start() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use("/api/productos", ProdRoutes);
      this.app.use("/api/subir", SubirRoutes);
      this.app.use("/static", express.static(path.resolve(__dirname, "/public")));
      this.app.use("/uploads", express.static(path.resolve(__dirname, "/uploads")));
     
      console.log('Servidor listo en el puerto:', this.port)

      this.app.get("/", (req, res) => {
         res.sendFile(path.resolve(__dirname, "./public/index.html"));
      });
   }
}

// Export
export default App;