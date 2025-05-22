import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper: get token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Helper: set token to localStorage
  const setToken = (token) => localStorage.setItem('token', token);

  // Helper: remove token
  const removeToken = () => localStorage.removeItem('token');

  // Axios instance with Authorization header
  const authAxios = axios.create();
  authAxios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getToken();
      if (!token) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      try {
        const response = await authAxios.get('/api/user/me');
        setCurrentUser(response.data);
      } catch (err) {
        console.error('Auth check error:', err);
        setCurrentUser(null);
        removeToken();
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
    // eslint-disable-next-line
  }, []);

  // Login function
  const login = async (email, password, rememberMe = false) => {
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password, rememberMe });
      setToken(response.data.token);
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    }
  };

  // Register function
  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', userData);
      setToken(response.data.token);
      setCurrentUser(response.data.user);
      return response.data;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    removeToken();
    setCurrentUser(null);
    navigate('/login');
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}