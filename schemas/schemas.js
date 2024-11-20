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
        codigo: String!
        cantidad: Int!
        sede: Sede!
    }
    """ Definicion de input para Herramienta  """ 
    input HerramientaInput {
        nombre: String!
        codigo: String!
        cantidad: Int!
        sede: SedeInput!
    }

    """  Definicion de Material """ 
    type Material {
        id: ID!
        nombre: String!
        cantidad: Int!
        codigo: String!
        sede: Sede!
    }
    """ Definicion de input para Material  """ 
    input MaterialInput {
        nombre: String!
        cantidad: Int!
        codigo: String!
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

    type Query{
        """ Queries de Equipo  """ 
        getEquipos: [Equipo]
        getEquipo(id: ID!): Equipo
        getEquiposBySede(sede: String!): [Equipo]
    }
    type Mutation {
        """  Mutations de Equipo """ 
        addEquipo(input: EquipoInput): Equipo
        updateEquipo(id: ID!, input: EquipoInput): Equipo
        deleteEquipo(id: ID!): Alert
    }

`;

module.exports = typeDefs;