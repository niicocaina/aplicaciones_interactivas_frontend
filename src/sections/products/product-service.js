import axios from 'axios';

export const getProducto = async (id, token) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al obtener productos:', error.response?.data || error.message);
    throw error;
  }
};

export const getProductos = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/products', {
      headers: {
        'Authorization': `Bearer ${token}`, // obtener el token del auth context
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al obtener productos:', error.response?.data || error.message);
    return null;
  }
};

export const createProducto = async (product, token) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/products`, product, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al crear producto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProducto = async (id, product, token) => {
  try {
    const response = await axios.patch(`http://localhost:8080/api/v1/products/${id}`, product, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Si aplica
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al actualizar producto:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProducto = async (id, token) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Si aplica
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al eliminar producto:', error.response?.data || error.message);
    throw error;
  }
};
