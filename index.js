const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const{ ApolloServer } = require('apollo-server-express');
//const {graphqlExpress, graphqlExpress} = require('graphql-server-express');
//const{makeExecutableSchema} = require('graphql-tools');

const { merge } = require('lodash');

const resolvers = require('./schemas/resolvers');
const typeDefs = require('./schemas/schemas');
// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa con MongoDB Atlas'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

let apolloServer = null;

const corsOptions = {
    origin: "http://localhost:8080",
    credentials: false
};

async function startServer(){
    const apolloServer = new ApolloServer({ typeDefs, resolvers, corsOptions });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });
}

startServer();

const app = express();
app.use(cors());
app.listen(8080, function(){
    console.log('Servidor iniciado en http://localhost:8080');
});
