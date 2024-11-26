const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

// Importar modelos
const { Usuario, Carrera, Sede, Item, Ciudad, Comuna, Region, Prestamo } = require('./models/modelSchemas');

// Resolver y tipo de esquemas
const resolvers = require('./schemas/resolvers');
const typeDefs = require('./schemas/schemas');

// Configuración de variables de entorno
dotenv.config();

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa con MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

// Opciones de CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"], // Permitir frontend y Apollo Sandbox
  credentials: true,
};

// Configurar express
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Middleware de autenticación (opcional para proteger rutas)
function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Acceso denegado. Token requerido.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    req.usuario = usuario;
    next();
  });
}

// Rutas de autenticación
app.post('/api/login', async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Validar contraseña
    if (contrasena !== usuario.contrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET, // Asegúrate de que tenga un valor
      { expiresIn: '5m' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Rutas de usuarios
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, rut, email, contrasena, telefono, rol } = req.body;
    console.log(req.body);
    if (!nombre || !rut || !email || !contrasena || !telefono || !rol) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      rut,
      email,
      contrasena,
      telefono,
      rol,
    });

    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.get('/api/usuarios', async (req, res) => {
  try {
    // Consulta la base de datos para obtener todos los usuarios
    const usuarios = await Usuario.find();

    // Devuelve la lista de usuarios como JSON
    res.status(200).json(usuarios);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener los usuarios:', error.message);
    res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
});

app.patch('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del usuario desde los parámetros de la URL
  const actualizaciones = req.body; // Obtenemos las actualizaciones desde el body de la solicitud

  try {
      // Verificamos que el usuario exista y actualizamos solo los campos enviados
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
          id, 
          { $set: actualizaciones }, // Solo actualizamos los campos enviados
          { new: true, runValidators: true } // Devolvemos el documento actualizado y validamos los datos
      );

      // Si no se encuentra el usuario, respondemos con un error
      if (!usuarioActualizado) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }

      // Respondemos con el usuario actualizado
      res.json(usuarioActualizado);
  } catch (error) {
      // Manejamos errores
      res.status(500).json({ mensaje: 'Error al actualizar el usuario.', error: error.message });
  }
});


// Rutas de Items y Préstamos (sin cambios sustanciales)
app.post('/api/items', autenticarToken, async (req, res) => {
  try {
    const { nombre, codigo, cantidad, tipo, sede } = req.body;

    if (!nombre || !codigo || !cantidad || !tipo || !sede) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const nuevoItem = new Item({
      nombre,
      codigo,
      cantidad,
      tipo,
      sede,
    });

    await nuevoItem.save();
    res.status(201).json(nuevoItem);
  } catch (error) {
    console.error('Error al agregar item:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.post('/api/prestamos', autenticarToken, async (req, res) => {
  try {
    const { cantidad, fecha, devolucion, entidad, item, sede } = req.body;

    if (!cantidad || !fecha || !devolucion || !entidad || !item || !sede) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const nuevoPrestamo = new Prestamo({
      cantidad,
      fecha,
      devolucion,
      entidad,
      item,
      sede,
    });

    await nuevoPrestamo.save();
    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    console.error('Error al agregar préstamo:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Configuración de Apollo Server
async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      let usuario = null;

      if (token) {
        try {
          usuario = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          console.warn('Token inválido:', error.message);
        }
      }
      return { usuario };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });
}
module.exports = app;
startServer();

app.listen(5000, () => {
  console.log('Servidor iniciado en http://localhost:5000');
});