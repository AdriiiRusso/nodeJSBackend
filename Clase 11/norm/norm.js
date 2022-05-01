import { normalize, schema, denormalize } from "normalizr";
import fs from 'fs';
import util from 'util';

// Apertura de data
const originalData = JSON.parse(fs.readFileSync('holding.json', 'utf-8', 'r'));

// Esquemas
const persona = new schema.Entity('personas');

const gerente = new schema.Entity('gerentes', {
    gerente: persona
})

const encargado = new schema.Entity('encargados', {
    encargado: persona
})

const empleado = new schema.Entity('empleados', {
    empleados: [persona]
})

const empresa = new schema.Entity('empresas', {
    gerente: gerente,
    encargado: encargado,
    empleados: [empleado]
})

const empresasSchema = new schema.Entity('empresasSchema', {
    empresas: [empresa]
})

// Imprimir data
function print(data) {
    console.log(util.inspect(data, false, 12, true));
  }

// Datos normalizados
const dataNormalizada = normalize(originalData, empresasSchema);
//print(dataNormalizada);

// Data original
const dataDesnormalizada = denormalize(dataNormalizada.result, empresasSchema, dataNormalizada.entities);
//print(dataDesnormalizada)

// Cálculo de compresión
const largoOriginal = JSON.stringify(originalData).length
const largoNormalizado = JSON.stringify(dataNormalizada).length
const porcentajeComprimido = 100 - (largoNormalizado / largoOriginal) * 100;

console.log(`La información se comprimió en: ${porcentajeComprimido}%`);