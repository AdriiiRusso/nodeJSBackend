const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const fs = require("fs");
let mensajes = [];
const mensajes_json = './src/database/mensajes.json';
const utf = 'utf-8';

// Setup del servidor
const app = express();
const server = http.createServer(app);
const port = 8080;
const io = new Server(server);
server.listen(port, () => {
    console.log(`Servidor en: http://localhost:${port}`);
});

// Socket
io.on("connection", socket => {
    const messages = JSON.parse(fs.readFileSync(mensajes_json, utf));
    mensajes = messages;
    socket.emit("initial", messages);
    socket.on("sendMessage", (data) => {
        data.timestamp = (new Date).toLocaleString();
        mensajes.push(data);
        io.sockets.emit("enviarMensaje", mensajes);
        fs.writeFileSync(mensajes_json, JSON.stringify(mensajes), utf);
    });
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static( __dirname + '/public'));

// Routes
app.use('/' , require('./src/routes/main'));
app.use('/api' , require('./src/routes/api'));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars' );
app.set('views', './src/views' );