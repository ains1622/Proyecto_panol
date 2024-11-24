import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  // Estado para manejar la opción seleccionada
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [formData, setFormData] = useState({
    usuario:{
      nombre: '',
      rut: '',
      email: '',
      telefono: ''
    },
    carrera: {
      nombre: '',
      escuela: '',
      // LLeva sede
    },
    sede: {
      nombre: '',
      direccion: '',
      comuna: '',
    },
    item: {
      nombre: '',
      codigo: '',
      cantidad: '',
      tipo: '',
      // LLeva sede
    },
    docente: {
      ramo: '',
      escuela: ''
    },
    prestamo: {
      cantidad: '',
      fecha: '',
      devolucion: '',
      entidad: {
        tipo: '',
        referencia: ''
      }
    }
    // Estudiante compo de usuario y carrera
  });

  // Maneja el cambio de los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Divide el "name" en partes si es jerárquico (e.g., usuario.nombre)
    const keys = name.split('.');
  
    setFormData((prevData) => {
      let data = { ...prevData }; // Clona el estado actual
      let ref = data; // Puntero para navegar dentro del objeto
  
      // Recorre las claves hasta la última
      for (let i = 0; i < keys.length - 1; i++) {
        if (!ref[keys[i]]) ref[keys[i]] = {}; // Si no existe, inicialízalo
        ref = ref[keys[i]]; // Navega hacia el siguiente nivel
      }
  
      // Asigna el valor al último nivel
      ref[keys[keys.length - 1]] = value;
      return data; // Retorna la copia modificada
    });
  };
  

  // Maneja la selección de la opción
  const handleOptionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
    setFormData({
      usuario:{
        nombre: '',
        rut: '',
        email: '',
        telefono: ''
      },
      carrera: {
        nombre: '',
        escuela: '',
        // LLeva sede
      },
      sede: {
        nombre: '',
        direccion: '',
        comuna: '',
      },
      item: {
        nombre: '',
        codigo: '',
        cantidad: '',
        tipo: '',
        // LLeva sede
      },
      docente: {
        ramo: '',
        escuela: ''
      },
      prestamo: {
        cantidad: '',
        fecha: '',
        devolucion: '',
        entidad: {
          tipo: '',
          referencia: ''
        }
      }
      // Estudiante compo de usuario y carrera
    }); // Resetear campos del formulario
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recarga de página)
  
    try {
      // Define la URL del endpoint del backend donde enviarás los datos
      let endpoint = '';
  
      // Dependiendo de la opción seleccionada, el endpoint cambiará
      if (opcionSeleccionada === 'estudiante') {
        endpoint = 'http://localhost:5000/api/estudiantes'; // Cambia esta URL al endpoint correcto de tu API
      } else if (opcionSeleccionada === 'docente') {
        endpoint = 'http://localhost:5000/api/docentes'; // Endpoint para docentes
      } else if (opcionSeleccionada === 'prestamo') {
        endpoint = 'http://localhost:5000/api/prestamos'; // Endpoint para prestamos
      } else if (opcionSeleccionada === 'item') {
        endpoint = 'http://localhost:5000/api/items'; // Endpoint para items
      }
  
      // Realiza la solicitud POST para enviar los datos al backend
      const response = await axios.post(endpoint, formData);
  
      // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
      console.log('Datos enviados:', response.data);
      alert(`${opcionSeleccionada} agregado exitosamente!`);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al enviar los datos.');
    }
  };
  

  return (
    <div>
      <h1>Formulario Dinámico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="opcion">Selecciona lo que quieres agregar:</label>
          <select id="opcion" value={opcionSeleccionada} onChange={handleOptionChange}>
            <option value="">--Selecciona una opción--</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="prestamo">Prestamo</option>
            <option value="item">Item</option>
          </select>
        </div>

        {opcionSeleccionada && (
          <div>
            <h2>Agregar {opcionSeleccionada.charAt(0).toUpperCase() + opcionSeleccionada.slice(1)}</h2>
            
                   {/* Opcion Estudiante */}

            {opcionSeleccionada === 'estudiante' && (
              <>
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="usuario.nombre"
                    value={formData.usuario.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="rut">RUT:</label>
                  <input
                    type="text"
                    id="rut"
                    name="usuario.rut"
                    value={formData.usuario.rut || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="usuario.email"
                    value={formData.usuario.email || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefono">Telefono:</label>
                  <input
                    type="text"
                    id="telefono"
                    name="usuario.telefono"
                    value={formData.usuario.telefono || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre">Nombre Carrera:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="carrera.nombre"
                    value={formData.carrera.nombre || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="escuela">Escuela Carrera:</label>
                  <input
                    type="text"
                    id="escuela"
                    name="carrera.escuela"
                    value={formData.carrera.escuela || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre">Nombre Sede:</label>
                  <input
                    type="text"
                    id="sede"
                    name="sede.nombre"
                    value={formData.sede.nombre || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="direccion">Direccion Sede:</label>
                  <input
                    type="text"
                    id="direccion"
                    name="sede.direccion"
                    value={formData.sede.direccion || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comuna">Nombre Comuna:</label>
                  <input
                    type="text"
                    id="comuna"
                    name="sede.comuna"
                    value={formData.sede.comuna || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

                  {/* Opcion Docente */}

            {opcionSeleccionada === 'docente' && (
              <>
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="usuario.nombre"
                    value={formData.usuario.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="rut">RUT:</label>
                  <input
                    type="text"
                    id="rut"
                    name="usuario.rut"
                    value={formData.usuario.rut || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="usuario.email"
                    value={formData.usuario.email || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefono">Telefono:</label>
                  <input
                    type="text"
                    id="telefono"
                    name="usuario.telefono"
                    value={formData.usuario.telefono || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ramo">Ramo:</label>
                  <input
                    type="text"
                    id="ramo"
                    name="docente.ramo"
                    value={formData.docente.ramo || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="escuela">Escuela:</label>
                  <input
                    type="text"
                    id="escuela"
                    name="docente.escuela"
                    value={formData.docente.escuela || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre">Nombre Sede:</label>
                  <input
                    type="text"
                    id="sede"
                    name="sede.nombre"
                    value={formData.sede.nombre || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="direccion">Direccion Sede:</label>
                  <input
                    type="text"
                    id="direccion"
                    name="sede.direccion"
                    value={formData.sede.direccion || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comuna">Nombre Comuna:</label>
                  <input
                    type="text"
                    id="comuna"
                    name="sede.comuna"
                    value={formData.sede.comuna || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

                  {/* Opcion Prestamo */}

            {opcionSeleccionada === 'prestamo' && (
              <>
                <div>
                  <label htmlFor="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="prestamo.cantidad"
                    value={formData.prestamo.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="fecha">Fecha:</label>
                  <input
                    type="text"
                    id="fecha"
                    name="prestamo.fecha"
                    value={formData.prestamo.fecha || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="devolucion">Devolucion:</label>
                  <input
                    type="text"
                    id="devolucion"
                    name="prestamo.devolucion"
                    value={formData.prestamo.devolucion || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tipo">Entidad tipo:</label>
                  <input
                    type="text"
                    id="tipo"
                    name="prestamo.entidad.tipo"
                    value={formData.prestamo.entidad.tipo || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre">Nombre Item:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="item.nombre"
                    value={formData.item.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="codigo">Codigo Item:</label>
                  <input
                    type="number"
                    id="codigo"
                    name="item.codigo"
                    value={formData.item.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cantidad">Cantidad Item:</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="item.cantidad"
                    value={formData.item.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tipo">Tipo Item:</label>
                  <input
                    type="text"
                    id="tipo"
                    name="item.tipo"
                    value={formData.item.tipo || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre">Nombre Sede:</label>
                  <input
                    type="text"
                    id="sede"
                    name="sede.nombre"
                    value={formData.sede.nombre || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="direccion">Direccion Sede:</label>
                  <input
                    type="text"
                    id="direccion"
                    name="sede.direccion"
                    value={formData.sede.direccion || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comuna">Nombre Comuna:</label>
                  <input
                    type="text"
                    id="comuna"
                    name="sede.comuna"
                    value={formData.sede.comuna || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

                  {/* Opcion Item */}

            {opcionSeleccionada === 'item' && (
              <>
                <div>
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="item.nombre"
                    value={formData.item.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="codigo">Codigo:</label>
                  <input
                    type="number"
                    id="codigo"
                    name="item.codigo"
                    value={formData.item.codigo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cantidad">Cantidad:</label>
                  <input
                    type="number"
                    id="cantidad"
                    name="item.cantidad"
                    value={formData.item.cantidad}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tipo">Tipo:</label>
                  <input
                    type="text"
                    id="tipo"
                    name="item.tipo"
                    value={formData.item.tipo || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nombre">Nombre Sede:</label>
                  <input
                    type="text"
                    id="sede"
                    name="sede.nombre"
                    value={formData.sede.nombre || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="direccion">Direccion Sede:</label>
                  <input
                    type="text"
                    id="direccion"
                    name="sede.direccion"
                    value={formData.sede.direccion || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comuna">Nombre Comuna:</label>
                  <input
                    type="text"
                    id="comuna"
                    name="sede.comuna"
                    value={formData.sede.comuna || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <button type="submit">Enviar</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;