const { response, request } = require('express');
const fs = require('fs');
const isAdmin = true;

const db = './src/database/productos.json';
const utf = 'utf-8'

const obtenerProductos = async(req = request, res = response) => {
    const { ...rest } = req.params;
    const productos = JSON.parse(fs.readFileSync(db, utf));
    if (Object.getOwnPropertyNames(rest).length == 1) {
        const producto = productos.find(prod => prod.id == rest['id']);
        res.json({
            producto
        });
    }
    else {
        res.json({
            productos
        });
    }
}

const agregarProducto = async(req = request, res = response) => {
    if(!isAdmin){
        return res.status(401).json('Operación no permitida');
    }
    else{
        const { title, price, thumbnail } = req.body;
        const productos = JSON.parse(fs.readFileSync(db, utf));
        const productoNuevo = {
            id : parseInt(productos[productos.length - 1].id) + 1,
            title,
            price : parseFloat(price),
            thumbnail
        }
        productos.push(productoNuevo);
        try {
            fs.writeFileSync(db, JSON.stringify(productos), utf);
            res.json(`Producto agregado correctamente con el ID ${productoNuevo.id}`);
        } catch (err) {
            res.json('Error al agregar producto: ' + err.message);
        }
    }
}

const modificarProducto = async(req = request, res = response) => {
    if(!isAdmin){
        return res.status(401).json('Operación no permitida');
    }
    else{
        const { ...rest } = req.params;
        const {title, price, thumbnail} = req.body;
        const productos = JSON.parse(fs.readFileSync(db, utf));
        for(let i of productos){
            if (i.id == rest['id']){
                i.title = title;
                i.price = price;
                i.thumbnail = thumbnail;
            }
        }
        try {
            fs.writeFileSync(db, JSON.stringify(productos), utf);
            res.json(`Producto con ID ${rest['id']} modificado correctamente`);
        } catch (err) {
            res.json('Error al modificar producto: ' + err.message);
        }
    }
    
}

const eliminarProducto = async(req = request, res = response) => {
    if(!isAdmin){
        return res.status(401).json('Operación no permitida');
    }
    else{
        const { ...rest } = req.params;
        const productos = JSON.parse(fs.readFileSync(db, utf));
        const producto = productos.find(prod => prod.id == rest['id']);
        if (Object.getOwnPropertyNames(producto).length == 0) {
            res.json(`No encuentra el producto con ID ${rest['id']}`);
        } else {
            const i = productos.indexOf(producto);
            productos.splice(i, 1);
            try {
                fs.writeFileSync(db, JSON.stringify(productos), utf);
                res.json(`Producto con ID ${rest['id']} eliminado correctamente`);
            } catch (err) {
                res.json('Error al eliminar producto: ' + err.message)
            }
        }
    }
}

module.exports = {
    obtenerProductos,
    agregarProducto,
    modificarProducto,
    eliminarProducto
}