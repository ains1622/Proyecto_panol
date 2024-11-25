import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ usuario: '', contraseña: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(
      (user) =>
        user.correo === credenciales.usuario &&
        user.contraseña === credenciales.contraseña
    );
    
    console.log(usuarios);

    if (usuarioEncontrado) {
      // Almacenar el token y el rol en el localStorage
      localStorage.setItem('token', JSON.stringify({ rut: usuarioEncontrado.rut }));
      localStorage.setItem('rol', usuarioEncontrado.rol); // Almacenar el rol del usuario

      // Redirigir a la página de Dashboard
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo"
          value={credenciales.usuario}
          onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={credenciales.contraseña}
          onChange={(e) => setCredenciales({ ...credenciales, contraseña: e.target.value })}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;