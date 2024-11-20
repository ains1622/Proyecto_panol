const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
    nombre: String,
    estado: String
});

const estudianteSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    run: String,
    carrera: String,

});

const Equipo = mongoose.model('Equipo', equipoSchema);
const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = { Equipo, Estudiante };