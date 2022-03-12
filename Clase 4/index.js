import App from './app.js';

// Configuración de puerto de escucha
const PUERTO = 8080;

// Instancia del servidor
(async () => {
  try {
    const server = new App(PUERTO)
    await server.listen()
    await server.start()
  } catch (error) {
    console.log(`error ${error}`)
  }
})()