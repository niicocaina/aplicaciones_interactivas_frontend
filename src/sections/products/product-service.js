import axios from 'axios';
import { toNumber } from 'lodash';

const conf = {
  headers: { Authorization: `Bearer ${token}` }, // obtener el token del auth context
  ContentType: 'application/json', 
  Accept: 'application/json'
};

export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products');
    return response.data;
  } catch (error) {
    console.log('Error al obtener productos');
    return null;
  }
};

export const getProducto = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMyOTk0Mjk4LCJleHAiOjE3MzMwODA2OTh9.8FqyHu5_fWXQ4JKzN3YQqbEionWID_p9Vqu-aXhnNuNypKP3V2dEpr1BQ7QSEZnk6w-eY6u7ZsOyIrRbk4IN2w',
        'Content-Type': 'application/json', // Si aplica
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al obtener productos:', error.response?.data || error.message);
    return null;
  }
};

export const getProductos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/products', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMyOTk0Mjk4LCJleHAiOjE3MzMwODA2OTh9.8FqyHu5_fWXQ4JKzN3YQqbEionWID_p9Vqu-aXhnNuNypKP3V2dEpr1BQ7QSEZnk6w-eY6u7ZsOyIrRbk4IN2w',
        'Content-Type': 'application/json', // Si aplica
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al obtener productos:', error.response?.data || error.message);
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

export const createProduct = async (product) => {
  try {
    await axios.post('http://localhost:3000/products', product);
  } catch (error) {
    console.log('Error al crear producto');
  }
};

export const createProducto = async (product) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/products`,product, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMyOTk0Mjk4LCJleHAiOjE3MzMwODA2OTh9.8FqyHu5_fWXQ4JKzN3YQqbEionWID_p9Vqu-aXhnNuNypKP3V2dEpr1BQ7QSEZnk6w-eY6u7ZsOyIrRbk4IN2w',
        'Content-Type': 'application/json', // Si aplica
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error al crear producto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    await axios.patch(`http://localhost:3000/products/${id}`, product);
  } catch (error) {
    console.log('Error al actualizar producto');
  }
};

export const updateProducto = async (id, product) => {
  try {
    const response = await axios.patch(`http://localhost:8080/api/v1/products/${id}`,product, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMyOTk0Mjk4LCJleHAiOjE3MzMwODA2OTh9.8FqyHu5_fWXQ4JKzN3YQqbEionWID_p9Vqu-aXhnNuNypKP3V2dEpr1BQ7QSEZnk6w-eY6u7ZsOyIrRbk4IN2w',
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

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`);
  } catch (error) {
    console.log('Error al eliminar producto');
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/products/${id}`, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaWNvQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMyOTk0Mjk4LCJleHAiOjE3MzMwODA2OTh9.8FqyHu5_fWXQ4JKzN3YQqbEionWID_p9Vqu-aXhnNuNypKP3V2dEpr1BQ7QSEZnk6w-eY6u7ZsOyIrRbk4IN2w',
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
