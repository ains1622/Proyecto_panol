const { get } = require('lodash');
const {Equipo, Estudiante, Usuario, Docente, Carrera, Sede, Herramienta, Material, Ciudad, Comuna, Region, Prestamo, PrestamoEquipoE, PrestamoEquipoD,
    PrestamoHerramientaE, PrestamoHerramientaD, PrestamoMaterialE, PrestamoMaterialD} = require('../models/modelSchemas');
const { getEnterLeaveForKind } = require('graphql');

const resolvers = {
    // Para manejar las uniones
    PrestamosEquiposUnion: {
        __resolveType(obj){
            if (obj.estudiante && obj.estudiante.carrera){
                return 'PrestamosEquiposE';
            }
            if (obj.docente && obj.docente.ramo) {
                return 'PrestamosEquiposD';
            }
            return null;
        }
    },
    PrestamosHerramientasUnion: {
        __resolveType(obj){
            if (obj.estudiante && obj.estudiante.carrera){
                return 'PrestamosHerramientasE';
            }
            if (obj.docente && obj.docente.ramo) {
                return 'PrestamosHerramientasD';
            }
            return null;
        }
    },
    PrestamosMaterialesUnion: {
        __resolveType(obj){
            if (obj.estudiante && obj.estudiante.carrera){
                return 'PrestamosMaterialsE';
            }
            if (obj.docente && obj.docente.ramo) {
                return 'PrestamosMaterialsD';
            }
            return null;
        }
    },

    Query: {
        // Querys de Equipos
        async getEquipos (obj) {
            const equipos = await Equipo.find();
            return equipos;
        },
        async getEquipo (obj, { id } ) {
            const equipo = await Equipo.findById(id);
            return equipo;
        },
        async getEquiposBySede (obj, { sede } ) {
            const equipos = await Equipo.find({'sede.nombre': sede});
            return equipos;
        },
        async getEquiposByComuna (obj, { comuna } ) {
            const equipos = await Equipo.find({'sede.comuna.nombre': comuna});
            return equipos;
        },
        async getEquiposByNombre (obj, { nombre } ) {
            const equipos = await Equipo.find({nombre: nombre});
            return equipos;
        },
        async getEquipoByCodigo (obj, { codigo } ) {
            const equipo = await Equipo.findOne({codigo: codigo});
            return equipo;
        },
        // Querys de Estudiantes
        async getHerramientas (obj) {
            const herramientas = await Herramienta.find();
            return herramientas;
        },
        async getHerramienta (obj, { id }) {
            const herramienta = await Herramienta.findById(id);
            return herramienta;
        },
        async getHerramientasBySede (obj, { sede }) {
            const herramientas = await Herramienta.find({'sede.nombre': sede});
            return herramientas;
        },
        async getHerramientasByComuna (obj, { comuna }) {
            const herramientas = await Herramienta.find({'sede.comuna.nombre': comuna});
            return herramientas;
        },
        async getHerramientasByNombre (obj, { nombre }) {
            const herramientas = await Herramienta.find({nombre: nombre});
            return herramientas;
        },
        async getHerramientaByCodigo (obj, { codigo }) {
            const herramienta = await Herramienta.findOne({codigo: codigo});
            return herramienta;
        },

        // Querys de Materiales
        async getMateriales (obj) {
            const materiales = await Material.find();
            return materiales;
        },
        async getMaterial (obj, { id }) {
            const material = await Material.findById(id);
            return material;
        },
        async getMaterialesBySede (obj, { sede }) {
            const materiales = await Material.find({'sede.nombre': sede});
            return materiales;
        },
        async getMaterialesByComuna (obj, { comuna }) {
            const materiales = await Material.find({'sede.comuna.nombre': comuna});
            return materiales;
        },
        async getMaterialesByNombre (obj, { nombre }) {
            const materiales = await Material.find({nombre: nombre});
            return materiales;
        },
        async getMaterialByCodigo (obj, { codigo }) {
            const material = await Material.findOne({codigo: codigo});
            return material;
        },

        // Querys Geograficos
        async getSedes (obj) {
            const sedes = await Sede.find();
            return sedes;
        },
        async getSede (obj, { id }) {
            const sede = await Sede.findById(id);
            return sede;
        },
        async getSedesByComuna (obj, { comuna }) {
            const sedes = await Sede.find({'comuna.nombre': comuna});
            return sedes;
        },
        async getSedeByNombre (obj, { nombre }) {
            const sede = await Sede.findOne({nombre: nombre});
            return sede;
        },
        async getComunas (obj) {
            const comunas = await Comuna.find();
            return comunas;
        },
        async getComuna (obj, { id }) {
            const comuna = await Comuna.findById(id);
            return comuna;
        },
        async getComunasByCiudad (obj, { ciudad }) {
            const comunas = await Comuna.find({'ciudad.nombre': ciudad});
            return comunas;
        },
        async getComunaByNombre (obj, { nombre }) {
            const comuna = await Comuna.findOne({nombre: nombre});
            return comuna;
        },
        async getCiudades (obj) {
            const ciudades = await Ciudad.find();
            return ciudades;
        },
        async getCiudad (obj, { id }) {
            const ciudad = await Ciudad.findById(id);
            return ciudad;
        },
        async getCiudadesByRegion (obj, { region }) {
            const ciudades = await Ciudad.find({'region.nombre': region});
            return ciudades;
        },
        async getCiudadByNombre (obj, { nombre }) {
            const ciudad = await Ciudad.findOne({nombre: nombre});
            return ciudad;
        },
        async getRegiones (obj) {
            const regiones = await Region.find();
            return regiones;
        },
        async getRegion (obj, { id }) {
            const region = await Region.findById(id);
            return region;
        },
        async getRegionByNombre (obj, { nombre }) {
            const region = await Region.findOne({nombre: nombre});
            return region;
        },

        // Querys de Prestamos
        async getPrestamosEquipos (obj) {
            const prestamosEstudiantes = await PrestamoEquipoE.find();
            const prestamosDocentes = await PrestamoEquipoD.find();

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosByNombreEquipo (obj, { nombre }) {
            const prestamosEstudiantes = await PrestamoEquipoE.find({'equipo.nombre': nombre});
            const prestamosDocentes = await PrestamoEquipoD.find({'equipo.nombre': nombre});

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosByCodigoEquipo (obj, { codigo }) {
            const prestamosEstudiantes = await PrestamoEquipoE.find({'equipo.codigo': codigo});
            const prestamosDocentes = await PrestamoEquipoD.find({'equipo.codigo': codigo});

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosEquipoByEstudiante (obj, { nombre }) {
            const prestamos = await PrestamoEquipoE.find({'estudiante.nombre': nombre});
            return prestamos;
        },
        async getPrestamosEquipoByDocente (obj, { nombre }) {
            const prestamos = await PrestamoEquipoD.find({'docente.nombre': nombre});
            return prestamos;
        },
        async getPrestamosHerramientas (obj) {
            const prestamosEstudiantes = await PrestamoHerramientaE.find();
            const prestamosDocentes = await PrestamoHerramientaD.find();

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosByNombreHerramienta (obj, { nombre }) {
            const prestamosEstudiantes = await PrestamoHerramientaE.find({'herramienta.nombre': nombre});
            const prestamosDocentes = await PrestamoHerramientaD.find({'herramienta.nombre': nombre});

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosByCodigoHerramienta (obj, { codigo }) {
            const prestamosEstudiantes = await PrestamoHerramientaE.find({'herramienta.codigo': codigo});
            const prestamosDocentes = await PrestamoHerramientaD.find({'herramienta.codigo': codigo});

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosHerramientasByEstudiante (obj, { nombre }) {
            const prestamos = await PrestamoHerramientaE.find({'estudiante.nombre': nombre});
            return prestamos;
        },
        async getPrestamosHerramientasByDocente (obj, { nombre }) {
            const prestamos = await PrestamoHerramientaD.find({'docente.nombre': nombre});
            return prestamos;
        },
        async getPrestamosMateriales (obj) {
            const prestamosEstudiantes = await PrestamoMaterialE.find();
            const prestamosDocentes = await PrestamoMaterialD.find();

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosByNombreMaterial (obj, { nombre }) {
            const prestamosEstudiantes = await PrestamoMaterialE.find({'material.nombre': nombre});
            const prestamosDocentes = await PrestamoMaterialD.find({'material.nombre': nombre});

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosByCodigoMaterial (obj, { codigo }) {
            const prestamosEstudiantes = await PrestamoMaterialE.find({'material.codigo': codigo});
            const prestamosDocentes = await PrestamoMaterialD.find({'material.codigo': codigo});

            const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
            return prestamos;
        },
        async getPrestamosMaterialesByEstudiante (obj, { nombre }) {
            const prestamos = await PrestamoMaterialE.find({'estudiante.nombre': nombre});
            return prestamos;
        },
        async getPrestamosMaterialesByDocente (obj, { nombre }) {
            const prestamos = await PrestamoMaterialD.find({'docente.nombre': nombre});
            return prestamos;
        },

        // Querys de Usuarios
        async getEstudiantes (obj) {
            const estudiantes = await Estudiante.find();
            return estudiantes;
        },
        async getEstudiante (obj, { id }) {
            const estudiante = await Estudiante.findById(id);
            return estudiante;
        },
        async getEstudiantesByCarrera (obj, { carrera }) {
            const estudiantes = await Estudiante.find({'carrera.nombre': carrera});
            return estudiantes;
        },
        async getEstudiantesByNombre (obj, { nombre }) {
            const estudiantes = await Estudiante.find({nombre: nombre});
            return estudiantes;
        },
        async getEstudianteByRut (obj, { rut }) {
            const estudiante = await Estudiante.findOne({'usuario.rut': rut});
            return estudiante;
        },
        async getDocentes (obj) {
            const docentes = await Docente.find();
            return docentes;
        },
        async getDocente (obj, { id }) {
            const docente = await Docente.findById(id);
            return docente;
        },
        async getDocentesByEscuela (obj, { escuela }) {
            const docentes = await Docente.find({'escuela.nombre': escuela});
            return docentes;
        },
        async getDocentesByNombre (obj, { nombre }) {
            const docentes = await Docente.find({nombre: nombre});
            return docentes;
        },
        async getDocentesByRamo (obj, { ramo }) {
            const docentes = await Docente.find({'ramo.nombre': ramo});
            return docentes;
        },
        async getDocenteByRut (obj, { rut }) {
            const docente = await Docente.findOne({'usuario.rut': rut});
            return docente;
        },
        async getUsuarios (obj) {
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuario (obj, { id }) {
            const usuario = await Usuario.findById(id);
            return usuario;
        },
        async getUsuariosByNombre (obj, { nombre }) {
            const usuarios = await Usuario.find({nombre: nombre});
            return usuarios;
        },
        async getUsuariosBySede (obj, { sede }) {
            const usuarios = await Usuario.find({'sede.nombre': sede});
            return usuarios;
        },

        // Querys de Carreras
        async getCarreras (obj) {
            const carreras = await Carrera.find();
            return carreras;
        },
        async getCarrera (obj, { id }) {
            const carrera = await Carrera.findById(id);
            return carrera;
        },
        async getCarrerasByEscuela (obj, { escuela }) {
            const carreras = await Carrera.find({escuela: escuela});
            return carreras;
        },
        async getCarrerasByNombre (obj, { nombre }) {
            const carreras = await Carrera.find({nombre: nombre});
            return carreras;
        },
        async getCarrerasBySede (obj, { sede }) {
            const carreras = await Carrera.find({'sede.nombre': sede});
            return carreras;
        }
    },
    Mutation: {

        // Mutations de objetos
        async addEquipo(obj, { input }) {
            const equipo = new Equipo(input);
            await equipo.save();
            return equipo;
        },
        async updateEquipo(obj, { id, input }) {
            const equipo = await Equipo.findByIdAndUpdate(id, input, { new: true });
            return equipo;
        },
        async deleteEquipo(obj, { id }) {
            await Equipo.findByIdAndDelete(id);
            return { message: 'Equipo eliminado' };
        },
        async addHerramienta(obj, { input }) {
            const herramienta = new Herramienta(input);
            await herramienta.save();
            return herramienta;
        },
        async updateHerramienta(obj, { id, input }) {
            const herramienta = await Herramienta.findByIdAndUpdate(id, input, { new: true });
            return herramienta;
        },
        async deleteHerramienta(obj, { id }) {
            await Herramienta.findByIdAndDelete(id);
            return { message: 'Herramienta eliminada' };
        },
        async addMaterial(obj, { input }) {
            const material = new Material(input);
            await material.save();
            return material;
        },
        async updateMaterial(obj, { id, input }) {
            const material = await Material.findByIdAndUpdate(id, input, { new: true });
            return material;
        },
        async deleteMaterial(obj, { id }) {
            await Material.findByIdAndDelete(id);
            return { message: 'Material eliminado' };
        },

        // Mutations geograficos
        async addSede(obj, { input }) {
            const sede = new Sede(input);
            await sede.save();
            return sede;
        },
        async updateSede(obj, { id, input }) {
            const sede = await Sede.findByIdAndUpdate(id, input, { new: true });
            return sede;
        },
        async deleteSede(obj, { id }) {
            await Sede.findByIdAndDelete(id);
            return { message: 'Sede eliminada' };
        },
        async addComuna(obj, { input }) {
            const comuna = new Comuna(input);
            await comuna.save();
            return comuna;
        },
        async updateComuna(obj, { id, input }) {
            const comuna = await Comuna.findByIdAndUpdate(id, input, { new: true });
            return comuna;
        },
        async deleteComuna(obj, { id }) {
            await Comuna.findByIdAndDelete(id);
            return { message: 'Comuna eliminada' };
        },
        async addCiudad(obj, { input }) {
            const ciudad = new Ciudad(input);
            await ciudad.save();
            return ciudad;
        },
        async updateCiudad(obj, { id, input }){
            const ciudad = await Ciudad.findByIdAndUpdate(id, input, { new: true });
            return ciudad;
        },
        async deleteCiudad(obj, { id }) {
            await Ciudad.findByIdAndDelete(id);
            return { message: 'Ciudad eliminada' };
        },
        async addRegion(obj, { input }) {
            const region = new Region(input);
            await region.save();
            return region;
        },
        async updateRegion(obj, { id, input }) {
            const region = await Region.findByIdAndUpdate(id, input, { new: true });
            return region;
        },
        async deleteRegion(obj, { id }) {
            await Region.findByIdAndDelete(id);
            return { message: 'Region eliminada' };
        },

        // Mutations de Prestamos
        async addPrestamoEquipoE(obj, { input }) {
            const prestamo = new PrestamoEquipoE(input);
            await prestamo.save();
            return prestamo;
        },
        async updatePrestamoEquipoE(obj, { id, input }) {
            const prestamo = await PrestamoEquipoE.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
        },
        async deletePrestamoEquipoE(obj, { id }) {
            await PrestamoEquipoE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoEquipoD(obj, { input }) {
            const prestamo = new PrestamoEquipoD(input);
            await prestamo.save();
            return prestamo;
        },
        async updatePrestamoEquipoD(obj, { id, input }) {
            const prestamo = await PrestamoEquipoD.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
        },
        async deletePrestamoEquipoD(obj, { id }) {
            await PrestamoEquipoD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoHerramientaE(obj, { input }) {
            const prestamo = new PrestamoHerramientaE(input);
            await prestamo.save();
            return prestamo;
        },
        async updatePrestamoHerramientaE(obj, { id, input }) {
            const prestamo = await PrestamoHerramientaE.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
        },
        async deletePrestamoHerramientaE(obj, { id }) {
            await PrestamoHerramientaE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoHerramientaD(obj, { input }) {
            const prestamo = new PrestamoHerramientaD(input);
            await prestamo.save();
            return prestamo;
        },
        async updatePrestamoHerramientaD(obj, { id, input }) {
            const prestamo = await PrestamoHerramientaD.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
        },
        async deletePrestamoHerramientaD(obj, { id }) {
            await PrestamoHerramientaD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoMaterialE(obj, { input }) {
            const prestamo = new PrestamoMaterialE(input);
            await prestamo.save();
            return prestamo;
        },
        async updatePrestamoMaterialE(obj, { id, input }) {
            const prestamo = await PrestamoMaterialE.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
        },
        async deletePrestamoMaterialE(obj, { id }) {
            await PrestamoMaterialE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoMaterialD(obj, { input }) {
            const prestamo = new PrestamoMaterialD(input);
            await prestamo.save();
            return prestamo;
        },
        async updatePrestamoMaterialD(obj, { id, input }) {
            const prestamo = await PrestamoMaterialD.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
        },
        async deletePrestamoMaterialD(obj, { id }) {
            await PrestamoMaterialD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },

        // Mutations de Usuarios
        async addEstudiante(obj, { input }) {
            const usuario = new Usuario(input.inpu);
            const estudiante = new Estudiante(input);
            await estudiante.save();
            return estudiante;
        },
        async updateEstudiante(obj, { id, input }) {
            const estudiante = await Estudiante.findByIdAndUpdate(id, input, { new: true });
            return estudiante;
        },
        async deleteEstudiante(obj, { id }) {
            await Estudiante.findByIdAndDelete(id);
            return { message: 'Estudiante eliminado' };
        },
        async addDocente(obj, { input }) {
            const docente = new Docente(input);
            await docente.save();
            return docente;
        },
        async updateDocente(obj, { id, input }) {
            const docente = await Docente.findByIdAndUpdate(id, input, { new: true });
            return docente;
        },
        async deleteDocente(obj, { id }) {
            await Docente.findByIdAndDelete(id);
            return { message: 'Docente eliminado' };
        },
        
        // Mutations de Carreras
        async addCarrera(obj, { input }) {
            const carrera = new Carrera(input);
            await carrera.save();
            return carrera;
        },
        async updateCarrera(obj, { id, input }) {
            const carrera = await Carrera.findByIdAndUpdate(id, input, { new: true });
            return carrera;
        },
        async deleteCarrera(obj, { id }) {
            await Carrera.findByIdAndDelete(id);
            return { message: 'Carrera eliminada' };
        }
    }
};

module.exports = resolvers;