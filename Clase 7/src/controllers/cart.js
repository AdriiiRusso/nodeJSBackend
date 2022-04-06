const { response, request } = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const dbProductos = './src/database/productos.json';
const dbCarritos = './src/database/carritos.json';

const utf = 'utf-8'

const cartGet = async(req = request, res = response) => {
    const carritos = JSON.parse(fs.readFileSync(dbCarritos, utf));
    const carrito = carritos.find(carrito => carrito.id == "5ca44937-79b0-401b-bf00-9a7543c19693");
    let total = 0;
    const productos = carrito.productos;
    productos.forEach(function(a){total += a.price * a.amount;});
    res.render('carrito', {
        carrito,
        total
    });
}

const crearCarrito = async(req = request, res = response) => {
    const { productos } = req.body;
    const carritos = JSON.parse(fs.readFileSync(dbCarritos, utf));
    const nuevoCarrito = {
        id: uuidv4(),
        timestamp: Date.now(),
        productos: []
    }
    carritos.push(nuevoCarrito);
    try {
        fs.writeFileSync(dbCarritos, JSON.stringify(carritos), utf);
        res.json(`Carrito agregado correctamente con el ID ${nuevoCarrito.id}`);
    } catch (err) {
        res.status(500).json('Error al agregar carrito: ' + err.message);
    }
}

const eliminarCarrito = async(req = request, res = response) => {
    const { ...rest } = req.params;
    const carritos = JSON.parse(fs.readFileSync(dbCarritos, utf));
    const carrito = carritos.find(prod => prod.id == rest['id']);

    if (Object.getOwnPropertyNames(carrito).length == 0) {
        res.status(404).json(`No encuentra el carrito con ID ${rest['id']}`);
    } else {
        const i = carritos.indexOf(carrito);
        carritos.splice(i, 1);
        try {
            fs.writeFileSync(dbCarritos, JSON.stringify(carritos), utf);
            res.json(`Carrito con ID ${rest['id']} eliminado correctamente`);
        } catch (err) {
            res.status(500).json('Error al eliminar carrito: ' + err.message)
        }
    }
}

const obtenerCarrito = async(req = request, res = response) => {
    const { ...rest } = req.params;
    const carritos = JSON.parse(fs.readFileSync(dbCarritos, utf));
    const carrito = carritos.find(prod => prod.id == rest['id']);

    if (Object.getOwnPropertyNames(carrito).length == 0) {
        res.json(`No encuentra el carrito con ID ${rest['id']}`);
    } else {
        try {
            res.json(carrito['productos']);
        } catch (err) {
            res.status(500).json('Error al obtener carrito: ' + err.message)
        }
    }
}

const agregarProductoCarrito = async(req = request, res = response) => {
    const { ...rest } = req.params;
    const { id, amount } = req.body;
    const carritos = JSON.parse(fs.readFileSync(dbCarritos, utf));
    const carrito = carritos.find(prod => prod.id == rest['id']);

    const productos = JSON.parse(fs.readFileSync(dbProductos, utf));
    const producto = productos.filter(producto => producto.id == id)[0];
    if(producto == undefined){
        return res.status(404).json(`No existe producto con ID ${id}`);
    }
    else{
        for(productoCargado of carrito.productos){
            if(productoCargado.id == producto.id){
                return res.status(403).json(`El producto con ID ${id}, ya se encuentra en el carrito`);
            }
        }
        producto['amount'] = amount;
        carrito.productos.push(producto);
    }
    const carritosNuevo = carritos.filter(carrito => carrito.id != rest['id']);
    carritosNuevo.push(carrito);
    try {
        fs.writeFileSync(dbCarritos, JSON.stringify(carritosNuevo), utf);
        res.json(`El producto con ID ${id}, agregado correctamente al carrito con ID ${rest['id']}`);
    } catch (err) {
        res.status(500).json('Error al agregar producto al carrito: ' + err.message)
    }
}

const eliminarProductoCarrito = async(req = request, res = response) => {
    const { ...rest } = req.params;
    const carritos = JSON.parse(fs.readFileSync(dbCarritos, utf));
    const eliminarCarrito = carritos.filter(carrito => carrito.id == rest['id'])[0];
    if(eliminarCarrito == undefined){
        return res.status(404).json(`No existe carrito con ID ${rest['id']}`);
    }
    else{
        let productosCarrito = eliminarCarrito.productos;
        if(productosCarrito.find(producto => producto.id == rest['id_prod']) == undefined){
            return res.status(404).json(`No existe el producto con ID ${rest['id_prod']} en el carrito con ID ${rest['id']}`);
        }
        else{
            productosCarrito = productosCarrito.filter(producto => producto.id != rest['id_prod']);
            eliminarCarrito.productos = productosCarrito;
            const carritosActualizados = carritos.filter(carrito => carrito.id != rest['id']);
            carritosActualizados.push(eliminarCarrito);
            try {
                fs.writeFileSync(dbCarritos, JSON.stringify(carritosActualizados), utf);
                res.json(`El producto con ID ${rest['id_prod']}, se ha eliminado correctamente del carrito con ID ${rest['id']}`);
            } catch (err) {
                res.status(500).json('Error al eliminar producto del carrito: ' + err.message)
            }
        }
    }
}

module.exports = {
    cartGet,
    obtenerCarrito,
    crearCarrito,
    eliminarCarrito,
    agregarProductoCarrito,
    eliminarProductoCarrito
}