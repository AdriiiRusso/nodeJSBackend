import fs from 'fs'; 

// Clase productos
class Productos {
    // Constructor
    constructor (json) {
        this.archivo = json;
    }
    // Guarda un producto
    create(producto, res) {
        let productos = []; 
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if (error) {
                console.log('Error al guardar producto')
                producto.id = 1;
                productos = [];
                productos.push(producto);
                this.save(productos);
                res(producto);
            } else {
                try {
                    productos = JSON.parse(contenido);
                    producto.id = this.readMaxId(productos) + 1;
                    productos.push(producto);
                    this.save(productos);
                    res(producto);
                } catch {}                           
            }
        });
    }
    // Busca un producto por ID
    read(Number, producto) {
        let productos = []; 
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if(error) {
                console.log('Error al buscar producto')
                producto(null);
            } else {
                productos = JSON.parse(contenido);
                const prod = productos.find(prod => prod.id == Number);
                producto(prod);
            }
        });
    }
    // Busca todos los productos
    readAll(all) {
        let productos = []; 
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if(error) {
                console.log('Error al obtener los productos')
                all(null);
            } else {
                productos = JSON.parse(contenido);
                all(productos);
            }
        });
    }
    // Busca el ID máximo de un producto
    readMaxId(productos) {
        let id = 1;
        productos.map(prod => {
            if (prod.id > id) {
                id = prod.id;
            }
        })
        return id;
    }
    // Modifica un producto
    update(producto, res) {
        let productos = []; 
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if (error) {
                res('Error al modificar producto')
                return true;
            } else {      
                productos = JSON.parse(contenido);
                for(let i of productos){
                    if (i.id == producto.id){
                        i.title = producto.title;
                        i.price = producto.price;
                        i.thumbnail = producto.thumbnail;
                    }
                }
                this.save(productos);
                res(producto);                                      
            }
        });
    }
    // Borra un producto por ID
    delete(Number, res) {
        let productos = []; 
        productos = fs.readFile(this.archivo, 'utf-8', (error, contenido)  => {
            if (error) {
                res('Error al borrar producto')
            } else {
                productos = JSON.parse(contenido);
                const prod = productos.find( prod => prod.id == Number);
                try {
                    if (prod.length==0) {
                        res(`No encuentra el producto con ID ${Number}`)
                    } else {
                        const i = productos.indexOf(prod);
                        console.log(`Indice ${i}`)
                        productos.splice(i, 1);
                        this.save(productos)
                        res(`Producto con ID ${Number} eliminado`)
                    }
                } catch {
                    res(`No encuentra el producto con ID ${Number}`)
                }                
            }
        });
    }
    // Guarda un producto en archivo JSON
    save(productos) {
        fs.writeFile(this.archivo, JSON.stringify(productos), error =>{
            if (error) {
                console.log('Error al guardar archivo JSON');
            } else {
                return true;
            }
        })
    }
}

// Export
export default Productos;