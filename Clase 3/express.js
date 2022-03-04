const express = require('express');
const Container = require('./container.js');

// Inicialización de express
const app = express()

// Configuración de express
const sv = app.listen(8080, () => {
   console.log(`Servidor HTTP en el puerto: ${sv.address().port}`)
})

// Configuración en caso de error en el server
sv.on("error", error => console.log(`Error: ${error}`))

// Obtiene un número aleatorio entre un mínimo y máximo pasados
function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max + 1 - min));
}

// Contenedor del producto
function contenedorProd(nombre, price, thumbnail) {
    let html = `<center>
                    <h1>Producto "${nombre}"</h1>
                    <br>
                    <img style="width: 150px; height: 150px" src="${thumbnail}" alt="${nombre}"</td>
                    <h4>Precio: $ ${price}</h4>
                    <br/>
                    <input type="button" onclick="location.href='/';" value="Inicio"/>
                    <br/><br/>
                    <input type="button" onclick="location.href='/productos';" value="Ver todos los productos"/>
                    <br/><br/>
                    <input type="button" onclick="location.href='/productoRandom';" value="Ver otro producto aleatorio"/>
                </center>`
    return html
}

// Endpoint inicial
app.get('/', (req, res) => {
    res.send(`
        <center>
            <h1>APP de productos</h1>
            <h3>Ver todos los productos</h3>
            <input type="button" onclick="location.href='/productos';" value="Ir"/>
            <h3>Ver un producto aleatorio</h3>
            <input type="button" onclick="location.href='/productoRandom';" value="Ir"/>
        </center>`);  
})

// Endpoint todos los productos
app.get('/productos', async (req, res) => {
    const productos = new Container('products.json');
    const items = await productos.getAll();
    let html = `<center>
                    <h1>Todos los productos</h1>
                    <br>
                    <table style="border: 1px solid black">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                        </tr>`
    for (let p of items){
        html += `<tr>
                    <td>${p.title}</td>  
                    <td>$ ${p.price}</td>  
                    <td><img style="width: 50px" src="${p.thumbnail}" alt="${p.title}"</td>  
                </tr>`
    }
    html += `   </table>
                <br/>
                <input type="button" onclick="location.href='/';" value="Inicio"/>
                <br/><br/>
                <input type="button" onclick="location.href='/productoRandom';" value="Ver un producto aleatorio"/>
            </center>`
            res.send(html)
})

// Endpoint producto aleatorio
app.get('/productoRandom', async (req, res) => {
    const productos = new Container(`products.json`);
    const items = await productos.getAll();   
    const id = obtenerNumeroAleatorio(1, items.length)
    const prod = items[id];
    res.send(contenedorProd(prod.title, prod.price, prod.thumbnail)); 
})