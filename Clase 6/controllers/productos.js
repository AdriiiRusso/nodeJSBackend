const { response, request } = require('express');
const fs = require('fs');

const db = './database/productos.json';
const utf = 'utf-8'

const obtenerProductos = async(req = request, res = response) => {
    const productosList  = JSON.parse(fs.readFileSync(db, utf));
    res.render('productoList', {
        productosList
    });
}

const obtenerProductosJSON = async(req = request, res = response) => {
    const productosList  = JSON.parse(fs.readFileSync(db, utf));
    res.json({
        productosList
    });
}

module.exports = {
    obtenerProductos,
    obtenerProductosJSON
}