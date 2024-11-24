const mongoose = require('mongoose');
const {Schema} = mongoose;

const regionSchema = new mongoose.Schema({
    nombre: String
});
const ciudadSchema = new mongoose.Schema({
    nombre: String,
    region: regionSchema
});
const comunaSchema = new mongoose.Schema({
    nombre: String,
    ciudad: ciudadSchema
});

const sedeSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    comuna: comunaSchema
});

const carreraSchema = new mongoose.Schema({
    nombre: String,
    escuela: String,
    sede: sedeSchema
});

// A quien se le presta
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },  // Asegúrate de que el nombre sea obligatorio
    rut: { type: String, required: true },     // El rut también es obligatorio
    email: { type: String, required: true },   // Asegúrate de que el email sea obligatorio
    telefono: { type: String, required: true }, // El teléfono también debería ser obligatorio
});

const estudianteSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },  // Referencia a Usuario
    carrera: { type: Object, required: true },  // Carrera del estudiante
});
const docenteSchema = new mongoose.Schema({
    ramo: String,
    escuela: String,
    usuario: usuarioSchema,
    sede: sedeSchema
});

// Que se presta
const itemSchema = new mongoose.Schema({
    nombre: String,
    codigo: Number,
    cantidad: Number,
    tipo: {type: String, enum: ['Equipo', 'Herramienta', 'Material']},
    sede: sedeSchema
});
// Prestamos a usuarios de pañol
const prestamoSchema = new mongoose.Schema({
    cantidad: Number,
    fecha: String,
    devolucion: String,
    entidad: {
        tipo :{type: String, enum: ['Estudiante', 'Docente']},
        referencia:{ type: Schema.Types.ObjectId, refPath: 'entidad.tipo'}
    },
    item: itemSchema,
    sede: sedeSchema
});

// Usuarios de pañol
const Estudiante = mongoose.model('Estudiante', estudianteSchema);
const Docente = mongoose.model('Docente', docenteSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);

const Carrera = mongoose.model('Carrera', carreraSchema);

// Elementos de pañol
const Item = mongoose.model('Item', itemSchema);

// Esquemas geograficos
const Sede = mongoose.model('Sede', sedeSchema);
const Ciudad = mongoose.model('Ciudad', ciudadSchema);
const Comuna = mongoose.model('Comuna', comunaSchema);
const Region = mongoose.model('Region', regionSchema);

// Prestamos
const Prestamo = mongoose.model('Prestamo', prestamoSchema);

module.exports = {Estudiante, Usuario, Docente, Carrera, Sede, Item, Ciudad, Comuna, Region, Prestamo };