const mongoose = require('mongoose');
const {Schema} = mongoose;

const regionSchema = new mongoose.Schema({
    nombre: String
});
const ciudadSchema = new mongoose.Schema({
    nombre: String,
    region: { type: Schema.Types.ObjectId, ref: 'Region' } // Cambiado a ObjectId
});

const comunaSchema = new mongoose.Schema({
    nombre: String,
    ciudad: { type: Schema.Types.ObjectId, ref: 'Ciudad' } // Cambiado a ObjectId
});

const sedeSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    comuna: { type: Schema.Types.ObjectId, ref: 'Comuna' } // Cambiado a ObjectId
});


const carreraSchema = new mongoose.Schema({
    nombre: String,
    escuela: String,
    sede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true }
});

// A quien se le presta
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    rut: { type: String, required: true },
    email: { type: String, required: true }, 
    contrasena: { type: String, required: true },
    telefono: { type: String, required: true },
    rol: { type: String, enum: ['UsuarioF', 'Panolero', 'SuperAdmin', 'CoordinadorCarrera'], required: true }
});

const usuarioFSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },  // Referencia a Usuario
    carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', required: true }  // Carrera del UsuarioF
});

// Que se presta
const itemSchema = new mongoose.Schema({
    nombre: String,
    codigo: Number,
    cantidad: Number,
    tipo: {type: String, enum: ['Equipo', 'Herramienta', 'Material']},
    sede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true }
});
// Prestamos a usuarios de pañol
const prestamoSchema = new mongoose.Schema({
    cantidad: Number,
    fecha: String,
    devolucion: String,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    sede: { type: mongoose.Schema.Types.ObjectId, ref: 'Sede', required: true }
});

// Usuarios de pañol
const UsuarioF = mongoose.model('UsuarioF', usuarioFSchema);
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

module.exports = {UsuarioF, Usuario, Carrera, Sede, Item, Ciudad, Comuna, Region, Prestamo };