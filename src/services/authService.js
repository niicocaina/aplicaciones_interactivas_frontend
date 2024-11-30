import axios from 'axios';

export const serviceLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'   

      }
    });
    // Retornar el token y la información del usuario
    return { 
      token: response.data.access_token, 
      user: response.data // Asumiendo que el backend retorna la información del usuario
    };  
  } catch (error) {
    throw new Error('Error al hacer login'); 
  }
};


/*AuthService anterior

import axios from 'axios';

export const serviceLogin = async (email, password) => {
  try {
    const response = await axios.get(`http://localhost:3000/user?email=${email}&password=${password}`);
    console.log("este es response", response.data);
    return response.data;  
  } catch (error) {
    throw new Error('Error al hacer login');
  }
};*/
                   