import "../config/db.js";
import { ProductosModel } from "../modules/productos.modules.js";
import logger from "../loggers/Log4jsLogger.js";

export class ProductoDao {
    _ID = "_id";
    
    static async exists(id) {
        try {
            return await ProductosModel.findById(id);
        } catch (error) {
            logger.error(error);
        }
    }

    async getAll() {
        try {
            return await ProductosModel.find();
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    
    async getProductById(objectId) {
        try {
            const product = await ProductosModel.findOne({
                [this._ID] : objectId
            })
            logger.error(product);
            return product;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    
    async createProduct(object) {
        try {
            return await ProductosModel.create(object)
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    
    async updateProductById(id, object) {
        try {
            await ProductosModel.findByIdAndUpdate(
                {
                    [this._ID] : id
                },
                object, 
                {
                    runValidators: true
                })
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
    
    async deleteProductById(id) {
        try {
            return await ProductosModel.findByIdAndDelete({[this._ID]: id})
        } catch (error) {
            logger.error(error);
            return false;
        }
    }
}