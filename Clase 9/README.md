# Clase 9
- Crear base de datos.
```console
use ecommerce;
```

- Crear colecciones.
```console
db.createCollection('productos');
db.createCollection('mensajes');
```

- Insertar productos.
```console
db.productos.insertMany([
    {
        "timestamp": ISODate(),
        "title": "Producto 1",
        "price": 100,
        "description":"Descripción 1",
        "code": "ID-1",
        "image": "url1",
        "stock": 100
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 2",
        "price": 320,
        "description":"Descripción 2",
        "code": "ID-2",
        "image": "url2",
        "stock": 200
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 3",
        "price": 930,
        "description":"Descripción 3",
        "code": "ID-3",
        "image": "url3",
        "stock": 300
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 4",
        "price": 1140,
        "description":"Descripción 4",
        "code": "ID-4",
        "image": "url4",
        "stock": 400
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 5",
        "price": 2250,
        "description":"Descripción 5",
        "code": "ID-5",
        "image": "url5",
        "stock": 500
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 6",
        "price": 3360,
        "description":"Descripción 6",
        "code": "ID-6",
        "image": "url6",
        "stock": 600
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 7",
        "price": 4470,
        "description":"Descripción 7",
        "code": "ID-7",
        "image": "url7",
        "stock": 700
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 8",
        "price": 5000,
        "description":"Descripción 8",
        "code": "ID-8",
        "image": "url8",
        "stock": 800
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 9",
        "price": 3450,
        "description":"Descripción 9",
        "code": "ID-9",
        "image": "url9",
        "stock": 900
    },
    {
        "timestamp": ISODate(),
        "title": "Producto 10",
        "price": 2860,
        "description":"Descripción 10",
        "code": "ID-10",
        "image": "url10",
        "stock": 1000
    }
]);
```

- Insertar mensajes.
```console
db.mensajes.insertMany([{timestamp: ISODate()}, {timestamp: ISODate()}])
```

- Listar todos los productos.
```console
db.productos.find();
```

- Cantidad de documentos en productos.
```console
db.productos.countDocuments();
```

- Agregar producto a productos.
```console
db.productos.insertOne({
        "timestamp": ISODate(),
        "title": "Producto 11",
        "price": 3860,
        "description":"Descripción 11",
        "code": "ID-11",
        "image": "url11",
        "stock": 1100
    });
```

- Título del producto con código ID-11.
```console
db.productos.find({code: "ID-11"}, {title: 1, _id:0});
```

- Listar productos con precio menor a 1000 pesos.
```console
db.productos.find({price: {$lt: 1000}});
```

- Listar los productos con precio entre los 1000 a 3000 pesos.
```console
db.productos(find {price: {$gt: 1000, $lt: 3000});
```

- Listar los productos con precio mayor a 3000 pesos.
```console
db.productos.find({price: {$gt: 3000}});
```

- Consulta que traiga sólo el nombre del tercer producto más barato.
```console
db.productos.find({},{title:1, _id:0}).sort({price:1}).skip(2).limit(1);
```

- Actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
```console
db.productos.updateMany({}, {$inc: {stock: 100}});
```

- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
```console
db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}});
```

- Borrar los productos con precio menor a 1000 pesos.
```console
db.productos.deleteMany({price: {$lt: 1000}});
```

- Creación del usuario "pepe", con contraseña "asd456" teniendo permiso solo de lectura.
```console
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]});
```

- Login del usuario pepe.
```console
mongo -u pepe -p --authenticationDatabase ecommerce 
```

- Vista de las DB a las que tiene acceso.
```console
> show dbs
ecommerce  0.000GB
```

- Intento de agregar un producto a la colección producto en la db ecommerce.
```console
> use ecommerce
switched to db ecommerce
> db.productos.insertOne({nombre: "alguno"})
uncaught exception: WriteCommandError({
	"ok" : 0,
	"errmsg" : "not authorized on ecommerce to execute command { insert: \"productos\", ordered: true, lsid: { id: UUID(\"0472ecf7-1bf2-47c1-8616-00278992617c\") }, $db: \"ecommerce\" }",
	"code" : 13,
	"codeName" : "Unauthorized"
})
```

- Configuración para que funcione la autenticación en mongod.conf.
```console
security:
  authorization: "enabled"
```