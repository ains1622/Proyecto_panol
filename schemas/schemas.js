const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Alert {
        message: String
    }
    type Equipo {
        id: ID!
        nombre: String!
        estado: String!
    }
    input EquipoInput {
        nombre: String!
        estado: String!
    }
    type Query{
        getEquipos: [Equipo]
        getEquipo(id: ID!): Equipo
    }
    type Mutation {
        addEquipo(input: EquipoInput): Equipo
        updateEquipo(id: ID!, input: EquipoInput): Equipo
        deleteEquipo(id: ID!): Alert
    }
`;

module.exports = typeDefs;