import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authAPI } from '../services/api.ts';


const ProtectedRoute = () => {
    const [isValidating, setIsValidating] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const validateToken = async () => {
        try {
          await authAPI.validateToken(); // You'll need to implement this endpoint
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
        setIsValidating(false);
      };
  
      if (localStorage.getItem('authToken')) {
        validateToken();
      } else {
        setIsValidating(false);
      }
    }, []);
  
    if (isValidating) return <div>Loading...</div>;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  
export default ProtectedRoute;