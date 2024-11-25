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
    origin: "http://localhost:5000",
    credentials: false
};

const app = express();
app.use(cors(), bodyParser.json());

app.post('/api/login', async (req, res) => {
    try {
      console.log('Recibiendo credenciales:', req.body);
      const { email, contrasena } = req.body;
      console.log('Email:', email);
      console.log('Contrasena:', contrasena);

      // Valida los datos recibidos
      if (!email || !contrasena) {
        return res.status(400).json({ error: 'Los 2 parametros son necesarios' });
      }
  
      const emailUsuario = new Usuario.find({'usuario.email': email});
      if (!emailUsuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const contrasenaUsuario = new Usuario.find({'usuario.contrasena': contrasena});
      if (!contrasenaUsuario) {
        return res.status(401).json({ error: 'Contrasena incorrecta' });
      }

      const token = 'tu_token_aqui'; // Generar un token JWT o similar
      res.json({ token });
      // Envía una respuesta de éxito
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
      res.status(500).json({ error: 'Error al agregar estudiante' });
    }
});

app.post('/api/docentes', async (req, res) => {
  try {
    const { usuario, ramo, escuela, sede } = req.body;

    // Validación básica
    if (!usuario || !ramo || !escuela || !sede) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Crear el nuevo docente
    const nuevoDocente = new Docente({
      usuario,
      ramo,
      escuela,
      sede,
    });

    await nuevoDocente.save();
    res.status(201).json(nuevoDocente); // Responder con el docente recién creado
  } catch (error) {
    console.error('Error al agregar el docente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/api/items', async (req, res) => {
  try {
    const { nombre, codigo, cantidad, tipo, sede } = req.body;

    // Validación básica
    if (!nombre || !codigo || !cantidad || !tipo || !sede) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Crear el nuevo item
    const nuevoItem = new Item({
      nombre,
      codigo,
      cantidad,
      tipo,
      sede
    });

    await nuevoItem.save();
    res.status(201).json(nuevoItem); // Responder con el item recién creado
  } catch (error) {
    console.error('Error al agregar el item:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/prestamos', async (req, res) => {
  try {
    const { cantidad, fecha, devolucion, entidad, item, sede } = req.body;

    // Validación básica
    if (!cantidad || !fecha || !devolucion || !entidad || !item || !sede) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Crear el nuevo préstamo
    const nuevoPrestamo = new Prestamo({
      cantidad,
      fecha,
      devolucion,
      entidad,
      item,
      sede,
    });

    await nuevoPrestamo.save();
    res.status(201).json(nuevoPrestamo); // Responder con el préstamo recién creado
  } catch (error) {
    console.error('Error al agregar el préstamo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
