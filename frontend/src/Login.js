import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from './mockUsers'; // Importa los datos simulados

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Puede ser correo o usuario
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Busca si coincide con usuario o correo
    const user = mockUsers.find(
      (user) =>
        (user.username === identifier || user.email === identifier) &&
        user.password === password
    );    
    
    console.log('Identifier:', identifier);
    console.log('Password:', password);
    console.log('User found:', user);
    

    if (user) {
      // Simula el almacenamiento de un token
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('userRole', user.role);
      navigate('/dashboard');
      console.log('User token:', localStorage.getItem('token'));
    } else {
      setError('Usuario/Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label">Usuario o Correo</label>
          <input
            type="text"
            id="identifier"
            className="form-control"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
};

export default Login;