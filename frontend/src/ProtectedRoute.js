import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol'); // Obtener el rol del usuario

  // Si no hay token o el rol no está permitido, redirigir al login
  if (!token || (requiredRoles.length > 0 && !requiredRoles.includes(rol))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;