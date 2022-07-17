import logger from "../utils/loggers/Log4jsLogger.js";
import "../configs/db.config.js";

export class BaseDao {
    constructor() {
        this.logger = logger;
        if (this.constructor === BaseDao) {
            throw new Error('Class "BaseDao" no se puede instanciar')
        }
    }

    create() {
        throw new Error('Method create() debe ser implementado')
    }

    getAll() {
        throw new Error('Method getAll() debe ser implementado')
    }

    deleteById() {
        throw new Error('Method deleteById() debe ser implementado')
    }
}