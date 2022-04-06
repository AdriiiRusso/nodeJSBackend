const { response, request } = require('express');
const fs = require('fs');
const db = './src/database/productos.json';
const utf = 'utf-8'

const mainGet = async(req = request, res = response) => {
    const productos = JSON.parse(fs.readFileSync(db, utf));
    res.render('main', {
        productos
    });
}

const productsGet = async(req = request, res = response) => {
    const productos = JSON.parse(fs.readFileSync(db, utf));
    res.render('productos', {
        productos
    });
}

const addProductsGet = async(req = request, res = response) => {
    res.render('addProducto');
}

const chatGet = async(req = request, res = response) => {
    res.render('chat');
}

module.exports = {
    productsGet,
    addProductsGet,
    mainGet,
    chatGet
}