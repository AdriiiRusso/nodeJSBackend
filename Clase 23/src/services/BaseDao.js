import logger from "../utils/loggers/Log4jsLogger.js";
import "../configs/db.config.js";

export class BaseDao {
    constructor() {
        this.logger = logger;
        if (this.constructor === BaseDao) {
            throw new Error('La clase "BaseDao" no pudo ser instanciada')
        }
    }

    create() {
        throw new Error('El método create() debe ser implementado')
    }

    getAll() {
        throw new Error('El método getAll() debe ser implementado')
    }

    deleteById() {
        throw new Error('Método deleteById() debe ser implementado')
    }
}