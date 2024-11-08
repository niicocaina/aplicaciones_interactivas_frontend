import axios from 'axios';

export const serviceLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/login', { email, password });
    return response;  
  } catch (error) {
    throw new Error('Error al hacer login');
  }
};
