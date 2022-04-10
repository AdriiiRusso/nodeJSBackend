const { mariaDBConfig } = require('../configs/mariaDB');

const initialize = async() => {
    const knex = require('knex')(mariaDBConfig);

    if(!await knex.schema.hasTable('productos')){
        knex.schema.createTable('productos', table => {
            table.integer('id');
            table.string('title');
            table.string('price');
            table.string('thumbnail');
        })
        .then(() => { console.log("Tabla de productos no existente, creada") })
        .catch((err) => { console.log("Error:" + err); throw err })
        .finally(() => { knex.destroy()});
    };   
}

module.exports = ({
    initialize
}) 