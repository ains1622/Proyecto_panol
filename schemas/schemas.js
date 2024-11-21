const { gql } = require("apollo-server-express");

const typeDefs = gql`
    """  Alerta para mensajes de error o exito """ 
    type Alert {
        message: String
    }

    """DEFINICIONES DE OBJETOS"""

    """  Definicion de Equipo """ 
    type Equipo {
        id: ID!
        nombre: String!
        codigo: Int!
        cantidad: Int!
        sede: Sede!
    }
    """  Definicion de input para Equipo """ 
    input EquipoInput {
        nombre: String!
        codigo: Int!
        cantidad: Int!
        sede: SedeInput!
    }

    """ Definicion de Herramienta  """ 
    type Herramienta {
        id: ID!
        nombre: String!
        codigo: Int!
        cantidad: Int!
        sede: Sede!
    }
    """ Definicion de input para Herramienta  """ 
    input HerramientaInput {
        nombre: String!
        codigo: Int!
        cantidad: Int!
        sede: SedeInput!
    }

    """  Definicion de Material """ 
    type Material {
        id: ID!
        nombre: String!
        cantidad: Int!
        codigo: Int!
        sede: Sede!
    }
    """ Definicion de input para Material  """ 
    input MaterialInput {
        nombre: String!
        cantidad: Int!
        codigo: Int!
        sede: SedeInput!
    }

    """DEFINICIONES GEOGRAFICAS""" 

    """ Sede  """ 
    type Sede {
        id: ID!
        nombre: String!
        direccion: String!
        comuna: Comuna!
    }
    input SedeInput {
        nombre: String!
        direccion: String!
        comuna: ComunaInput!
    }
    """  Comuna """ 
    type Comuna {
        id: ID!
        nombre: String!
        ciudad: Ciudad!
    }
    input ComunaInput {
        nombre: String!
        ciudad: CiudadInput!
    }
    """ Ciudad  """ 
    type Ciudad {
        id: ID!
        nombre: String!
        region: Region!
    }
    input CiudadInput {
        nombre: String!
        region: RegionInput!
    }
    """  Region """ 
    type Region {
        id: ID!
        nombre: String!
    }

    """ DEFINICIONES PARA PRESTAMOS """

    """  Definicion para Prestamo """
    type Prestamo{
        id: ID!
        cantidad: Int!
        fecha: String!
        devolucion: String!
    }
    """  Definicion para input de Prestamo """
    input PrestamoInput{
        cantidad: Int!
        fecha: String!
        devolucion: String!
    }
    """ Prestamo Equipo Estudiante"""
    type PrestamoEquipoE {
        id: ID!
        estudiante: Estudiante!
        prestamo: Prestamo!
        sede: Sede!
        equipo: Equipo!
    }
    """ input para Prestamo Equipo Estudiante """
    input PrestamoEquipoEInput {
        estudiante: EstudianteInput!
        prestamo: PrestamoInput!
        sede: SedeInput!
        equipo: EquipoInput!
    }
    """ Prestamo Equipo Docente"""
    type PrestamoEquipoD {
        id: ID!
        docente: Docente!
        prestamo: Prestamo!
        sede: Sede!
        equipo: Equipo!
        escuela: String!
        ramo: String!
    }
    """ input para Prestamo Equipo Docente """
    input PrestamoEquipoDInput {
        docente: DocenteInput!
        prestamo: PrestamoInput!
        sede: SedeInput!
        equipo: EquipoInput!
        escuela: String!
        ramo: String!
    }
    """ Prestamo Herramienta Estudiante"""
    type PrestamoHerramientaE {
        id: ID!
        estudiante: Estudiante!
        prestamo: Prestamo!
        sede: Sede!
        herramienta: Herramienta!
    }
    """ input para Prestamo Herramienta Estudiante """
    input PrestamoHerramientaEInput {
        estudiante: EstudianteInput!
        prestamo: PrestamoInput!
        sede: SedeInput!
        herramienta: HerramientaInput!
    }
    """ Prestamo Herramienta Docente"""
    type PrestamoHerramientaD {
        id: ID!
        docente: Docente!
        prestamo: Prestamo!
        sede: Sede!
        herramienta: Herramienta!
        escuela: String!
        ramo: String!
    }
    """ input para Prestamo Herramienta Docente """
    input PrestamoHerramientaDInput {
        docente: DocenteInput!
        prestamo: PrestamoInput!
        sede: SedeInput!
        herramienta: HerramientaInput!
        escuela: String!
        ramo: String!
    }
    """ Prestamo Material Estudiante"""
    type PrestamoMaterialE {
        id: ID!
        estudiante: Estudiante!
        prestamo: Prestamo!
        sede: Sede!
        material: Material!
    }
    """ input para Prestamo Material Estudiante """
    input PrestamoMaterialEInput {
        estudiante: EstudianteInput!
        prestamo: PrestamoInput!
        sede: SedeInput!
        material: MaterialInput!
    }
    """ Prestamo Material Docente"""
    type PrestamoMaterialD {
        id: ID!
        docente: Docente!
        prestamo: Prestamo!
        sede: Sede!
        material: Material!
        escuela: String!
        ramo: String!
    }
    """ input para Prestamo Material Docente """
    input PrestamoMaterialDInput {
        escuela: String!
        docente: DocenteInput!
        prestamo: PrestamoInput!
        sede: SedeInput!
        material: MaterialInput!
        escuela: String!
        ramo: String!
    }

    """DEFINICIONES DE USUARIOS"""

    """Definicion de Usuario"""
    type  Usuario {
        id: ID!
        nombre: String!
        rut: String!
        email: String!
        telefono: String!
    }
    """Definicion de input para Usuario"""
    input UsuarioInput {
        nombre: String!
        rut: String!
        email: String!
        telefono: String!
    }
    """Definicion de Estudiante"""
    type Estudiante {
        id: ID!
        usuario: Usuario!
        carrera: Carrera!
    }
    """Definicion de input para Estudiante"""
    input EstudianteInput {
        usuario: UsuarioInput!
        carrera: CarreraInput!
    }
    """Definicion de Docente"""
    type Docente {
        id: ID!
        usuario: Usuario!
        sede: Sede!
        escuela: String!
        ramo: String!
    }
    """Definicion de input para Docente"""
    input DocenteInput {
        usuario: UsuarioInput!
        sede: SedeInput!
        escuela: String!
        ramo: String!
    }

    """DEFINICIONES DE CARRERAS"""
    """Definicion de Carrera"""
    type Carrera {
        id: ID!
        nombre: String!
        escuela: String!
        sede: Sede!
    }
    """Definicion de input para Carrera"""
    input CarreraInput {
        nombre: String!
        escuela: String!
        sede: SedeInput!
    }

    union PrestamosEquiposUnion = PrestamosEquiposE | PrestamosEquiposD
    union PrestamosHerramientasUnion = PrestamosHerramientasE | PrestamosHerramientasD
    union PrestamosMaterialesUnion = PrestamosMaterialesE | PrestamosMaterialesD

    union UsuariosUnion = Estudiante | Docente
    type Query{

        """ QUERIES DE OBJETOS """
        """ Queries de Equipo  """ 
        getEquipos: [Equipo]
        getEquipo(id: ID!): Equipo
        getEquiposBySede(sede: String!): [Equipo]
        getEquiposByComuna(comuna: String!): [Equipo]
        getEquiposByNombre(nombre: String!): [Equipo]
        getEquipoByCodigo(codigo: Int!): Equipo

        """ Queries de Herramienta  """
        getHerramientas: [Herramienta]
        getHerramienta(id: ID!): Herramienta
        getHerramientasBySede(sede: String!): [Herramienta]
        getHerramientasByComuna(comuna: String!): [Herramienta]
        getHerramientasByNombre(nombre: String!): [Herramienta]
        getHerramientaByCodigo(codigo: Int!): Herramienta

        """ Queries de Material  """
        getMateriales: [Material]
        getMaterial(id: ID!): Material
        getMaterialesBySede(sede: String!): [Material]
        getMaterialesByComuna(comuna: String!): [Material]
        getMaterialesByNombre(nombre: String!): [Material]
        getMaterialByCodigo(codigo: Int!): Material

        """ QUERIES GEOGRAFICAS """
        """ Queries de Sede """
        getSedes: [Sede]
        getSede(id: ID!): Sede
        getSedesByComuna(comuna: String!): [Sede]
        getSedeByNombre(nombre: String!): Sede

        """ Queries de Comuna """
        getComunas: [Comuna]
        getComuna(id: ID!): Comuna
        getComunasByCiudad(ciudad: String!): [Comuna]
        getComunaByNombre(nombre: String!): Comuna

        """ Queries de Ciudad """
        getCiudades: [Ciudad]
        getCiudad(id: ID!): Ciudad
        getCiudadesByRegion(region: String!): [Ciudad]
        getCiudadByNombre(nombre: String!): Ciudad

        """ Queries de Region """
        getRegiones: [Region]
        getRegion(id: ID!): Region
        getRegionByNombre(nombre: String!): Region

        """ QUERIES DE PRESTAMOS """
        """ Queries de Prestamo Equipo """
        getPrestamosEquipos: [PrestamosEquiposUnion]
        getPrestamosByNombreEquipo(nombre: String!): [PrestamosEquiposUnion]
        getPrestamosByCodigoEquipo(codigo: Int!): [PrestamosEquiposUnion]
        getPrestamosEquipoByEstudiante(estudiante: String!): [PrestamoEquipoE]
        getPrestamosEquipoByDocente(docente: String!): [PrestamoEquipoD]

        """ Queries de Prestamo Herramienta """
        getPrestamosHerramientas: [PrestamosHerramientasUnion]
        getPrestamosByNombreHerramienta(nombre: String!): [PrestamosHerramientasUnion]
        getPrestamosByCodigoHerramienta(codigo: Int!): [PrestamosHerramientasUnion]
        getPrestamosHerramientaByEstudiante(estudiante: String!): [PrestamoHerramientaE]
        getPrestamosHerramientaByDocente(docente: String!): [PrestamoHerramientaD]

        """ Queries de Prestamo Material """
        getPrestamosMateriales: [PrestamosMaterialesUnion]
        getPrestamosByNombreMaterial(nombre: String!): [PrestamosMaterialesUnion]
        getPrestamosByCodigoMaterial(codigo: Int!): [PrestamosMaterialesUnion]
        getPrestamosMaterialByEstudiante(estudiante: String!): [PrestamoMaterialE]
        getPrestamosMaterialByDocente(docente: String!): [PrestamoMaterialD]

        """ QUERIES DE USUARIOS """
        """ Queries de Estudiante """
        getEstudiantes: [Estudiante]
        getEstudiante(id: ID!): Estudiante
        getEstudiantesByCarrera(carrera: String!): [Estudiante]
        getEstudiantesByNombre(nombre: String!): [Estudiante]
        getEstudianteByRut(rut: String!): Estudiante

        """ Queries de Docente """
        getDocentes: [Docente]
        getDocente(id: ID!): Docente
        getDocentesByEscuela(escuela: String!): [Docente]
        getDocentesByNombre(nombre: String!): [Docente]
        getDocentesByRamo(ramo: String!): [Docente]
        getDocenteByRut(rut: String!): Docente

        """ Queries de usuarios"""
        getUsuarios: [UsuariosUnion]
        getUsuario(id: ID!): UsuariosUnion
        getUsuariosByNombre(nombre: String!): [UsuariosUnion]
        getUsuariosBySede(sede: String!): [UsuariosUnion]

        """ QUERIES DE CARRERAS """
        """ Queries de Carrera """
        getCarreras: [Carrera]
        getCarrera(id: ID!): Carrera
        getCarrerasByEscuela(escuela: String!): [Carrera]
        getCarrerasByNombre(nombre: String!): [Carrera]
        getCarrerasBySede(sede: String!): [Carrera]

    }
    type Mutation {
        """ MUTATIONS DE OBJETOS """

        """  Mutations de Equipo """ 
        addEquipo(input: EquipoInput): Equipo
        updateEquipo(id: ID!, input: EquipoInput): Equipo
        deleteEquipo(id: ID!): Alert
        """ Mutations de Herramienta """
        addHerramienta(input: HerramientaInput): Herramienta
        updateHerramienta(id: ID!, input: HerramientaInput): Herramienta
        deleteHerramienta(id: ID!): Alert
        """ Mutations de Material """
        addMaterial(input: MaterialInput): Material
        updateMaterial(id: ID!, input: MaterialInput): Material
        deleteMaterial(id: ID!): Alert

        """ MUTATIONS GEOGRAFICOS """

        """ Mutations de Sede """
        addSede(input: SedeInput): Sede
        updateSede(id: ID!, input: SedeInput): Sede
        deleteSede(id: ID!): Alert
        """ Mutations de Comuna """
        addComuna(input: ComunaInput): Comuna
        updateComuna(id: ID!, input: ComunaInput): Comuna
        deleteComuna(id: ID!): Alert
        """ Mutations de Ciudad """
        addCiudad(input: CiudadInput): Ciudad
        updateCiudad(id: ID!, input: CiudadInput): Ciudad
        deleteCiudad(id: ID!): Alert
        """ Mutations de Region """
        addRegion(input: RegionInput): Region
        updateRegion(id: ID!, input: RegionInput): Region
        deleteRegion(id: ID!): Alert

        """ MUTATIONS DE PRESTAMOS """

        """ Mutations de Prestamo Equipo Estudiante """
        addPrestamoEquipoE(input: PrestamoEquipoEInput): PrestamoEquipoE
        updatePrestamoEquipoE(id: ID!, input: PrestamoEquipoEInput): PrestamoEquipoE
        deletePrestamoEquipoE(id: ID!): Alert
        """ Mutations de Prestamo Equipo Docente """
        addPrestamoEquipoD(input: PrestamoEquipoDInput): PrestamoEquipoD
        updatePrestamoEquipoD(id: ID!, input: PrestamoEquipoDInput): PrestamoEquipoD
        deletePrestamoEquipoD(id: ID!): Alert
        """ Mutations de Prestamo Herramienta Estudiante """
        addPrestamoHerramientaE(input: PrestamoHerramientaEInput): PrestamoHerramientaE
        updatePrestamoHerramientaE(id: ID!, input: PrestamoHerramientaEInput): PrestamoHerramientaE
        deletePrestamoHerramientaE(id: ID!): Alert
        """ Mutations de Prestamo Herramienta Docente """
        addPrestamoHerramientaD(input: PrestamoHerramientaDInput): PrestamoHerramientaD
        updatePrestamoHerramientaD(id: ID!, input: PrestamoHerramientaDInput): PrestamoHerramientaD
        deletePrestamoHerramientaD(id: ID!): Alert
        """ Mutations de Prestamo Material Estudiante """
        addPrestamoMaterialE(input: PrestamoMaterialEInput): PrestamoMaterialE
        updatePrestamoMaterialE(id: ID!, input: PrestamoMaterialEInput): PrestamoMaterialE
        deletePrestamoMaterialE(id: ID!): Alert
        """ Mutations de Prestamo Material Docente """
        addPrestamoMaterialD(input: PrestamoMaterialDInput): PrestamoMaterialD
        updatePrestamoMaterialD(id: ID!, input: PrestamoMaterialDInput): PrestamoMaterialD
        deletePrestamoMaterialD(id: ID!): Alert

        """ MUTATIONS DE USUARIOS """
        """ Mutations de Estudiante """
        addEstudiante(input: EstudianteInput): Estudiante
        updateEstudiante(id: ID!, input: EstudianteInput): Estudiante
        deleteEstudiante(id: ID!): Alert
        """ Mutations de Docente """
        addDocente(input: DocenteInput): Docente
        updateDocente(id: ID!, input: DocenteInput): Docente
        deleteDocente(id: ID!): Alert

        """ Mutations de Carrera """
        addCarrera(input: CarreraInput): Carrera
        updateCarrera(id: ID!, input: CarreraInput): Carrera
        deleteCarrera(id: ID!): Alert
    }

`;

module.exports = typeDefs;