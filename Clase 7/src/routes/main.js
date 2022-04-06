const { Router } = require('express');
const router = Router();
const { productsGet, addProductsGet, mainGet, chatGet} = require('../controllers/main.js');
const { agregarProducto } = require('../controllers/api.js');
const { cartGet } = require('../controllers/cart.js');

// Productos populares
router.get('/', mainGet);
// Todos los productos
router.get('/products', productsGet);
// Agregar producto
router.get('/addProducts', addProductsGet);
// Chat
router.get('/chat', chatGet);
// Guardar el producto
router.post('/addProducts', agregarProducto);
// Carrito de compras
router.get('/cart', cartGet);

module.exports = router;