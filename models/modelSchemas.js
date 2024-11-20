const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    run: String,
    correo: String,
    telefono: String
});

const estudianteSchema = new mongoose.Schema({
    carrera: String
});
const docenteSchema = new mongoose.Schema({
    ramo: String,
    escuela: String
});

const carreraSchema = new mongoose.Schema({
    nombre: String,
    escuela: String
});

const sedeSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    comuna: String
});
const regionSchema = new mongoose.Schema({
    nombre: String
});
const ciudadSchema = new mongoose.Schema({
    nombre: String
});
const comunaSchema = new mongoose.Schema({
    nombre: String
});


const equipoSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    cantidad: Number
});
const herramientaSchema = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    codigo: String
});

const materialSchema = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    codigo: String
});

const Estudiante = Usuario.discriminator('Estudiante', estudianteSchema);
const Docente = Usuario.discriminator('Docente', docenteSchema);
const Usuario = Sede.discriminator('Usuario', usuarioSchema);
const Carrera = Sede.discriminator('Carrera', carreraSchema);
const Equipo = Sede.discriminator('Equipo', equipoSchema);
const Herramienta = Sede.discriminator('Herramienta', herramientaSchema);
const Material = Sede.discriminator('Material', materialSchema);
const Sede = Comuna.discriminator('Sede', sedeSchema);
const Ciudad = Region.discriminator('Ciudad', ciudadSchema);
const Comuna = Ciudad.discriminator('Comuna', comunaSchema);
const Region = mongoose.model('Region', regionSchema);


module.exports = { Equipo, Estudiante, Usuario, Docente, Carrera, Sede, Herramienta, Material, Ciudad, Comuna, Region };