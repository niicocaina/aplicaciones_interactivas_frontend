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
    const conf = {
      headers: { Authorization: `Bearer ${response.data.access_token}` }
    };

    try {
      const user_response = await axios.get('http://localhost:8080/api/v1/auth/user', conf);
      
      return { 
        token: response.data.access_token, 
        user: user_response.data // Asumiendo que el backend retorna la información del usuario
      };  
    }catch(err) {
      console.log("ERROR AL OBTENER INFORMACION DEL USUARIO",err);
      }
    
    // Retornar el token y la información del usuario
    
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
                   