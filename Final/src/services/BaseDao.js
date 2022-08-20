import logger from "../utils/loggers/Log4jsLogger.js";
import "../configs/db.config.js";

/** @Abstract */
export class BaseDao {
    constructor() {
        this.logger = logger;
        if (this.constructor === BaseDao) {
            throw new Error('Class "BaseDao" no puede ser inicializada')
        }
    }

    create() {
        throw new Error('Método create() debe ser implementada')
    }

    getAll() {
        throw new Error('Método getAll() debe ser implementada')
    }

    deleteById() {
        throw new Error('Método deleteById() debe ser implementada')
    }
}