const { Router } = require('express');
const router = Router();
const { mainGet, mainPost } = require('../controllers/main.js');

// Todos los productos
router.get( '/', mainGet );
// Guarda el producto
router.post( '/', mainPost );

module.exports = router;