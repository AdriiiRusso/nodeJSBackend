const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const fs = require("fs");
let mensajes = [];
const mensajes_json = './src/database/mensajes.json';
const utf = 'utf-8';
const mariaDB = require('./src/db/mariaDB');
const SQLLite = require('./src/db/SQLLite');
const db = require('better-sqlite3')('./src/db/ecommerce.sqlite');

mariaDB.initialize();
SQLLite.initialize();

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
    const messages = db.prepare('SELECT * FROM mensajes').all();
    mensajes = messages;
    socket.emit("initial", messages);
    socket.on("sendMessage", (data) => {
        data.timestamp = (new Date).toLocaleString();
        mensajes.push(data);
        io.sockets.emit("enviarMensaje", mensajes);
        const insert = db.prepare(`INSERT INTO mensajes (sender, message, timestamp) VALUES ('${data.sender}', '${data.message}', '${data.timestamp}')`);
        insert.run();
    });
})

// Middlewares
app.use( express.json() );
app.use( express.urlencoded({extended: false}) );
app.use( express.static( __dirname + '/public') );

// Routes
app.use('/' , require('./src/views/routes/main'));
app.use('/products' , require('./src/views/routes/products'));

// Handlebars
app.engine( 'handlebars', engine() );
app.set('view engine', 'handlebars' );
app.set('views', './src/views' );