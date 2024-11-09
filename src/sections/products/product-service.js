import axios from 'axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products');
    return response.data;
  } catch (error) {
    console.log('Error al obtener productos');
    return null;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error al obtener producto');
    return null;
  }
};

export const creteProduct = async (product) => {
  try {
    await axios.post('http://localhost:3000/products', product);
  } catch (error) {
    console.log('Error al crear producto');
  }
};

export const updateProduct = async (id, product) => {
  try {
    await axios.patch(`http://localhost:3000/products/${id}`, product);
  } catch (error) {
    console.log('Error al actualizar producto');
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`);
  } catch (error) {
    console.log('Error al eliminar producto');
  }
};
