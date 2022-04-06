const { Router } = require('express');
const router = Router();
const { obtenerProductos, agregarProducto, modificarProducto, eliminarProducto } = require('../controllers/api');
const { crearCarrito, eliminarCarrito, obtenerCarrito, agregarProductoCarrito, eliminarProductoCarrito } = require('../controllers/cart');

// Obtener productos
router.get('/productos', obtenerProductos);
// Obtener producto
router.get('/productos/:id', obtenerProductos);
// Agregar producto
router.post('/productos', agregarProducto);
// Modificar producto
router.put('/productos/:id', modificarProducto);
// Eliminar producto
router.delete('/productos/:id', eliminarProducto);
// Obtener carrito
router.get('/carritos/:id/productos', obtenerCarrito);
// Crear carrito
router.post('/carritos', crearCarrito);
// Eliminar carrito
router.delete('/carritos/:id', eliminarCarrito);
// Agregar producto al carrito
router.post('/carritos/:id/productos', agregarProductoCarrito);
// Agregar producto al carrito
router.delete('/carritos/:id/producto/:id_prod', eliminarProductoCarrito);

module.exports = router;