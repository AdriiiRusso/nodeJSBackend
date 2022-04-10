const { SQLLiteconfig } = require('../configs/SQLLite');

const initialize = async() => {
    const knex = require('knex')(SQLLiteconfig);

    if(!await knex.schema.hasTable('mensajes')){
        knex.schema.createTable('mensajes', table => {
            table.string('sender');
            table.string('message');
            table.string('timestamp');
        })
        .then(() => { console.log("Tabla de mensajes no existente, creada") })
        .catch((err) => { console.log("Error:" + err); throw err })
        .finally(() => { knex.destroy()});
    };   
}

module.exports = ({
    initialize
}) 