const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

const productos = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 1
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 2
  },
  {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    id: 3
  }
];

const PORT = 8080;

const srv = app.listen(PORT, () => {
    console.log(`Servidor en: http://localhost:${PORT}`);
});

srv.on("error", (error) => {
  console.log(`Error en servidor: ${error}`)
});

app.get('/', (req, res) => {
  res.render('cargaProducto', {})
});

app.get('/productos', (req, res) => {
  res.render('vistaProductos', {
      productos
  })
});

app.post('/productos', (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render('vistaProductos', {
    productos
  })
});