import express  from 'express';
import Productos from '../products.js';

// Iniciación de router
const routerProducts = express.Router();

// Endpoint GET: Ver todos los productos
routerProducts.get("/", (req, res) => {
    const prod = new Productos(`products.json`);
    prod.readAll((p) => {
        res.status(200).send(p);
    });
});

// Endpoint GET: Buscar producto por ID
routerProducts.get("/:id", (req, res) => {
    const { ...rest } = req.params;
    const prod = new Productos(`products.json`);
    const id = Number(rest.id);
    prod.read(id, (p) => {
        if(p == undefined){
            res.status(400).json({error: 'Producto no encontrado'})
        } else {
            res.status(200).send(p);
        }
    });       
});

// Endpoint POST: Nuevo producto
routerProducts.post("/", (req, res) => {
    try {
        const prod = new Productos(`products.json`);
        const { title, price, thumbnail } = req.body;
        const productoNuevo = {
            title,
            price,
            thumbnail
        }
        prod.create(productoNuevo, prod => {
            res.status(200).send(prod);
        });
    } catch (err) {
        res.status(400).json({error: err});
    }
});

// Endpoint PUT: Modificar producto por ID
routerProducts.put("/:id", (req, res) => {
    try {
        const prod = new Productos(`products.json`);
        const productoNuevo = req.body;
        const id = parseInt(req.params.id)
        prod.update(productoNuevo, id, prod => {
            res.status(200).send(productoNuevo);
        });
    } catch (err) {
        res.status(400).json({error: err});
    } 
});

// Endpoint DELETE: Eliminar producto por ID
routerProducts.delete("/:id", (req, res) => {
    try {
        const { ...rest } = req.params;
        const prod = new Productos(`products.json`);
        const id = Number(rest.id);
        prod.delete(id, prod => {
            res.status(200).send(prod);
        });
    } catch (err) {
        res.status(400).json({error: err});
    }
});

// Export
export default routerProducts;