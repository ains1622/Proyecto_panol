import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const App = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const camposPorOpcion = {
    estudiante: [
      { name: 'nombre', label: 'Nombre', type: 'text' },
      { name: 'rut', label: 'RUT', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telefono', label: 'Telefono', type: 'text' },
      { name: 'carreraNombre', label: 'Nombre Carrera', type: 'text' },
      { name: 'carreraEscuela', label: 'Escuela Carrera', type: 'text' },
      { name: 'sedeNombre', label: 'Nombre Sede', type: 'text' },
      { name: 'sedeDireccion', label: 'Dirección Sede', type: 'text' },
      { name: 'sedeComuna', label: 'Nombre Comuna', type: 'text' },
    ],
    docente: [
      { name: 'nombre', label: 'Nombre', type: 'text' },
      { name: 'rut', label: 'RUT', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'telefono', label: 'Telefono', type: 'text' },
      { name: 'docenteRamo', label: 'Ramo', type: 'text' },
      { name: 'docenteEscuela', label: 'Escuela', type: 'text' },
      { name: 'sedeNombre', label: 'Nombre Sede', type: 'text' },
      { name: 'sedeDireccion', label: 'Dirección Sede', type: 'text' },
      { name: 'sedeComuna', label: 'Nombre Comuna', type: 'text' },
    ],
    prestamo: [
      { name: 'prestamoCantidad', label: 'Cantidad', type: 'number' },
      { name: 'prestamoFecha', label: 'Fecha', type: 'date' },
      { name: 'prestamoDevolucion', label: 'Devolución', type: 'date' },
      { name: 'prestamoEntidadTipo', label: 'Entidad Tipo', type: 'text' },
      { name: 'prestamoEntidadReferencia', label: 'Referencia', type: 'text' },
    ],
    item: [
      { name: 'itemNombre', label: 'Nombre', type: 'text' },
      { name: 'itemCodigo', label: 'Código', type: 'number' },
      { name: 'itemCantidad', label: 'Cantidad', type: 'number' },
      { name: 'itemTipo', label: 'Tipo', type: 'text' },
      { name: 'sedeNombre', label: 'Nombre Sede', type: 'text' },
      { name: 'sedeDireccion', label: 'Dirección Sede', type: 'text' },
      { name: 'sedeComuna', label: 'Nombre Comuna', type: 'text' },
    ],
  };

  const validationSchemas = {
    estudiante: Yup.object({
      nombre: Yup.string().required('Nombre es obligatorio'),
      rut: Yup.string().required('RUT es obligatorio'),
      email: Yup.string().email('Email no válido').required('Email es obligatorio'),
      telefono: Yup.string().required('Teléfono es obligatorio'),
      carreraNombre: Yup.string().required('Nombre de carrera es obligatorio'),
      carreraEscuela: Yup.string().required('Escuela de carrera es obligatoria'),
      sedeNombre: Yup.string().required('Nombre de sede es obligatorio'),
      sedeDireccion: Yup.string().required('Dirección de sede es obligatoria'),
      sedeComuna: Yup.string().required('Comuna de sede es obligatoria'),
    }),
    docente: Yup.object({
      nombre: Yup.string().required('Nombre es obligatorio'),
      rut: Yup.string().required('RUT es obligatorio'),
      email: Yup.string().email('Email no válido').required('Email es obligatorio'),
      telefono: Yup.string().required('Teléfono es obligatorio'),
      docenteRamo: Yup.string().required('Ramo es obligatorio'),
      docenteEscuela: Yup.string().required('Escuela es obligatoria'),
      sedeNombre: Yup.string().required('Nombre de sede es obligatorio'),
      sedeDireccion: Yup.string().required('Dirección de sede es obligatoria'),
      sedeComuna: Yup.string().required('Comuna de sede es obligatoria'),
    }),
    prestamo: Yup.object({
      prestamoCantidad: Yup.number().required('Cantidad es obligatoria').positive('Debe ser un número positivo'),
      prestamoFecha: Yup.date().required('Fecha es obligatoria'),
      prestamoDevolucion: Yup.date().required('Fecha de devolución es obligatoria'),
      prestamoEntidadTipo: Yup.string().required('Tipo de entidad es obligatorio'),
      prestamoEntidadReferencia: Yup.string().required('Referencia es obligatoria'),
    }),
    item: Yup.object({
      itemNombre: Yup.string().required('Nombre de item es obligatorio'),
      itemCodigo: Yup.number().required('Código de item es obligatorio').positive('Debe ser un número positivo'),
      itemCantidad: Yup.number().required('Cantidad de item es obligatoria').positive('Debe ser un número positivo'),
      itemTipo: Yup.string().required('Tipo de item es obligatorio'),
      sedeNombre: Yup.string().required('Nombre de sede es obligatorio'),
      sedeDireccion: Yup.string().required('Dirección de sede es obligatoria'),
      sedeComuna: Yup.string().required('Comuna de sede es obligatoria'),
    }),
  };

  const handleSubmit = async (values) => {
    const endpoint = {
      estudiante: 'http://localhost:5000/api/estudiantes',
      docente: 'http://localhost:5000/api/docentes',
      prestamo: 'http://localhost:5000/api/prestamos',
      item: 'http://localhost:5000/api/items',
    }[opcionSeleccionada];

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(endpoint, values);
      console.log('Datos enviados:', response.data);
      alert(`${opcionSeleccionada} agregado exitosamente!`);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('Hubo un error al enviar los datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Formulario Dinámico</h1>
      <form>
        <div>
          <label htmlFor="opcion">Selecciona lo que quieres agregar:</label>
          <select id="opcion" value={opcionSeleccionada} onChange={(e) => setOpcionSeleccionada(e.target.value)}>
            <option value="">--Selecciona una opción--</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="prestamo">Prestamo</option>
            <option value="item">Item</option>
          </select>
        </div>

        {opcionSeleccionada && (
          <Formik
            initialValues={Object.fromEntries(camposPorOpcion[opcionSeleccionada].map((campo) => [campo.name, '']))}
            validationSchema={validationSchemas[opcionSeleccionada]}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <h2>Agregar {opcionSeleccionada.charAt(0).toUpperCase() + opcionSeleccionada.slice(1)}</h2>
                {camposPorOpcion[opcionSeleccionada].map((campo) => (
                  <div key={campo.name}>
                    <label htmlFor={campo.name}>{campo.label}:</label>
                    <Field type={campo.type} id={campo.name} name={campo.name} />
                    <ErrorMessage name={campo.name} component="div" style={{ color: 'red' }} />
                  </div>
                ))}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={isSubmitting || isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </form>
    </div>
  );
};

export default App;
