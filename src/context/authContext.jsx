import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceLogin } from 'src/services/authService';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    // Inicializar estado con datos persistidos
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    // Inicializar estado con el token persistido
    return localStorage.getItem('token') || null;
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Sincronizar `user` y `token` con `localStorage`
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = async (mail, password) => {
    try {
      const response = await serviceLogin(mail, password);
      
      // Guardar el token en el estado
      setToken(response.token);

      // Guardar la información del usuario en el estado
      setUser(response.user); // Usar la información del usuario retornada por serviceLogin
      console.log(response.user);
      // Redirigir según el rol (usando la información del usuario del estado)
      if (response.user.role === 'ADMIN') { // Acceder al rol del usuario
        navigate('/products');
      } else {
        navigate('/catalogue');
      }
      setError(null);
    } catch (err) {
      setError('Ha ocurrido un error'); 
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null); // Limpiar el token al cerrar sesión
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;