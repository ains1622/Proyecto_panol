import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserManagement = ({ userRole }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [accion, setAccion] = useState(''); // Puede ser 'agregarUsuario', 'cambiarContraseña' o 'editarPerfil'
  const [mensajeExito, setMensajeExito] = useState('');
  console.log('El user role es:', userRole);

  useEffect(() => {
    const mockUsuarios = [
      { id: 1, rut: '12345678-9', apellido1: 'Pérez', apellido2: 'Gómez', nombre1: 'Admin', carrera: '', telefono: '', email: 'admin@domain.com', rol: 'SuperAdmin', constraseña: 'admin123' },
      { id: 2, rut: '87654321-0', apellido1: 'López', apellido2: 'Martínez', nombre1: 'Juan', carrera: 'Ingeniería', telefono: '987654321', email: 'juan@domain.com', rol: 'Alumno', contraseña: 'juan123' },
      { id: 3, rut: '11223344-5', apellido1: 'Rodríguez', apellido2: 'Hernández', nombre1: 'María', carrera: 'Arquitectura', telefono: '123456789', email: 'maria@domain.com', rol: 'Docente', contraseña: 'maria123' },
    ];
    setUsuarios(mockUsuarios);
  }, []);

  const validationSchemaPerfil = Yup.object({
    rut: Yup.string().required('El RUT es obligatorio'),
    apellido1: Yup.string().required('El primer apellido es obligatorio'),
    apellido2: Yup.string(),
    nombre1: Yup.string().required('El primer nombre es obligatorio'),
    carrera: Yup.string(),
    telefono: Yup.string(),
    email: Yup.string().email('Debe ser un correo válido').required('El correo es obligatorio'),
    rol: Yup.string().required('Debe seleccionar un rol'),
  });

  const validationSchemaPassword = Yup.object({
    passwordActual: Yup.string().when('rol', {
      is: () => userRole !== 'SuperAdmin',
      then: Yup.string().required('Debe ingresar su contraseña actual'),
      otherwise: Yup.string().notRequired(),
    }),
    nuevaPassword: Yup.string()
      .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
      .required('Debe ingresar la nueva contraseña'),
    confirmarPassword: Yup.string()
      .oneOf([Yup.ref('nuevaPassword'), null], 'Las contraseñas no coinciden')
      .required('Debe confirmar la nueva contraseña'),
  });

  const handlePerfilSubmit = (values, { resetForm }) => {
    if (accion === 'agregarUsuario') {
      const nuevoUsuario = { ...values, id: Date.now() }; // ID simulado
      setUsuarios((prev) => [...prev, nuevoUsuario]);
    } else {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuarioSeleccionado.id ? { ...u, ...values } : u))
      );
    }

    setMensajeExito('¡Acción realizada correctamente!');
    resetForm();
    setUsuarioSeleccionado(null);
    setAccion('');
  };

  const handlePasswordSubmit = (values, { resetForm }) => {
    setMensajeExito('¡La contraseña ha sido cambiada exitosamente!');
    resetForm();
  };

  const seleccionarUsuario = (usuario, accionSeleccionada) => {
    setUsuarioSeleccionado(usuario);
    setAccion(accionSeleccionada);
    setMensajeExito('');
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container">
        <h1 className="text-center text-primary mb-4">Gestión de Usuarios</h1>

        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-success"
            onClick={() => {
              setUsuarioSeleccionado(null);
              setAccion('agregarUsuario');
              setMensajeExito('');
            }}
          >
            Agregar Usuario
          </button>
        </div>

        {(accion === 'agregarUsuario' || accion === 'editarPerfil') && (
          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <h5 className="card-title text-center text-info mb-4">
                {accion === 'agregarUsuario' ? 'Agregar Usuario' : `Editar Perfil de ${usuarioSeleccionado.nombre1}`}
              </h5>
              <Formik
                initialValues={{
                  rut: usuarioSeleccionado?.rut || '',
                  apellido1: usuarioSeleccionado?.apellido1 || '',
                  apellido2: usuarioSeleccionado?.apellido2 || '',
                  nombre1: usuarioSeleccionado?.nombre1 || '',
                  carrera: usuarioSeleccionado?.carrera || '',
                  telefono: usuarioSeleccionado?.telefono || '',
                  email: usuarioSeleccionado?.email || '',
                  rol: usuarioSeleccionado?.rol || '',
                }}
                validationSchema={validationSchemaPerfil}
                onSubmit={handlePerfilSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="rut" className="form-label">RUT (Sin puntos ni guión)</label>
                        <Field type="text" id="rut" name="rut" className="form-control" />
                        <ErrorMessage name="rut" component="div" className="text-danger" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="apellido1" className="form-label">Primer Apellido</label>
                        <Field type="text" id="apellido1" name="apellido1" className="form-control" />
                        <ErrorMessage name="apellido1" component="div" className="text-danger" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="apellido2" className="form-label">Segundo Apellido</label>
                        <Field type="text" id="apellido2" name="apellido2" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="nombre1" className="form-label">Primer Nombre</label>
                        <Field type="text" id="nombre1" name="nombre1" className="form-control" />
                        <ErrorMessage name="nombre1" component="div" className="text-danger" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="carrera" className="form-label">Carrera</label>
                        <Field type="text" id="carrera" name="carrera" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <Field type="text" id="telefono" name="telefono" className="form-control" />
                      </div>
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Correo</label>
                        <Field type="email" id="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting}
                      >
                        {accion === 'agregarUsuario' ? 'Agregar Usuario' : 'Guardar Cambios'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {accion === 'cambiarContraseña' && (
          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <h5 className="card-title text-center text-success mb-4">
                Cambiar Contraseña de {usuarioSeleccionado.nombre1}
              </h5>
              <Formik
                initialValues={{
                  passwordActual: '',
                  nuevaPassword: '',
                  confirmarPassword: '',
                }}
                validationSchema={validationSchemaPassword}
                onSubmit={handlePasswordSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {userRole !== 'SuperAdmin' && (
                      <div className="mb-3">
                        <label htmlFor="passwordActual" className="form-label">Contraseña Actual</label>
                        <Field type="password" id="passwordActual" name="passwordActual" className="form-control" />
                        <ErrorMessage name="passwordActual" component="div" className="text-danger" />
                      </div>
                    )}
                    <div className="mb-3">
                      <label htmlFor="nuevaPassword" className="form-label">Nueva Contraseña</label>
                      <Field type="password" id="nuevaPassword" name="nuevaPassword" className="form-control" />
                      <ErrorMessage name="nuevaPassword" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmarPassword" className="form-label">Confirmar Contraseña</label>
                      <Field type="password" id="confirmarPassword" name="confirmarPassword" className="form-control" />
                      <ErrorMessage name="confirmarPassword" component="div" className="text-danger" />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={isSubmitting}
                      >
                        Cambiar Contraseña
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        <div className="row">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">{usuario.nombre1} {usuario.apellido1}</h5>
                  <p className="card-text">
                    <strong>RUT:</strong> {usuario.rut} <br />
                    <strong>Correo:</strong> {usuario.email} <br />
                    <strong>Rol:</strong> {usuario.rol}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => seleccionarUsuario(usuario, 'editarPerfil')}
                    >
                      Editar Perfil
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => seleccionarUsuario(usuario, 'cambiarContraseña')}
                    >
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mensajeExito && <div className="alert alert-success mt-4">{mensajeExito}</div>}
      </div>
    </div>
  );
};

export default UserManagement;