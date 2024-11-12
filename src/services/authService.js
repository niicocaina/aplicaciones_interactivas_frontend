import axios from 'axios';

export const serviceLogin = async (email, password) => {
  try {
    const response = await axios.get(`http://localhost:3000/user?email=${email}&password=${password}`);
    console.log("este es response", response.data);
    return response.data;  
  } catch (error) {
    throw new Error('Error al hacer login');
  }
};
                   