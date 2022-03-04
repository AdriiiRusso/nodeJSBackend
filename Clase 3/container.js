// Modulo fs de nodejs para manejo de archivos
const fs = require("fs");

// Clase container
class Container {
  // Constructor
  constructor(filename) {
    this.filename = filename;
    this.data = [];   
  }
  // Obtiene el id máximo de un objeto
  getMaxId() {
    var maximo = Number.MIN_VALUE;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id > maximo) {
        maximo = this.data[i].id;
      }
    }
    return maximo;
  }
  // Crea un archivo y añade un objeto
  async createFile(obj) {
    try {
      obj.id = this.getMaxId() + 1;
      this.data.push(obj);
      await fs.promises.writeFile(this.filename, JSON.stringify(this.data));
      console.log(
        `Se agrega objeto '${obj.title}' en el archivo '${this.filename}', id creado: '${obj.id}'`
      );
      return obj.id;
    } catch (e) {
      console.log(`Error al crear el archivo '${this.filename}': ${e}`);
    }
  }
  // Guarda un objeto pasado y obtiene el id asignado.
  async save(Object) {
    try {
      if (!fs.existsSync(this.filename)) {
        //Si el archivo no existe, o bien no tiene info, lo creo.
        return this.createFile(Object);
      } else {
        this.data = await this.getAll();
        return this.createFile(Object);
      }
    } catch (e) {
      console.log(
        `Error al agregar '${Object.title}' en el archivo '${this.filename}': '${e}'`
      );
    }
  }
  // Obtiene objeto por id en un archivo
  async getById(id) {
    try {
      let aux = await this.getAll();
      return aux.find((obj) => obj.id == id) || null;
    } catch (e) {
      console.log(
        `Error al obtener elemento con id '${id}' en el archivo '${this.filename}': ${e}`
      );
    }
  }
  // Obtiene array con todos los objetos de un archivo
  async getAll() {
    try {     
        let buffer = await fs.promises.readFile(this.filename, 'utf-8')
        return JSON.parse(buffer);
    }
      catch (e) { 
        console.log(`Error al obtener todos los objetos del archivo '${this.filename}': '${e}'`);
        return null;     
    }      
  }
  // Elimina objeto en archivo con un id determinado
  async deleteById(id) {
    let aux = await this.getAll();
    let a = aux.findIndex((obj) => obj.id == id);
    aux.splice(a, 1);
    await fs.promises.writeFile(this.filename, JSON.stringify(aux));
    console.log(
      `Se eliminó el objeto con id '${id}' del archivo '${this.filename}'`
    );
  }
  // Elimina un archivo
  async deleteAll() {
    fs.unlink(this.filename, (e) => {
      if (e) {
        console.log(
          `Error al eliminar el archivo '${this.filename}': ${e}`
        );
      } else {
        console.log(`Se eliminó el archivo '${this.filename}'`);
      }
    });
  }
  // Obtiene el contenido de un archivo
  async readFile() {
    try {
      return await fs.promises.readFile(this.filename, "utf-8");
    } catch (e) {
      console.log(`Error al leer el archivo '${this.filename}': '${e}'`);
    }
  }
}

// Estético
function separador() {
  console.log("<------------------------------------------------------->");
}

// Estético promise
function separadorPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log("<------------------------------------------------------->"));
    }, 500);
  });
}

// Función de prueba de clase
async function prueba (){
  // Creación de objetos
  const objRule = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  };
  const objCalculator = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  };
  const objEarth = {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  };

  // Instancia de container
  const container = new Container("products.json");

  // Todos los objetos en el archivo
  console.log("Todos los objetos en el archivo:");
  var a = await container.getAll();
  console.log(a);
  console.log("\n")

  // Instanciado de algunos objetos
  console.log("Guardado de objetos en archivo:");
  await container.save(objRule)
  await container.save(objCalculator)
  await container.save(objEarth)
  console.log("\n")

  // Todos los objetos luego de los agregados
  console.log("Todos los objetos luego de los agregados:");
  var a = await container.getAll();
  console.log(a);
  console.log("\n")

  // Busqueda específica de objeto por id en el archivo
  console.log("Id 2 en archivo:");
  a = await container.getById(2);
  console.log(`Producto --> "${JSON.stringify(a)}"`);
  console.log("\n")

  // Eliminación específica de objeto por id en el archivo
  console.log("Eliminación del id 2 en el archivo:");
  await container.deleteById(2);
  console.log("\n")

  // Búsqueda de objeto 2 por id en el archivo
  console.log("Id 2 en archivo:");
  a = await container.getById(2);
  console.log(`Producto --> "${JSON.stringify(a)}"`);
  console.log("\n")

  // Todos los objetos luego de la eliminación del id 2
  console.log("Todos los objetos luego de la eliminación del id 2:");
  var a = await container.getAll();
  console.log(a);
  console.log("\n")

  // Eliminación de archivo
  console.log("Eliminación del archivo:");
  await container.deleteAll();
}

// Uso de método prueba con todas las instancias y estética
// separador()
// prueba()
// separadorPromise()

module.exports = Container;