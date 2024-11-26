import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [recursos, setRecursos] = useState([]);

  const initialValues = {
    nombre: '',
    codigo: '',
    cantidad: '',
    tipo: '',
    estado: 'disponible', // Por defecto, el recurso está disponible.
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    codigo: Yup.string().required('El código es obligatorio'),
    cantidad: Yup.number()
      .positive('Debe ser un número positivo')
      .required('La cantidad es obligatoria'),
    tipo: Yup.string().required('El tipo es obligatorio'),
  });

  const fetchRecursos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/recursos');
      setRecursos(response.data);
    } catch (error) {
      console.error('Error al obtener los recursos:', error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/recursos', values);
      setSuccessMessage('Recurso agregado exitosamente.');
      resetForm();
      fetchRecursos(); // Actualiza la lista de recursos.
    } catch (error) {
      setError('Error al agregar el recurso.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEstadoCambio = async (codigo, nuevoEstado) => {
    try {
      await axios.patch(`http://localhost:5000/api/recursos/${codigo}`, { estado: nuevoEstado });
      fetchRecursos(); // Actualiza la lista de recursos tras cambiar estado.
    } catch (error) {
      console.error('Error al actualizar el estado del recurso:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Gestión de Inventario de Pañol</h1>

      {/* Formulario de registro */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Registrar Nuevo Recurso</h5>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <Field type="text" id="nombre" name="nombre" className="form-control" />
                    <ErrorMessage name="nombre" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="codigo" className="form-label">Código</label>
                    <Field type="text" id="codigo" name="codigo" className="form-control" />
                    <ErrorMessage name="codigo" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <Field type="number" id="cantidad" name="cantidad" className="form-control" />
                    <ErrorMessage name="cantidad" component="div" className="text-danger" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <Field type="text" id="tipo" name="tipo" className="form-control" />
                    <ErrorMessage name="tipo" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? 'Enviando...' : 'Registrar Recurso'}
                  </button>
                </div>
                {error && <div className="text-danger mt-3">{error}</div>}
                {successMessage && <div className="text-success mt-3">{successMessage}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Lista de recursos */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Inventario de Recursos</h5>
          <button className="btn btn-outline-primary mb-3" onClick={fetchRecursos}>
            Cargar Recursos
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recursos.map((recurso) => (
                <tr key={recurso.codigo}>
                  <td>{recurso.nombre}</td>
                  <td>{recurso.codigo}</td>
                  <td>{recurso.cantidad}</td>
                  <td>{recurso.tipo}</td>
                  <td>{recurso.estado}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleEstadoCambio(recurso.codigo, 'disponible')}
                    >
                      Disponible
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEstadoCambio(recurso.codigo, 'no disponible')}
                    >
                      No Disponible
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;