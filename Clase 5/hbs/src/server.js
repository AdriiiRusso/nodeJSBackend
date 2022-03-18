const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname+"/views/layouts",
        partialsDir: __dirname+"/views/partials"
    }),
);

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

app.get("/", (req, res) => {
  res.render("main", {
      productos, cargar: true
  })
});

app.get("/productos", (req, res) => {
  res.render("main", {
      productos, cargar: false
  })
});

app.post('/productos', (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render("main", {
    productos, cargar: false
  })
});