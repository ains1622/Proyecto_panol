const mongoose = require('mongoose');

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
    nombre: String,
    rut: String,
    correo: String,
    telefono: String
});
const estudianteSchema = new mongoose.Schema({
    carrera: carreraSchema,
    usuario: usuarioSchema
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
    fecha: Date,
    devolucion: Date,
    cantidad: Number,
    entidad: {
        tipo :{type: String, enum: ['Estudiante', 'Docente']},
        referencia:{ type: Schema.Types.ObjectId, refPath: 'entidad.tipo'}
    }
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