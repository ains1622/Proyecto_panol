const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const{ ApolloServer } = require('apollo-server-express');
const {Estudiante, Usuario, Docente, Carrera, Sede, Item, Ciudad, Comuna, Region, Prestamo} = require('./models/modelSchemas');
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

const app = express();
app.use(cors(), bodyParser.json());

app.post('/api/estudiantes', async (req, res) => {
    try {
      const { usuario, carrera } = req.body;
  
      // Valida los datos recibidos
      if (!usuario || !carrera) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }
  
      const nuevoUsuario = new Usuario(usuario);
      await nuevoUsuario.save();

      // Crea un nuevo estudiante con los datos recibidos
      const nuevoEstudiante = new Estudiante({
        usuario: nuevoUsuario._id,
        carrera: carrera
      });
  
      // Guarda el estudiante en la base de datos
      await nuevoEstudiante.save();
  
      // Envía una respuesta de éxito
      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
      res.status(500).json({ error: 'Error al agregar estudiante' });
    }
});

async function startServer(){
    const apolloServer = new ApolloServer({ typeDefs, resolvers, corsOptions });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });
}

startServer();

app.listen(5000, function(){
    console.log('Servidor iniciado en http://localhost:5000');
});
