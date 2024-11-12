import { Password } from '@mui/icons-material';
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
