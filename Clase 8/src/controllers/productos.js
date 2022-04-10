const { response, request } = require('express');
const fs = require('fs');
const { mariaDBConfig } = require('../configs/mariaDB');
const knex = require('knex')(mariaDBConfig);

const obtenerProductos = async(req = request, res = response) => {
    const productosList = await knex.select().from("productos");
    res.render('productoList', {
        productosList
    });
}

const obtenerProductosJSON = async(req = request, res = response) => {
    const productosList = await knex.select().from("productos");
    res.json({
        productosList
    });
}

module.exports = {
    obtenerProductos,
    obtenerProductosJSON
}