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

// Esquemas geograficos


// Que se presta
const equipoSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    cantidad: Number,
    sede: sedeSchema
});
const herramientaSchema = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    codigo: String,
    sede: sedeSchema
});

const materialSchema = new mongoose.Schema({
    nombre: String,
    cantidad: Number,
    codigo: String,
    sede: sedeSchema
});

// Prestamos a usuarios de pañol
const prestamoSchema = new mongoose.Schema({
    fecha: Date,
    devolucion: Date,
    cantidad: Number,
});
const prestamoEquipoESchema = new mongoose.Schema({
    equipo: equipoSchema,
    prestamo: prestamoSchema,
    estudiante: estudianteSchema
});
const prestamoEquipoDSchema = new mongoose.Schema({
    equipo: equipoSchema,
    prestamo: prestamoSchema,
    docente: docenteSchema
});
const prestamoHerramientaESchema = new mongoose.Schema({
    herramienta: herramientaSchema,
    prestamo: prestamoSchema,
    estudiante: estudianteSchema
});
const prestamoHerramientaDSchema = new mongoose.Schema({
    herramienta: herramientaSchema,
    prestamo: prestamoSchema,
    docente: docenteSchema
});
const prestamoMaterialESchema = new mongoose.Schema({
    material: materialSchema,
    prestamo: prestamoSchema,
    estudiante: estudianteSchema
});
const prestamoMaterialDSchema = new mongoose.Schema({
    material: materialSchema,
    prestamo: prestamoSchema,
    docente: docenteSchema
});

// Usuarios de pañol
const Estudiante = mongoose.model('Estudiante', estudianteSchema);
const Docente = mongoose.model('Docente', docenteSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);

const Carrera = mongoose.model('Carrera', carreraSchema);

// Elementos de pañol
const Equipo = mongoose.model('Equipo', equipoSchema);
const Herramienta = mongoose.model('Herramienta', herramientaSchema);
const Material = mongoose.model('Material', materialSchema);

// Esquemas geograficos
const Sede = mongoose.model('Sede', sedeSchema);
const Ciudad = mongoose.model('Ciudad', ciudadSchema);
const Comuna = mongoose.model('Comuna', comunaSchema);
const Region = mongoose.model('Region', regionSchema);

// Prestamos
const Prestamo = mongoose.model('Prestamo', prestamoSchema);
const PrestamoEquipoE = mongoose.model('PrestamoEquipoE', prestamoEquipoESchema);
const PrestamoEquipoD = mongoose.model('PrestamoEquipoD', prestamoEquipoDSchema);
const PrestamoHerramientaE = mongoose.model('PrestamoHerramientaE', prestamoHerramientaESchema);
const PrestamoHerramientaD = mongoose.model('PrestamoHerramientaD', prestamoHerramientaDSchema);
const PrestamoMaterialE = mongoose.model('PrestamoMaterialE', prestamoMaterialESchema);
const PrestamoMaterialD = mongoose.model('PrestamoMaterialD', prestamoMaterialDSchema);

module.exports = { Equipo, Estudiante, Usuario, Docente, Carrera, Sede, Herramienta, Material, Ciudad, Comuna, Region, Prestamo, PrestamoEquipoE, PrestamoEquipoD,
     PrestamoHerramientaE, PrestamoHerramientaD, PrestamoMaterialE, PrestamoMaterialD };