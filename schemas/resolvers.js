const { get } = require('lodash');
const {Equipo, Estudiante, Usuario, Docente, Carrera, Sede,Ciudad, Comuna, Region, Prestamo} = require('../models/modelSchemas');
const { getEnterLeaveForKind } = require('graphql');

const resolvers = {
    Query: {
        // Querys de Items
        async getItems (obj) {
            try{
                const items = await Item.find();
                return items;
            } catch (error) {
                throw new Error(`Error: Items no encontrados: ${error.message}`);
            }
        },
        async getItem (obj, { id }) {
            try{
                const item = await Item.findById(id);
                return item;
            } catch (error) {
                throw new Error(`Error: Item no encontrado: ${error.message}`);
            }
        },
        async getItemsByNombre (obj, { nombre }) {
            try{
                const items = await Item.find({nombre: nombre});
                return items;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getItemsByCodigo (obj, { codigo }) {
            try{
                const items = await Item.find({codigo: codigo});
                return items;
            } catch (error) {
                throw new Error(`Error: Codigo: ${error.message}`);
            }
        },
        async getItemsByTipo (obj, { tipo }) {
            try{
                const items = await Item.find({tipo: tipo});
                return items;
            } catch (error) {
                throw new Error(`Error: Tipo: ${error.message}`);
            }
        },
        async getItemsBySede (obj, { sede }) {
            try{
                const items = await Item.find({'sede.nombre': sede});
                return items;
            } catch (error) {
                throw new Error(`Error: Sede: ${error.message}`);
            }
        },
        async getItems
        async getItemsByTipoYSede (obj, { tipo, sede }) {
            try{
                const items = await Item.find({$and: [{tipo: tipo}, {'sede.nombre': sede}]});
                return items;
            } catch (error) {
                throw new Error(`Error: Tipo y Sede: ${error.message}`);
            }
        },
        async getItemsByTipoYComuna (obj, { tipo, comuna }) {
            try{
                const items = await Item.find({$and: [{tipo: tipo}, {'sede.comuna.nombre': comuna}]});
                return items;
            } catch (error) {
                throw new Error(`Error: Tipo y Comuna: ${error.message}`);
            }
        },
        async getItemsByTipoYCiudad (obj, { tipo, ciudad }) {
            try{
                const items = await Item.find({$and: [{tipo: tipo}, {'sede.ciudad.nombre': ciudad}]});
                return items;
            } catch (error) {
                throw new Error(`Error: Tipo y Ciudad: ${error.message}`);
            }
        },
        async getItemsByTipoYRegion (obj, { tipo, region }) {
            try{
                const items = await Item.find({$and: [{tipo: tipo}, {'sede.region.nombre': region}]});
                return items;
            } catch (error) {
                throw new Error(`Error: Tipo y Region: ${error.message}`);
            }
        },
        // Querys Geograficos
        async getSedes (obj) {
            try{
            const sedes = await Sede.find();
            return sedes;
            } catch (error) {
                throw new Error(`Error: Sedes no encontradas: ${error.message}`);
            }
        },
        async getSede (obj, { id }) {
            try{
                const sede = await Sede.findById(id);
                return sede;
            } catch (error) {
                throw new Error(`Error: Sede no encontrada: ${error.message}`);
            }
        },
        async getSedesByComuna (obj, { comuna }) {
            try{
                const sedes = await Sede.find({'comuna.nombre': comuna});
                return sedes;
            } catch (error) {
                throw new Error(`Error: Comuna: ${error.message}`);
            }
        },
        async getSedeByNombre (obj, { nombre }) {
            try{
                const sede = await Sede.findOne({nombre: nombre});
                return sede;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getComunas (obj) {
            try{
                const comunas = await Comuna.find();
                return comunas;
            } catch (error) {
                throw new Error(`Error: Comunas no encontradas: ${error.message}`);
            }
        },
        async getComuna (obj, { id }) {
            try{
            const comuna = await Comuna.findById(id);
            return comuna;
            } catch (error) {
                throw new Error(`Error: Comuna no encontrada: ${error.message}`);
            }
        },
        async getComunasByCiudad (obj, { ciudad }) {
            try{
                const comunas = await Comuna.find({'ciudad.nombre': ciudad});
                return comunas;
            } catch (error) {
                throw new Error(`Error: Ciudad: ${error.message}`);
            }
        },
        async getComunaByNombre (obj, { nombre }) {
            try{
                const comuna = await Comuna.findOne({nombre: nombre});
                return comuna;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getCiudades (obj) {
            try{
                const ciudades = await Ciudad.find();
                return ciudades;
            } catch (error) {
                throw new Error(`Error: Ciudades no encontradas: ${error.message}`);
            }
        },
        async getCiudad (obj, { id }) {
            try{
                const ciudad = await Ciudad.findById(id);
                return ciudad;
            } catch (error) {
                throw new Error(`Error: Ciudad no encontrada: ${error.message}`);
            }
        },
        async getCiudadesByRegion (obj, { region }) {
            try{
                const ciudades = await Ciudad.find({'region.nombre': region});
                return ciudades;
            } catch (error) {
                throw new Error(`Error: Region: ${error.message}`);
            }
        },
        async getCiudadByNombre (obj, { nombre }) {
            try{
                const ciudad = await Ciudad.findOne({nombre: nombre});
                return ciudad;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getRegiones (obj) {
            try{
                const regiones = await Region.find();
                return regiones;
            } catch (error) {
                throw new Error(`Error: Regiones no encontradas: ${error.message}`);
            }
        },
        async getRegion (obj, { id }) {
            try{
                const region = await Region.findById(id);
                return region;
            } catch (error) {
                throw new Error(`Error: Region no encontrada: ${error.message}`);
            }
        },
        async getRegionByNombre (obj, { nombre }) {
            try{
                const region = await Region.findOne({nombre: nombre});
                return region;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },

        // Querys de Prestamos
        async getPrestamosEquipos (obj) {
            try{
                const prestamosEstudiantes = await PrestamoEquipoE.find();
                const prestamosDocentes = await PrestamoEquipoD.find();

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Prestamos no encontrados: ${error.message}`);
            }
        },
        async getPrestamosByNombreEquipo (obj, { nombre }) {
            try{
                const prestamosEstudiantes = await PrestamoEquipoE.find({'equipo.nombre': nombre});
                const prestamosDocentes = await PrestamoEquipoD.find({'equipo.nombre': nombre});

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getPrestamosByCodigoEquipo (obj, { codigo }) {
            try{
                const prestamosEstudiantes = await PrestamoEquipoE.find({'equipo.codigo': codigo});
                const prestamosDocentes = await PrestamoEquipoD.find({'equipo.codigo': codigo});

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Codigo: ${error.message}`);
            }
        },
        async getPrestamosEquipoByEstudiante (obj, { nombre }) {
            try{
                const prestamos = await PrestamoEquipoE.find({'estudiante.usuario.nombre': nombre});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Estudiante: ${error.message}`);
            }
        },
        async getPrestamosEquipoByDocente (obj, { nombre }) {
            try{
                const prestamos = await PrestamoEquipoD.find({'docente.usuario.nombre': nombre});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Docente: ${error.message}`);
            }
        },
        async getPrestamosHerramientas (obj) {
            try{
                const prestamosEstudiantes = await PrestamoHerramientaE.find();
                const prestamosDocentes = await PrestamoHerramientaD.find();

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Prestamos no encontrados: ${error.message}`);
            }
        },
        async getPrestamosByNombreHerramienta (obj, { nombre }) {
            try{
                const prestamosEstudiantes = await PrestamoHerramientaE.find({'herramienta.nombre': nombre});
                const prestamosDocentes = await PrestamoHerramientaD.find({'herramienta.nombre': nombre});

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getPrestamosByCodigoHerramienta (obj, { codigo }) {
            try{
                const prestamosEstudiantes = await PrestamoHerramientaE.find({'herramienta.codigo': codigo});
                const prestamosDocentes = await PrestamoHerramientaD.find({'herramienta.codigo': codigo});

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Codigo: ${error.message}`);
            }
        },
        async getPrestamosHerramientasByEstudiante (obj, { nombre }) {
            try{
                const prestamos = await PrestamoHerramientaE.find({'estudiante.usuario.nombre': nombre});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Estudiante: ${error.message}`);
            }
        },
        async getPrestamosHerramientasByDocente (obj, { nombre }) {
            try{
                const prestamos = await PrestamoHerramientaD.find({'docente.usuario.nombre': nombre});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Docente: ${error.message}`);
            }
        },
        async getPrestamosMateriales (obj) {
            try{
                const prestamosEstudiantes = await PrestamoMaterialE.find();
                const prestamosDocentes = await PrestamoMaterialD.find();

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Prestamos no encontrados: ${error.message}`);
            }
        },
        async getPrestamosByNombreMaterial (obj, { nombre }) {
            try{
                const prestamosEstudiantes = await PrestamoMaterialE.find({'material.nombre': nombre});
                const prestamosDocentes = await PrestamoMaterialD.find({'material.nombre': nombre});

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getPrestamosByCodigoMaterial (obj, { codigo }) {
            try{
                const prestamosEstudiantes = await PrestamoMaterialE.find({'material.codigo': codigo});
                const prestamosDocentes = await PrestamoMaterialD.find({'material.codigo': codigo});

                const prestamos = [...prestamosEstudiantes, ...prestamosDocentes];
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Codigo: ${error.message}`);
            }
        },
        async getPrestamosMaterialesByEstudiante (obj, { nombre }) {
            try{
                const prestamos = await PrestamoMaterialE.find({'estudiante.usuario.nombre': nombre});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Estudiante: ${error.message}`);
            }
        },
        async getPrestamosMaterialesByDocente (obj, { nombre }) {
            try{
                const prestamos = await PrestamoMaterialD.find({'docente.usuario.nombre': nombre});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Docente: ${error.message}`);
            }
        },

        // Querys de Usuarios
        async getEstudiantes (obj) {
            try{
                const estudiantes = await Estudiante.find();
                return estudiantes;
            } catch (error) {
                throw new Error(`Error: Estudiantes no encontrados: ${error.message}`);
            }
        },
        async getEstudiante (obj, { id }) {
            try{
                const estudiante = await Estudiante.findById(id);
                return estudiante;
            } catch (error) {
                throw new Error(`Error: Estudiante no encontrado: ${error.message}`);
            }
        },
        async getEstudiantesByCarrera (obj, { carrera }) {
            try{
                const estudiantes = await Estudiante.find({'carrera.nombre': carrera});
                return estudiantes;
            } catch (error) {  
                throw new Error(`Error: Carrera: ${error.message}`);
            }
        },
        async getEstudiantesByNombre (obj, { nombre }) {
            try{
                const estudiantes = await Estudiante.find({nombre: nombre});
                return estudiantes;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getEstudianteByRut (obj, { rut }) {
            try{
                const estudiante = await Estudiante.findOne({'usuario.rut': rut});
                return estudiante;
            } catch (error) {
                throw new Error(`Error: Rut: ${error.message}`);
            }
        },
        async getDocentes (obj) {
            try{
                const docentes = await Docente.find();
                return docentes;
            } catch (error) {
                throw new Error(`Error: Docentes no encontrados: ${error.message}`);
            }
        },
        async getDocente (obj, { id }) {
            try{
                const docente = await Docente.findById(id);
                return docente;
            } catch (error) {
                throw new Error(`Error: Docente no encontrado: ${error.message}`);
            }
        },
        async getDocentesByEscuela (obj, { escuela }) {
            try{
                const docentes = await Docente.find({'escuela.nombre': escuela});
                return docentes;
            } catch (error) {
                throw new Error(`Error: Escuela: ${error.message}`);
            }
        },
        async getDocentesByNombre (obj, { nombre }) {
            try{
                const docentes = await Docente.find({nombre: nombre});
                return docentes;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getDocentesByRamo (obj, { ramo }) {
            try{
                const docentes = await Docente.find({'ramo.nombre': ramo});
                return docentes;
            } catch (error) {
                throw new Error(`Error: Ramo: ${error.message}`);
            }
        },
        async getDocenteByRut (obj, { rut }) {
            try{
                const docente = await Docente.findOne({'usuario.rut': rut});
                return docente;
            } catch (error) {
                throw new Error(`Error: Rut: ${error.message}`);
            }
        },
        async getUsuarios (obj) {
            try{
                const usuarios = await Usuario.find();
                return usuarios;
            } catch (error) {
                throw new Error(`Error: Usuarios no encontrados: ${error.message}`);
            }
        },
        async getUsuario (obj, { id }) {
            try{
                const usuario = await Usuario.findById(id);
                return usuario;
            } catch (error) {
                throw new Error(`Error: Usuario no encontrado: ${error.message}`);
            }
        },
        async getUsuariosByNombre (obj, { nombre }) {
            try{
                const usuarios = await Usuario.find({nombre: nombre});
                return usuarios;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getUsuariosBySede (obj, { sede }) {
            try{
                const usuarios = await Usuario.find({'sede.nombre': sede});
                return usuarios;
            } catch (error) {
                throw new Error(`Error: Sede: ${error.message}`);
            }
        },

        // Querys de Carreras
        async getCarreras (obj) {
            try{
                const carreras = await Carrera.find();
                return carreras;
            } catch (error) {
                throw new Error(`Error: Carreras no encontradas: ${error.message}`);
            }
        },
        async getCarrera (obj, { id }) {
            try{
                const carrera = await Carrera.findById(id);
                return carrera;
            } catch (error) {
                throw new Error(`Error: Carrera no encontrada: ${error.message}`);
            }
        },
        async getCarrerasByEscuela (obj, { escuela }) {
            try{
                const carreras = await Carrera.find({escuela: escuela});
                return carreras;
            } catch (error) {
                throw new Error(`Error: Escuela: ${error.message}`);
            }
        },
        async getCarrerasByNombre (obj, { nombre }) {
            try{
                const carreras = await Carrera.find({nombre: nombre});
                return carreras;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getCarrerasBySede (obj, { sede }) {
            try{
                const carreras = await Carrera.find({'sede.nombre': sede});
                return carreras;
            } catch (error) {
                throw new Error(`Error: Sede: ${error.message}`);
            }
        }
    },
    Mutation: {

        // Mutations de objetos
        async addEquipo(obj, { input }) {
            try{
                if (input.cantidad <= 0) {
                    throw new Error('La cantidad debe ser mayor a 0');
                }

                const equipoExistente = await Equipo.findOne({ codigo: input.codigo });
                if (equipoExistente) {
                    equipoExistente.cantidad += input.cantidad;
                    await equipoExistente.save();
                    return equipoExistente;
                }

                const equipo = new Equipo(input);
                await equipo.save();
                return equipo;
            } catch (error) {
                throw new Error(`Error al agregar el equipo: ${error.message}`);
            }
        },
        async updateEquipo(obj, { id, input }) {
            try{
                const equipo = await Equipo.findByIdAndUpdate(id, input, { new: true });
                return equipo;
            } catch (error) {
                throw new Error(`Error al actualizar el equipo: ${error.message}`);
            }
        },
        async deleteEquipo(obj, { id }) {
            try{
                await Equipo.findByIdAndDelete(id);
                return { message: 'Equipo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el equipo: ${error.message}`);
            }
        },
        async addHerramienta(obj, { input }) {
            try{
                if (input.cantidad <= 0) {
                    throw new Error('La cantidad debe ser mayor a 0');
                }


                const herramienta = new Herramienta(input);
                await herramienta.save();
                return herramienta;
            } catch (error) {
                throw new Error(`Error al agregar la herramienta: ${error.message}`);
            }
        },
        async updateHerramienta(obj, { id, input }) {
            try{
                const herramienta = await Herramienta.findByIdAndUpdate(id, input, { new: true });
                return herramienta;
            } catch (error) {
                throw new Error(`Error al actualizar la herramienta: ${error.message}`);
            }
        },
        async deleteHerramienta(obj, { id }) {
            try{
                await Herramienta.findByIdAndDelete(id);
                return { message: 'Herramienta eliminada' };
            } catch (error) {
                throw new Error(`Error al eliminar la herramienta: ${error.message}`);
            }
        },
        async addMaterial(obj, { input }) {
            try{
                const material = new Material(input);
                await material.save();
                return material;
            } catch (error) {
                throw new Error(`Error al agregar el material: ${error.message}`);
            }
        },
        async updateMaterial(obj, { id, input }) {
            try{
                const material = await Material.findByIdAndUpdate(id, input, { new: true });
                return material;
            } catch (error) {
                throw new Error(`Error al actualizar el material: ${error.message}`);
            }
        },
        async deleteMaterial(obj, { id }) {
            try{
                await Material.findByIdAndDelete(id);
                return { message: 'Material eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el material: ${error.message}`);
            }
        },

        // Mutations geograficos
        async addSede(obj, { input }) {
            try{
            const sede = new Sede(input);
            await sede.save();
            return sede;
            } catch (error) {
                throw new Error(`Error al agregar la sede: ${error.message}`);
            }
        },
        async updateSede(obj, { id, input }) {
            try{
            const sede = await Sede.findByIdAndUpdate(id, input, { new: true });
            return sede;
            } catch (error) {
                throw new Error(`Error al actualizar la sede: ${error.message}`);
            }
        },
        async deleteSede(obj, { id }) {
            try{
            await Sede.findByIdAndDelete(id);
            return { message: 'Sede eliminada' };
            } catch (error) {
                throw new Error(`Error al eliminar la sede: ${error.message}`);
            }
        },
        async addComuna(obj, { input }) {
            try{
            const comuna = new Comuna(input);
            await comuna.save();
            return comuna;
            } catch (error) {
                throw new Error(`Error al agregar la comuna: ${error.message}`);
            }
        },
        async updateComuna(obj, { id, input }) {
            try{
            const comuna = await Comuna.findByIdAndUpdate(id, input, { new: true });
            return comuna;
            } catch (error) {
                throw new Error(`Error al actualizar la comuna: ${error.message}`);
            }
        },
        async deleteComuna(obj, { id }) {
            try{
            await Comuna.findByIdAndDelete(id);
            return { message: 'Comuna eliminada' };
            } catch (error) {
                throw new Error(`Error al eliminar la comuna: ${error.message}`);
            }
        },
        async addCiudad(obj, { input }) {
            try{
            const ciudad = new Ciudad(input);
            await ciudad.save();
            return ciudad;
            } catch (error) {
                throw new Error(`Error al agregar la ciudad: ${error.message}`);
            }
        },
        async updateCiudad(obj, { id, input }){
            try{
            const ciudad = await Ciudad.findByIdAndUpdate(id, input, { new: true });
            return ciudad;
            } catch (error) {
                throw new Error(`Error al actualizar la ciudad: ${error.message}`);
            }
        },
        async deleteCiudad(obj, { id }) {
            try{
            await Ciudad.findByIdAndDelete(id);
            return { message: 'Ciudad eliminada' };
            } catch (error) {
                throw new Error(`Error al eliminar la ciudad: ${error.message}`);
            }
        },
        async addRegion(obj, { input }) {
            try{
            const region = new Region(input);
            await region.save();
            return region;
            } catch (error) {
                throw new Error(`Error al agregar la region: ${error.message}`);
            }
        },
        async updateRegion(obj, { id, input }) {
            try{
            const region = await Region.findByIdAndUpdate(id, input, { new: true });
            return region;
            } catch (error) {
                throw new Error(`Error al actualizar la region: ${error.message}`);
            }
        },
        async deleteRegion(obj, { id }) {
            try{
            await Region.findByIdAndDelete(id);
            return { message: 'Region eliminada' };
            } catch (error) {
                throw new Error(`Error al eliminar la region: ${error.message}`);
            }
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
            try{
            await PrestamoEquipoE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el prestamo: ${error.message}`);
            }
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
            try{
            await PrestamoEquipoD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el prestamo: ${error.message}`);
            }
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
            try{
            const prestamo = await PrestamoHerramientaE.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
            } catch (error) {
                throw new Error(`Error al actualizar el prestamo: ${error.message}`);
            }
        },
        async deletePrestamoHerramientaE(obj, { id }) {
            try{
            await PrestamoHerramientaE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el prestamo: ${error.message}`);
            }
        },
        async addPrestamoHerramientaD(obj, { input }) {
            try{
            const prestamo = new PrestamoHerramientaD(input);
            await prestamo.save();
            return prestamo;
            } catch (error) {
                throw new Error(`Error al agregar el prestamo: ${error.message}`);
            }
        },
        async updatePrestamoHerramientaD(obj, { id, input }) {
            try{
            const prestamo = await PrestamoHerramientaD.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
            } catch (error) {
                throw new Error(`Error al actualizar el prestamo: ${error.message}`);
            }
        },
        async deletePrestamoHerramientaD(obj, { id }) {
            try{
            await PrestamoHerramientaD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el prestamo: ${error.message}`);
            }
        },
        async addPrestamoMaterialE(obj, { input }) {
            try{
            const prestamo = new PrestamoMaterialE(input);
            await prestamo.save();
            return prestamo;
            } catch (error) {
                throw new Error(`Error al agregar el prestamo: ${error.message}`);
            }
        },
        async updatePrestamoMaterialE(obj, { id, input }) {
            try{
            const prestamo = await PrestamoMaterialE.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
            } catch (error) {
                throw new Error(`Error al actualizar el prestamo: ${error.message}`);
            }
        },
        async deletePrestamoMaterialE(obj, { id }) {
            try{
            await PrestamoMaterialE.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el prestamo: ${error.message}`);
            }
        },
        async addPrestamoMaterialD(obj, { input }) {
            try{
            const prestamo = new PrestamoMaterialD(input);
            await prestamo.save();
            return prestamo;
            } catch (error) {
                throw new Error(`Error al agregar el prestamo: ${error.message}`);
            }
        },
        async updatePrestamoMaterialD(obj, { id, input }) {
            try{
            const prestamo = await PrestamoMaterialD.findByIdAndUpdate(id, input, { new: true });
            return prestamo;
            } catch (error) {
                throw new Error(`Error al actualizar el prestamo: ${error.message}`);
            }
        },
        async deletePrestamoMaterialD(obj, { id }) {
            try{
            await PrestamoMaterialD.findByIdAndDelete(id);
            return { message: 'Prestamo eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el prestamo: ${error.message}`);
            }
        },

        // Mutations de Usuarios
        async addEstudiante(parent, { input }) {
            try{
            const usuario = new Usuario(input.usuario);
            await usuario.save();
            const estudiante = new Estudiante({ ...input, usuario: usuario._id });
            await estudiante.save();
            return estudiante;
            } catch (error) {
                throw new Error(`Error al agregar el estudiante: ${error.message}`);
            }
        },
        async updateEstudiante(parent, { id, input }) {
            try{
            const estudiante = await Estudiante.findByIdAndUpdate(id, input, { new: true });
            return estudiante;
            } catch (error) {
                throw new Error(`Error al actualizar el estudiante: ${error.message}`);
            }
        },
        async deleteEstudiante(parent, { id }) {
            try{
            await Estudiante.findByIdAndDelete(id);
            return { message: 'Estudiante eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el estudiante: ${error.message}`);
            }
        },
        async addDocente(parent, { input }) {
            try{
            const usuario = new Usuario(input.usuario);
            await usuario.save();
            const docente = new Docente({ ...input, usuario: usuario._id });
            await docente.save();
            return docente;
            } catch (error) {
                throw new Error(`Error al agregar el docente: ${error.message}`);
            }
        },
        async updateDocente(parent, { id, input }) {
            try{
            const docente = await Docente.findByIdAndUpdate(id, input, { new: true });
            return docente;
            } catch (error) {
                throw new Error(`Error al actualizar el docente: ${error.message}`);
            }
        },
        async deleteDocente(parent, { id }) {
            try{
            await Docente.findByIdAndDelete(id);
            return { message: 'Docente eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el docente: ${error.message}`);
            }
        },
        
        // Mutations de Carreras
        async addCarrera(obj, { input }) {
            try{
            const carrera = new Carrera(input);
            await carrera.save();
            return carrera;
            } catch (error) {
                throw new Error(`Error al agregar la carrera: ${error.message}`);
            }
        },
        async updateCarrera(obj, { id, input }) {
            try{
            const carrera = await Carrera.findByIdAndUpdate(id, input, { new: true });
            return carrera;
            } catch (error) {
                throw new Error(`Error al actualizar la carrera: ${error.message}`);
            }
        },
        async deleteCarrera(obj, { id }) {
            try{
            await Carrera.findByIdAndDelete(id);
            return { message: 'Carrera eliminada' };
            } catch (error) {
                throw new Error(`Error al eliminar la carrera: ${error.message}`);
            }
        }
    }
};

module.exports = resolvers;