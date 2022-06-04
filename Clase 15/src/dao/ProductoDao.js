import "../config/db.js";
import { ProductosModel } from "../modules/productos.modules.js";

export class ProductoDao {
    _ID = "_id";
    
    static async exists(id) {
        try {
            return await ProductosModel.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            return await ProductosModel.find();
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async getProductById(objectId) {
        try {
            const product = await ProductosModel.findOne({
                [this._ID] : objectId
            })
            console.log(product);
            return product;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async createProduct(object) {
        try {
            return await ProductosModel.create(object)
        } catch (error) {
            console.log(error);
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
            console.log(error);
            return false;
        }
    }
    
    async deleteProductById(id) {
        try {
            return await ProductosModel.findByIdAndDelete({[this._ID]: id})
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}