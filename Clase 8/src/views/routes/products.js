const { Router } = require('express');
const router = Router();
const { obtenerProductos, obtenerProductosJSON } = require('../../controllers/productos');

// Todos los productos
router.get( '/', obtenerProductos );
// JSON de todos los productos
router.get( '/json', obtenerProductosJSON );

module.exports = router;