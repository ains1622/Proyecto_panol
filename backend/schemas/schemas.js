const { gql } = require("apollo-server-express");

const typeDefs = gql`
      
    #Alerta para mensajes de error o exito 
     
    type Alert {
        message: String
    }
    
    #DEFINICIONES DE OBJETOS
    
      
    #Definicion de Item 
     
    type Item{
        id: ID!
        nombre: String!
        codigo: Int!
        cantidad: Int!
        tipo: String!
        sede: Sede
    }
      
    #Definicion de input para Item
      
    input ItemInput {
        nombre: String!
        codigo: Int!
        cantidad: Int!
        tipo: String!
        sede: ID!
    }
    #DEFINICIONES GEOGRAFICAS
     
    #Sede  
     
    type Sede {
        id: ID!
        nombre: String!
        direccion: String!
        comuna: Comuna!
    }
    input SedeInput {
        nombre: String!
        direccion: String!
        comuna: ID!
    }
     
    #Comuna 
     
    type Comuna {
        id: ID!
        nombre: String!
        ciudad: Ciudad!
    }
    input ComunaInput {
        nombre: String!
        ciudad: ID!
    }
     
    #Ciudad  
     
    type Ciudad {
        id: ID!
        nombre: String!
        region: Region!
    }
    input CiudadInput {
        nombre: String!
        region: ID!
    }
      
    #Region 
     
    type Region {
        id: ID!
        nombre: String!
    }
    input RegionInput {
        nombre: String!
    }

    
    #Definicion para Prestamo 
    
    type Prestamo{
        id: ID!
        cantidad: Int!
        fecha: String!
        devolucion: String!
        usuario: Usuario!
        item: Item!
        sede: Sede!
    }
      
    #Definicion para input de Prestamo 
    
    input PrestamoInput{
        cantidad: Int!
        fecha: String!
        devolucion: String!
        usuario: ID!
        item: ID!
        sede: ID!
    }
    #DEFINICIONES DE USUARIOS
    
    #Definicion de Usuario
    type  Usuario {
        id: ID!
        nombre: String!
        rut: String!
        email: String!
        contrasena: String!
        telefono: String!
        rol: String!
    }
    
    #Definicion de input para Usuario
    
    input UsuarioInput {
        nombre: String!
        rut: String!
        email: String!
        contrasena: String!
        telefono: String!
        rol: String!
    }
    
    #Definicion de UsuarioF
    
    type UsuarioF {
        id: ID!
        usuario: Usuario!
        carrera: Carrera!
    }
    
    #Definicion de input para UsuarioF
    
    input UsuarioFInput {
        usuario: ID!
        carrera: ID!
    }
    
    #DEFINICIONES DE CARRERAS
    
    
    #Definicion de Carrera
    
    type Carrera {
        id: ID!
        nombre: String!
        escuela: String!
        sede: Sede!
    }
    
    #Definicion de input para Carrera
    
    input CarreraInput {
        nombre: String!
        escuela: String!
        sede: ID!
    }

    type Query{
         
        #QUERIES DE Item  
        
        getItem(id: ID!): Item
        getItems: [Item]
        getItemsByTipo(tipo: String!): [Item]
        getItemById(id: ID!): Item
        getItemsBySede(sede: String!): [Item]
        getItemsByTipoYSede(tipo: String!, sede: String!): [Item!]!
        getItemsByTipoYComuna(tipo: String!, comuna: String!): [Item]
        getItemsByTipoYCiudad(tipo: String!, ciudad: String!): [Item]
        getItemsByTipoYRegion(tipo: String!, region: String!): [Item]
        getItemsByNombre(nombre: String!): [Item]
        getItemByCodigo(codigo: Int!): Item
        #QUERIES GEOGRAFICAS 
        
        #Queries de Sede 
        
        getSedes: [Sede]
        getSede(id: ID!): Sede
        getSedesByComuna(comuna: String!): [Sede]
        getSedeByNombre(nombre: String!): Sede
         
        #Queries de Comuna 
        
        getComunas: [Comuna]
        getComuna(id: ID!): Comuna
        getComunasByCiudad(ciudad: String!): [Comuna]
        getComunaByNombre(nombre: String!): Comuna
         
        #Queries de Ciudad 
        
        getCiudades: [Ciudad]
        getCiudad(id: ID!): Ciudad
        getCiudadesByRegion(region: String!): [Ciudad]
        getCiudadByNombre(nombre: String!): Ciudad
         
        #Queries de Region 
        
        getRegiones: [Region]
        getRegion(id: ID!): Region
        getRegionByNombre(nombre: String!): Region
         
        #QUERIES DE PRESTAMO
        
        getPrestamosByEntidad(tipo: String!, referencia: ID!): [Prestamo]
        getPrestamosByItem(nombre: String!): [Prestamo]
        getPrestamosBySede(sede: String!): [Prestamo]
        getPrestamosByFecha(fecha: String!): [Prestamo]
        getPrestamosByDevolucion(devolucion: String!): [Prestamo]
        getPrestamo(id: ID!): Prestamo
        getPrestamos: [Prestamo]

        #QUERIES DE USUARIOS 
        
        #Queries de UsuarioF 
        
        getUsuarioFs: [UsuarioF]
        getUsuarioF(id: ID!): UsuarioF
        getUsuarioFsByCarrera(carrera: String!): [UsuarioF]
        getUsuarioFsByNombre(nombre: String!): [UsuarioF]
        getUsuarioFByRut(rut: String!): UsuarioF
         
        #Queries de usuarios
        
        getUsuarios: [Usuario]
        getUsuario(id: ID!): Usuario
        getUsuariosByNombre(nombre: String!): [Usuario]
        getUsuariosBySede(sede: String!): [Usuario]
         
        #QUERIES DE CARRERA
        
        getCarreras: [Carrera]
        getCarrera(id: ID!): Carrera
        getCarrerasByEscuela(escuela: String!): [Carrera]
        getCarrerasByNombre(nombre: String!): [Carrera]
        getCarrerasBySede(sede: String!): [Carrera]
    }
    type Mutation {
        #Mutations de Item
         
        addItem(input: ItemInput): Item
        updateItem(id: ID!, input: ItemInput): Item
        deleteItem(id: ID!): Alert
           
        #MUTATIONS GEOGRAFICOS 
        
         
        #Mutations de Sede 
        
        addSede(input: SedeInput): Sede
        updateSede(id: ID!, input: SedeInput): Sede
        deleteSede(id: ID!): Alert
         
        #Mutations de Comuna 
        
        addComuna(input: ComunaInput): Comuna
        updateComuna(id: ID!, input: ComunaInput): Comuna
        deleteComuna(id: ID!): Alert
         
        #Mutations de Ciudad 
        
        addCiudad(input: CiudadInput): Ciudad
        updateCiudad(id: ID!, input: CiudadInput): Ciudad
        deleteCiudad(id: ID!): Alert
         
        #Mutations de Region 
        
        addRegion(input: RegionInput): Region
        updateRegion(id: ID!, input: RegionInput): Region
        deleteRegion(id: ID!): Alert
         
        #MUTATIONS DE PRESTAMO 

        addPrestamo(input: PrestamoInput): Prestamo
        updatePrestamo(id: ID!, input: PrestamoInput): Prestamo
        returnPrestamo(id: ID!): Prestamo
        deletePrestamo(id: ID!): Alert
         
        #MUTATIONS DE USUARIOS 

        #Mutations de UsuarioF 
        
        addUsuarioF(input: UsuarioFInput): UsuarioF
        updateUsuarioF(id: ID!, input: UsuarioFInput): UsuarioF
        deleteUsuarioF(id: ID!): Alert

        #Mutations de Usuario

        addUsuario(input: UsuarioInput): Usuario
        updateUsuario(id: ID!, input: UsuarioInput): Usuario
        deleteUsuario(id: ID!): Alert

        #Mutations de Carrera 
        
        addCarrera(input: CarreraInput): Carrera
        updateCarrera(id: ID!, input: CarreraInput): Carrera
        deleteCarrera(id: ID!): Alert
    }
`;

module.exports = typeDefs;