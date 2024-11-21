const { get } = require('lodash');
const {Equipo, Estudiante, Usuario, Docente, Carrera, Sede, Herramienta, Material, Ciudad, Comuna, Region, Prestamo, PrestamoEquipoE, PrestamoEquipoD,
    PrestamoHerramientaE, PrestamoHerramientaD, PrestamoMaterialE, PrestamoMaterialD} = require('../models/modelSchemas');
const { getEnterLeaveForKind } = require('graphql');

const resolvers = {
    // Para manejar las uniones
    PrestamosEquiposUnion: {
        __resolveType(obj){
            if (obj.estudiante && obj.estudiante.carrera){
                return 'PrestamoEquipoE';
            }
            if (obj.docente && obj.docente.ramo) {
                return 'PrestamoEquipoD';
            }
            return null;
        }
    },
    PrestamosHerramientasUnion: {
        __resolveType(obj){
            if (obj.estudiante && obj.estudiante.carrera){
                return 'PrestamoHerramientE';
            }
            if (obj.docente && obj.docente.ramo) {
                return 'PrestamoHerramientD';
            }
            return null;
        }
    },
    PrestamosMaterialesUnion: {
        __resolveType(obj){
            if (obj.estudiante && obj.estudiante.carrera){
                return 'PrestamoMaterialE';
            }
            if (obj.docente && obj.docente.ramo) {
                return 'PrestamoMaterialD';
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
            const prestamos = await PrestamoEquipoE.find({'estudiante.usuario.nombre': nombre});
            return prestamos;
        },
        async getPrestamosEquipoByDocente (obj, { nombre }) {
            const prestamos = await PrestamoEquipoD.find({'docente.usuario.nombre': nombre});
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
            const prestamos = await PrestamoHerramientaE.find({'estudiante.usuario.nombre': nombre});
            return prestamos;
        },
        async getPrestamosHerramientasByDocente (obj, { nombre }) {
            const prestamos = await PrestamoHerramientaD.find({'docente.usuario.nombre': nombre});
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
            const prestamos = await PrestamoMaterialE.find({'estudiante.usuario.nombre': nombre});
            return prestamos;
        },
        async getPrestamosMaterialesByDocente (obj, { nombre }) {
            const prestamos = await PrestamoMaterialD.find({'docente.usuario.nombre': nombre});
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
        async addPrestamoEquipoE(parent, { input }, context, info) {
            const { estudiante, prestamo, sede, equipo } = input;
            
            try {
                // Validar que el estudiante existe
                const estudianteExistente = await Estudiante.findOne({ 'usuario.rut': estudiante.usuario.rut });
                if (!estudianteExistente) {
                  throw new Error("Estudiante no encontrado");
                }
        
                // Validar que el equipo existe
                const equipoExistente = await Equipo.findOne({ codigo: equipo.codigo });
                if (!equipoExistente) {
                  throw new Error("Equipo no encontrado");
                }
        
                // Validar que la sede existe
                const sedeExistente = await Sede.findOne({ nombre: sede.nombre });
                if (!sedeExistente) {
                  throw new Error("Sede no encontrada");
                }
        
                // Crear el objeto Prestamo
                const nuevoPrestamo = new Prestamo({
                  cantidad: prestamo.cantidad,
                  fecha: prestamo.fecha,
                  devolucion: prestamo.devolucion,
                  estudiante: estudianteExistente._id,  // Asociar el estudiante
                  equipo: equipoExistente._id,  // Asociar el equipo
                  sede: sedeExistente._id   // Asociar la sede
                });
        
                // Guardar el nuevo préstamo
                await nuevoPrestamo.save();
        
                // Opcional: Actualizar la cantidad del equipo, si es necesario
                equipoExistente.cantidad -= prestamo.cantidad; // Restamos la cantidad prestada
                await equipoExistente.save();
        
                return nuevoPrestamo; // Devuelve el préstamo agregado
              } catch (error) {
                throw new Error("Error al agregar el préstamo: " + error.message);
              }
        },
        async updatePrestamoEquipoE(parent, { input }, context, info) {
            const { prestamoId, estudiante, prestamo, sede, equipo } = input;
      
            try {
              // Buscar el préstamo existente
              const prestamoExistente = await Prestamo.findById(prestamoId);
              if (!prestamoExistente) {
                throw new Error("Prestamo no encontrado");
              }
      
              // Validar si el estudiante existe (se puede actualizar solo el estudiante)
              if (estudiante) {
                const estudianteExistente = await Estudiante.findOne({ 'usuario.rut': estudiante.usuario.rut });
                if (!estudianteExistente) {
                  throw new Error("Estudiante no encontrado");
                }
                prestamoExistente.estudiante = estudianteExistente._id;  // Asociar el estudiante
              }
      
              // Validar si el equipo existe y si la cantidad de equipo cambia
              if (equipo) {
                const equipoExistente = await Equipo.findOne({ codigo: equipo.codigo });
                if (!equipoExistente) {
                  throw new Error("Equipo no encontrado");
                }
                // Si la cantidad del préstamo cambia, debes actualizar la cantidad disponible en el equipo
                const cantidadPrestada = prestamoExistente.cantidad - prestamo.cantidad;  // Calcular diferencia
                equipoExistente.cantidad -= cantidadPrestada; // Actualizar cantidad
                await equipoExistente.save();
                prestamoExistente.equipo = equipoExistente._id;  // Asociar el equipo
              }
      
              // Validar si la sede existe
              if (sede) {
                const sedeExistente = await Sede.findOne({ nombre: sede.nombre });
                if (!sedeExistente) {
                  throw new Error("Sede no encontrada");
                }
                prestamoExistente.sede = sedeExistente._id;  // Asociar la sede
              }
      
              // Actualizar los detalles del préstamo si los campos fueron enviados
              if (prestamo) {
                prestamoExistente.cantidad = prestamo.cantidad || prestamoExistente.cantidad;
                prestamoExistente.fecha = prestamo.fecha || prestamoExistente.fecha;
                prestamoExistente.devolucion = prestamo.devolucion || prestamoExistente.devolucion;
              }
      
              // Guardar el préstamo actualizado
              await prestamoExistente.save();
      
              return prestamoExistente;  // Devuelve el préstamo actualizado
            } catch (error) {
              throw new Error("Error al actualizar el préstamo: " + error.message);
            }
        },
        async deletePrestamoEquipoE(obj, { id }) {
            await PrestamoEquipoE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoEquipoD(parent, { input }, context, info) {
            const { docente, prestamo, sede, equipo } = input;
            
            try {
                // Validar que el docente existe
                const docenteExistente = await Docente.findOne({ 'usuario.rut': docente.usuario.rut });
                if (!docenteExistente) {
                  throw new Error("Docente no encontrado");
                }
        
                // Validar que el equipo existe
                const equipoExistente = await Equipo.findOne({ codigo: equipo.codigo });
                if (!equipoExistente) {
                  throw new Error("Equipo no encontrado");
                }
        
                // Validar que la sede existe
                const sedeExistente = await Sede.findOne({ nombre: sede.nombre });
                if (!sedeExistente) {
                  throw new Error("Sede no encontrada");
                }
        
                // Crear el objeto Prestamo
                const nuevoPrestamo = new Prestamo({
                  cantidad: prestamo.cantidad,
                  fecha: prestamo.fecha,
                  devolucion: prestamo.devolucion,
                  docente: docenteExistente._id,  // Asociar el docente
                  equipo: equipoExistente._id,  // Asociar el equipo
                  sede: sedeExistente._id   // Asociar la sede
                });
        
                // Guardar el nuevo préstamo
                await nuevoPrestamo.save();
        
                // Opcional: Actualizar la cantidad del equipo, si es necesario
                equipoExistente.cantidad -= prestamo.cantidad; // Restamos la cantidad prestada
                await equipoExistente.save();
        
                return nuevoPrestamo; // Devuelve el préstamo agregado
              } catch (error) {
                throw new Error("Error al agregar el préstamo: " + error.message);
              }
        },
        async updatePrestamoEquipoD(parent, { input }, context, info) {
            const { prestamoId, docente, prestamo, sede, equipo } = input;
      
            try {
              // Buscar el préstamo existente
              const prestamoExistente = await Prestamo.findById(prestamoId);
              if (!prestamoExistente) {
                throw new Error("Prestamo no encontrado");
              }
      
              // Validar si el docente existe
              if (docente) {
                const docenteExistente = await Docente.findOne({ 'usuario.rut': docente.usuario.rut });
                if (!docenteExistente) {
                  throw new Error("Docente no encontrado");
                }
                prestamoExistente.docente = docenteExistente._id;  // Asociar el docente
              }
      
              // Validar si el equipo existe y si la cantidad de equipo cambia
              if (equipo) {
                const equipoExistente = await Equipo.findOne({ codigo: equipo.codigo });
                if (!equipoExistente) {
                  throw new Error("Equipo no encontrado");
                }
                // Si la cantidad del préstamo cambia, debes actualizar la cantidad disponible en el equipo
                const cantidadPrestada = prestamoExistente.cantidad - prestamo.cantidad;  // Calcular diferencia
                equipoExistente.cantidad -= cantidadPrestada; // Actualizar cantidad
                await equipoExistente.save();
                prestamoExistente.equipo = equipoExistente._id;  // Asociar el equipo
              }
      
              // Validar si la sede existe
              if (sede) {
                const sedeExistente = await Sede.findOne({ nombre: sede.nombre });
                if (!sedeExistente) {
                  throw new Error("Sede no encontrada");
                }
                prestamoExistente.sede = sedeExistente._id;  // Asociar la sede
              }
      
              // Actualizar los detalles del préstamo si los campos fueron enviados
              if (prestamo) {
                prestamoExistente.cantidad = prestamo.cantidad || prestamoExistente.cantidad;
                prestamoExistente.fecha = prestamo.fecha || prestamoExistente.fecha;
                prestamoExistente.devolucion = prestamo.devolucion || prestamoExistente.devolucion;
              }
      
              // Guardar el préstamo actualizado
              await prestamoExistente.save();
      
              return prestamoExistente;  // Devuelve el préstamo actualizado
            } catch (error) {
              throw new Error("Error al actualizar el préstamo: " + error.message);
            }
        },
        async deletePrestamoEquipoD(obj, { id }) {
            await PrestamoEquipoD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
        },
        async addPrestamoHerramientaE(parent, { input }, context, info) {
            const { estudiante, prestamo, sede, equipo } = input;
            
            try {
                // Validar que el estudiante existe
                const estudianteExistente = await Estudiante.findOne({ 'usuario.rut': estudiante.usuario.rut });
                if (!estudianteExistente) {
                  throw new Error("Estudiante no encontrado");
                }
        
                // Validar que la herramienta exista
                const herramientaExistente = await Herramienta.findOne({ codigo: herramienta.codigo });
                if (!herramientaExistente) {
                  throw new Error("Herramienta no encontrado");
                }
        
                // Validar que la sede existe
                const sedeExistente = await Sede.findOne({ nombre: sede.nombre });
                if (!sedeExistente) {
                  throw new Error("Sede no encontrada");
                }
        
                // Crear el objeto Prestamo
                const nuevoPrestamo = new Prestamo({
                  cantidad: prestamo.cantidad,
                  fecha: prestamo.fecha,
                  devolucion: prestamo.devolucion,
                  estudiante: estudianteExistente._id,  // Asociar el estudiante
                  herramienta: herramientaExistente._id,  // Asociar la herramienta
                  sede: sedeExistente._id   // Asociar la sede
                });
        
                // Guardar el nuevo préstamo
                await nuevoPrestamo.save();
        
                // Actualizar la cantidad de herramientas
                herraminetaExistente.cantidad -= prestamo.cantidad; // Restamos la cantidad prestada
                await herramientaExistente.save();
        
                return nuevoPrestamo; // Devuelve el préstamo agregado
              } catch (error) {
                throw new Error("Error al agregar el préstamo: " + error.message);
              }
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
        async addEstudiante(parent, { input }) {
            const usuario = new Usuario(input.usuario);
            await usuario.save();
            const estudiante = new Estudiante({ ...input, usuario: usuario._id });
            await estudiante.save();
            return estudiante;
        },
        async updateEstudiante(parent, { id, input }) {
            const estudiante = await Estudiante.findByIdAndUpdate(id, input, { new: true });
            return estudiante;
        },
        async deleteEstudiante(parent, { id }) {
            await Estudiante.findByIdAndDelete(id);
            return { message: 'Estudiante eliminado' };
        },
        async addDocente(parent, { input }) {
            const usuario = new Usuario(input.usuario);
            await usuario.save();
            const docente = new Docente({ ...input, usuario: usuario._id });
            await docente.save();
            return docente;
        },
        async updateDocente(parent, { id, input }) {
            const docente = await Docente.findByIdAndUpdate(id, input, { new: true });
            return docente;
        },
        async deleteDocente(parent, { id }) {
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