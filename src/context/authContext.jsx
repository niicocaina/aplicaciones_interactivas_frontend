import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serviceLogin } from 'src/services/authService';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Mantener el estado user
  const [token, setToken] = useState(null); // Agregar estado para el token
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (mail, password) => {
    try {
      const response = await serviceLogin(mail, password);

      // Guardar el token en el estado
      setToken(response.token);

      // Guardar la información del usuario en el estado
      setUser(response.user); // Usar la información del usuario retornada por serviceLogin

      // Redirigir según el rol (usando la información del usuario del estado)
      if (response.user.role === 'ADMIN') { // Acceder al rol del usuario
        navigate('/products');
      } else {
        navigate('/catalogue');
      }
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

/*import { Password } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { serviceLogin } from 'src/services/authService';
import { createContext, useState, Children } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (mail, password) => {
    try {
      const response = await serviceLogin(mail, password);
      const userData = response;
      if (userData.length === 0) {
        setError('Usuario o contraseña incorrectos');
        return;
      }
      setUser(userData[0]);
      if (userData[0].role === 'ADMIN') {
        navigate('/products');
        return;
      } else {
        navigate('/catalogue');
      }
    } catch (err) {
      setError('Ha ocurrido un error');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
*/