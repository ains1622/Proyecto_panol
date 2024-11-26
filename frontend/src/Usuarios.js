import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserManagement = ({ userRole }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [accion, setAccion] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const token = localStorage.getItem('token'); // Token de autenticación

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  // Obtener usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axiosInstance.get('/usuarios');
        setUsuarios(response.data);
        //console.log('id:', response.data[0]._id);
        //console.log para ver la id del usuario
      } catch (error) {
        console.error(error);
        setMensajeError('Error al obtener los usuarios.');
      }
    };
    fetchUsuarios();
  }, [axiosInstance]);
  // Validación del formulario de perfil
  const validationSchemaPerfil = Yup.object({
    rut: Yup.string().required('El RUT es obligatorio'),
    nombre: Yup.string().required('El nombre completo es obligatorio'),
    carrera: Yup.string(),
    telefono: Yup.string(),
    email: Yup.string().email('Debe ser un correo válido').required('El correo es obligatorio'),
    rol: Yup.string().required('Debe seleccionar un rol'),
    contrasena: Yup.string(),
  });

  // Enviar datos del formulario de perfil
  const handlePerfilSubmit = async (values, { resetForm }) => {
    try {
      // Si la contraseña está vacía, que sea el rut
      if (!values.contrasena) {
        values.contrasena = values.rut;
      }
      
      if (accion === 'agregarUsuario') {
        await axiosInstance.post('/usuarios', values); // Crear nuevo usuario
        console.log('Usuario creado:', values);
      } else {
        await axiosInstance.put(`/usuarios/${usuarioSeleccionado.id}`, values); // Editar usuario
      }

      const response = await axiosInstance.get('/usuarios'); // Recargar lista de usuarios
      setUsuarios(response.data);

      setMensajeExito('¡Acción realizada correctamente!');
      resetForm();
      setAccion('');
      setUsuarioSeleccionado(null);
    } catch (error) {
      setMensajeError('Error al guardar los datos.');
    }
  };

  // Función para manejar la edición de un usuario
  const handleEditUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setAccion('editarPerfil'); // Cambia la acción para mostrar el formulario de edición
    setMensajeExito('');
    setMensajeError('');
  };

  // Función para manejar el cambio de contraseña
  const handleChangePassword = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setAccion('cambiarContrasena'); // Establece la acción para mostrar el formulario de cambio de contraseña
    setMensajeExito('');
    setMensajeError('');
  };

  const handleChangePasswordSubmit = async (values) => {
    try {
      await axiosInstance.put(`/usuarios/${usuarioSeleccionado.id}/contrasena`, {
        contrasena: values.contrasena,
      });
      setMensajeExito('Contraseña cambiada correctamente');
      setAccion('');
      setUsuarioSeleccionado(null);
    } catch (error) {
      setMensajeError('Error al cambiar la contraseña.');
    }
  };  


  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <h1 className="text-center text-primary mb-4">Gestión de Usuarios</h1>

        {/* Botón para agregar usuario */}
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-success"
            onClick={() => {
              setUsuarioSeleccionado(null);
              setAccion('agregarUsuario'); // Establece la acción
              setMensajeExito('');
              setMensajeError('');
            }}
          >
            Agregar Usuario
          </button>
        </div>

        {/* Mensajes de éxito y error */}
        {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
        {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

        {/* Formulario para agregar/editar usuario */}
        {(accion === 'agregarUsuario' || accion === 'editarPerfil') && (
          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <h5 className="card-title text-center text-info mb-4">
              {accion === 'agregarUsuario' && 'Agregar Usuario'}
              {accion === 'editarPerfil' && `Editar Perfil de ${usuarioSeleccionado?.nombre}`}
              {accion === 'cambiarContrasena' && `Cambiar Contraseña de ${usuarioSeleccionado?.nombre}`}
              </h5>

              {/* Formulario para Agregar o Editar Perfil */}
              {accion === 'agregarUsuario' || accion === 'editarPerfil' ? (
                <Formik
                  initialValues={{
                    rut: usuarioSeleccionado?.rut || '',
                    nombre: usuarioSeleccionado?.nombre || '',
                    carrera: usuarioSeleccionado?.carrera || '',
                    telefono: usuarioSeleccionado?.telefono || '',
                    email: usuarioSeleccionado?.email || '',
                    rol: usuarioSeleccionado?.rol || '',
                    contrasena: usuarioSeleccionado?.contrasena || '',
                  }}
                  validationSchema={validationSchemaPerfil}
                  onSubmit={handlePerfilSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Campos del formulario */}
                      <div className="mb-3">
                        <label htmlFor="rut" className="form-label">
                          RUT
                        </label>
                        <Field type="text" name="rut" className="form-control" />
                        <ErrorMessage name="rut" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                          Nombre Completo
                        </label>
                        <Field type="text" name="nombre" className="form-control" />
                        <ErrorMessage name="nombre" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="carrera" className="form-label">
                          Carrera
                        </label>
                        <Field type="text" name="carrera" className="form-control" />
                        <ErrorMessage name="carrera" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">
                          Teléfono
                        </label>
                        <Field type="text" name="telefono" className="form-control" />
                        <ErrorMessage name="telefono" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Correo
                        </label>
                        <Field type="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="rol" className="form-label">
                          Rol
                        </label>
                        <Field as="select" name="rol" className="form-select">
                          <option value="">Seleccionar...</option>
                          <option value="SuperAdmin">Jefe de Carrera</option>
                          <option value="Panolero">Pañolero</option>
                          <option value="CoordinadorCarrera">Coordinador de Carrera</option>
                          <option value="UsuarioF">Docente/Estudiante</option>
                        </Field>
                        <ErrorMessage name="rol" component="div" className="text-danger" />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {accion === 'agregarUsuario' ? 'Agregar Usuario' : 'Guardar Cambios'}
                        </button>
                      </div>
                    </Form>
                  )}
              </Formik>
              ) : null}
            </div>
          </div>
        )}

        {accion === 'cambiarContrasena' && (
          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <h5 className="card-title text-center text-info mb-4">Cambiar Contraseña de {usuarioSeleccionado?.nombre}</h5>
              <Formik
                initialValues={{
                  contrasena: '', // Solo la nueva contraseña
                }}
                validationSchema={Yup.object({
                  contrasena: Yup.string().required('La contraseña es obligatoria'),
                })}
                onSubmit={handleChangePasswordSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="contrasena" className="form-label">Nueva Contraseña</label>
                      <Field type="password" name="contrasena" className="form-control" />
                      <ErrorMessage name="contrasena" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Cambiar Contraseña
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {/* Lista de usuarios */}
        <div className="row">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {usuario.nombre}
                  </h5>
                  <p className="card-text">
                    <strong>RUT:</strong> {usuario.rut} <br />
                    <strong>Correo:</strong> {usuario.email} <br />
                    <strong>Rol:</strong> {usuario.rol}
                  </p>

                  {/* Botones de Editar y Cambiar Contraseña */}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditUsuario(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => handleChangePassword(usuario)}
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;