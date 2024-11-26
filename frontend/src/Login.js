import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ email: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando credenciales:', credenciales);
    try {
      const response = await axios.post('http://localhost:5000/api/login', credenciales);
      localStorage.setItem('token', response.data.token);
      navigate('/usuarios');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Correo"
          value={credenciales.email}
          onChange={(e) => setCredenciales({ ...credenciales, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={credenciales.contrasena}
          onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })}
          required
        />
        <button type="submit">Ingresar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;