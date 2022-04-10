const { response, request } = require('express');
const fs = require('fs');
const { mariaDBConfig } = require('../configs/mariaDB');
const knex = require('knex')(mariaDBConfig);

const mainGet = async(req = request, res = response) => {
    res.render('productoForm');
}

const mainPost = async(req = request, res = response) => {
    const { title, price, thumbnail } = req.body;
    const productoNuevo = {
        title,
        price : parseFloat(price),
        thumbnail
    }
    try {
        await knex.insert(productoNuevo).from("productos");
        return res.render('productoForm');
    } catch (e) {
        console.log(e);
    } 
}

module.exports = {
    mainGet,
    mainPost,
}