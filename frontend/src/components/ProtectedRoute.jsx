import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  // Check custom authentication state from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('user_email');

  if (!isAuthenticated || !userEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
}; 