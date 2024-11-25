const { get } = require('lodash');
const {Estudiante, Usuario, Docente, Carrera, Sede, Item, Ciudad, Comuna, Region, Prestamo} = require('../models/modelSchemas');
const { getEnterLeaveForKind } = require('graphql');

// Para borrar datos de prueba
async function deleteAll(model) {
    try {
        // Elimina todos los documentos de la colección
        const result = await model.deleteMany({});
        console.log(`Se han eliminado ${result.deletedCount} documentos de la colección.`);
        return result;
    } catch (error) {
        console.error("Error al eliminar los documentos:", error);
        throw new Error(`No se pudieron eliminar los documentos: ${error.message}`);
    }
}

//deleteAll(Usuario)

const resolvers = {
    Query: {
        // Querys de Items
        async getItems (obj) {
            try{
                const items = await Item.find().populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Items no encontrados: ${error.message}`);
            }
        },
        async getItem (obj, { id }) {
            try{
                const item = await Item.findById(id).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return item;
            } catch (error) {
                throw new Error(`Error: Item no encontrado: ${error.message}`);
            }
        },
        async getItemsByNombre (obj, { nombre }) {
            try{
                const items = await Item.find({nombre: nombre}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Nombre: ${error.message}`);
            }
        },
        async getItemByCodigo (obj, { codigo }) {
            try{
                const items = await Item.find({codigo: codigo}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Codigo: ${error.message}`);
            }
        },
        async getItemsByTipo (obj, { tipo }) {
            try{
                const items = await Item.find({tipo: tipo}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Tipo: ${error.message}`);
            }
        },
        async getItemsBySede (obj, { sede }) {
            try{
                const items = await Item.find({'sede.nombre': sede}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Sede: ${error.message}`);
            }
        },
        async getItemsByComuna (obj, { comuna }) {
            try{
                const items = await Item.find({'sede.comuna.nombre': comuna}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Comuna: ${error.message}`);
            }
        },
        async getItemsByCiudad (obj, { ciudad }) {
            try{
                const items = await Item.find({'sede.comuna.ciudad.nombre': ciudad}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: 'region', // Anidado hasta región
                        },
                    },
                });
                return items;
            } catch (error) {
                throw new Error(`Error: Ciudad: ${error.message}`);
            }
        },
        async getItemsByRegion (obj, { region }) {
            try{
                const regionExist = await Region.findOne({nombre: region});
                console.log(regionExist);
                const ciudadExist = await Ciudad.findOne({ 'region': regionExist._id });
                console.log(ciudadExist);
                const comunaExist = await Comuna.findOne({ 'ciudad': ciudadExist._id });
                console.log(comunaExist);
                const sedeExist = await Sede.findOne({ 'comuna': comunaExist._id });
                console.log(sedeExist);
                console.log(region);
                const item = await Item.find({'sede.comuna.ciudad.region.nombre': region});
                const items = await Item.find({'sede.comuna.ciudad.region.nombre': region}).populate({
                    path: 'sede',
                    populate: {
                        path: 'comuna',
                        populate: {
                            path: 'ciudad',
                            populate: {
                                path: 'region',
                                select: 'nombre'
                             },
                        },
                    },
                });
                console.log(items);
                console.log(item);
                return items;
            } catch (error) {
                throw new Error(`Error: Region: ${error.message}`);
            }
        },
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
        async getPrestamos (obj) {
            try{
                const prestamos = await Prestamo.find();
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Prestamos no encontrados: ${error.message}`);
            }
        },
        async getPrestamo (obj) {
            try{
                const prestamo = await Prestamo.findById(id);
                return prestamo;
            } catch (error) {
                throw new Error(`Error: Prestamo no encontrado: ${error.message}`);
            }
        },
        async getPrestamosByEntidad (obj, { tipo, referencia }) {
            try{
                const prestamos = await Prestamo.find({'entidad.tipo': tipo, 'entidad.referencia': referencia});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Entidad: ${error.message}`);
            }
        },
        async getPrestamosByItem (obj, { item }) {
            try{
                const prestamos = await Prestamo.find({'item.nombre': item});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Item: ${error.message}`);
            }
        },
        async getPrestamosBySede (obj, { sede }) {
            try{
                const prestamos = await Prestamo.find({'sede.nombre': sede});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Sede: ${error.message}`);
            }
        },
        async getPrestamosByFecha (obj, { fecha }) {
            try{
                const prestamos = await Prestamo.find({fecha: fecha});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Fecha: ${error.message}`);
            }
        },
        async getPrestamosByDevolucion (obj, { devolucion }) {
            try{
                const prestamos = await Prestamo.find({devolucion: devolucion});
                return prestamos;
            } catch (error) {
                throw new Error(`Error: Devolucion: ${error.message}`);
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
        async addItem (parent, { input }){
            try{
                const { nombre, codigo, cantidad, tipo, sede } = input;
        
                // Crear el nuevo item
                const newItem = new Item({
                nombre,
                codigo,
                cantidad,
                tipo,
                sede,
                });
        
                // Guardar en la base de datos
                const savedItem = await newItem.save();
        
                // Usar populate para obtener toda la información relacionada
                const populatedItem = await Item.findById(savedItem.id).populate({
                path: 'sede',
                populate: {
                    path: 'comuna',
                    populate: {
                    path: 'ciudad',
                    populate: 'region', // Anidado hasta región
                    },
                },
                });
        
                return populatedItem;
            } catch (error) {
                throw new Error(`Error al agregar el item: ${error.message}`);
            }
          },
        async updateItem(obj, { id, input }) {
            try{
                const item = await Item.findByIdAndUpdate(id, input, { new: true });
                return item;
            } catch (error) {
                throw new Error(`Error al actualizar el item: ${error.message}`);
            }
        },
        async deleteItem(obj, { id }) {
            try{
                await Item.findByIdAndDelete(id);
                return { message: 'Item eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el Item: ${error.message}`);
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
        async addPrestamo(parent, { input }) {
            try {
                // Crear el préstamo
                const prestamo = new Prestamo({
                    item: input.item,
                    cantidad: input.cantidad,
                    fecha: input.fecha,
                    devolucion: input.devolucion,
                    usuario: input.usuario,
                    sede: input.sede,
                });
        
                await prestamo.save();
        
                // Buscar el préstamo por ID y hacer el populate de estudiante y equipo
                const prestamoConDatos = await Prestamo.findById(prestamo._id)
                    .populate('usuario')  // Poblamos el campo estudiante
                    .populate('item')    // Poblamos el campo equipo
                    .populate('sede');     // Poblamos el campo sede

                // Convertir los ObjectId a cadenas si es necesario (GraphQL maneja bien los ObjectId como IDs)
                prestamoConDatos.id = prestamoConDatos._id.toString();
                prestamoConDatos.usuario.id = prestamoConDatos.usuario._id.toString();
                prestamoConDatos.item.id = prestamoConDatos.item._id.toString();
                prestamoConDatos.sede.id = prestamoConDatos.sede._id.toString();
        
                return prestamoConDatos;
            } catch (error) {
                throw new Error(`Error al agregar el préstamo: ${error.message}`);
            }
        },
        async updatePrestamo(parent, { id, input }) {
            try {
                const { cantidad, fecha, devolucion, entidad, item, sede } = input;
        
                // Buscar el préstamo existente
                const prestamoExistente = await Prestamo.findById(id);
                if (!prestamoExistente) {
                    throw new Error("El préstamo no existe.");
                }
        
                // Validar fechas
                if (new Date(devolucion) <= new Date(fecha)) {
                    throw new Error("La fecha de devolución debe ser posterior a la fecha de préstamo.");
                }
        
                // Ajustar la cantidad del ítem si cambia la cantidad del préstamo
                if (cantidad !== prestamoExistente.cantidad) {
                    const itemExistente = await Item.findById(item);
                    const diferencia = cantidad - prestamoExistente.cantidad;
        
                    if (itemExistente.cantidad + diferencia < 0) {
                        throw new Error("No hay suficiente cantidad disponible para ajustar el préstamo.");
                    }
        
                    itemExistente.cantidad -= diferencia;
                    await itemExistente.save();
                }
        
                // Actualizar los datos del préstamo
                prestamoExistente.cantidad = cantidad;
                prestamoExistente.fecha = fecha;
                prestamoExistente.devolucion = devolucion;
                prestamoExistente.entidad = entidad;
                prestamoExistente.item = item;
                prestamoExistente.sede = sede;
        
                await prestamoExistente.save();
                return prestamoExistente;
            } catch (error) {
                throw new Error(`Error al actualizar el préstamo: ${error.message}`);
            }
        },
        async returnPrestamo(parent, { id }) {
            try {
                // Buscar el préstamo por ID
                const prestamoExistente = await Prestamo.findById(id);
                if (!prestamoExistente) {
                    throw new Error("El préstamo no existe.");
                }
        
                // Buscar el ítem asociado al préstamo
                const itemExistente = await Item.findById(prestamoExistente.item);
                if (!itemExistente) {
                    throw new Error("El ítem asociado al préstamo no existe.");
                }
        
                // Incrementar la cantidad del ítem
                itemExistente.cantidad += prestamoExistente.cantidad;
                await itemExistente.save();
        
                return { message: "Devolución registrada correctamente." };
            } catch (error) {
                throw new Error(`Error al registrar la devolución: ${error.message}`);
            }
        },        
        async deletePrestamo(parent, { id }) {
            try {
                // Buscar el préstamo existente
                const prestamoExistente = await Prestamo.findById(id);
                if (!prestamoExistente) {
                    throw new Error("El préstamo especificado no existe.");
                }
        
                // Devolver la cantidad al ítem
                const itemExistente = await Item.findById(prestamoExistente.item);
                if (itemExistente) {
                    itemExistente.cantidad += prestamoExistente.cantidad;
                    await itemExistente.save();
                }
        
                // Eliminar el préstamo
                await Prestamo.findByIdAndDelete(id);
        
                return { message: "Préstamo eliminado correctamente." };
            } catch (error) {
                throw new Error(`Error al eliminar el préstamo: ${error.message}`);
            }
        },
        // Mutations de Usuarios
        async addEstudiante(parent, { input }) {
            try {
                // Verifica que el ID del usuario exista en la colección de usuarios
                const usuarioExistente = await Usuario.findById(input.usuario);
                if (!usuarioExistente) {
                    throw new Error('El usuario proporcionado no existe.');
                }
        
                // Crea el estudiante, asociando el ID del usuario proporcionado
                const estudiante = new Estudiante({ ...input, usuario: input.usuario });
                await estudiante.save();
        
                // Devuelve el estudiante con los datos del usuario populados
                const estudianteConUsuario = await Estudiante.findById(estudiante._id).populate('usuario').populate('carrera');
                return estudianteConUsuario;
        
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

            const docenteConUsuario = await Docente.findById(docente._id).populate('usuario');
            return docenteConUsuario;

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
        
        async addUsuario(parent, { input }) {
            try{
            const usuario = new Usuario(input);
            await usuario.save();
            return usuario;
            } catch (error) {
                throw new Error(`Error al agregar el usuario: ${error.message}`);
            }
        },
        async updateUsuario(parent, { id, input }) {
            try{
            const usuario = await Usuario.findByIdAndUpdate(id, input, { new: true });
            return usuario;
            } catch (error) {
                throw new Error(`Error al actualizar el usuario: ${error.message}`);
            }
        },

        async deleteUsuario(parent, { id }) {
            try{
            await Usuario.findByIdAndDelete(id);
            return { message: 'Usuario eliminado' };
            } catch (error) {
                throw new Error(`Error al eliminar el usuario: ${error.message}`);
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
        },

    }
};

module.exports = resolvers;