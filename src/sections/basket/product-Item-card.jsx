import React from 'react';  
import axios from 'axios';
import PropTypes from 'prop-types';
import {Box, Avatar, Typography, IconButton} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const baseUrl = "http://localhost:3000/productBasket";

export const handleIncreaseQuantity = async (id, currentQuantity, onUpdate) => {
    try {
        const getResponse = await axios.get(`${baseUrl}/${id}`);
        const productData = getResponse.data;

        // Luego hacemos el PUT con todos los datos, actualizando solo la cantidad
        const response = await axios.put(`${baseUrl}/${id}`, {
            ...productData, // Mantenemos el resto de las propiedades
            quantity: currentQuantity + 1 // Solo cambiamos la cantidad
        });
        if (response.status === 200) {
            console.log("Cantidad aumentada");
            onUpdate;
        }   
    } catch (error) {
        console.error("Error para disminuir el producto", error);
    }
};

const handleDecreaseQuantity = async (id, currentQuantity, onUpdate) => {
    // Primero obtenemos el producto completo
    const getResponse = await axios.get(`${baseUrl}/${id}`);
    const productData = getResponse.data;
    try {
        if(currentQuantity > 1) {
            // Luego hacemos el PUT con todos los datos, actualizando solo la cantidad
            const response = await axios.put(`${baseUrl}/${id}`, {
                ...productData, // Mantenemos el resto de las propiedades
                quantity: currentQuantity - 1 // Solo cambiamos la cantidad
            });
            if (response.status === 200) {
                console.log("Cantidad disminuida");
                onUpdate;
            }
        }
        else {
            handleRemoveProduct(id);
        }
    } catch (error) {
        console.error("Error para disminuir el producto", error);
    }
};

const handleRemoveProduct = async (id, onUpdate) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        if (response.status === 200) {
            console.log("Producto eliminado");
            onUpdate;
        }
    } catch (error) {
        console.log("el id pasado es: ", id)
        console.error("Error al eliminar el producto", error);
    }
};


export default function ProductItemCard(productBasket, onUpdate) {
    const {quantity, id, product: { price, name, img1 } } = productBasket.productBasket;
    
    return (
        <Box display="flex" alignItems="center" padding={2} border={1} borderRadius={2} borderColor="grey.300">
            {/* Imagen del producto */}
            <Avatar 
                variant="square" 
                src={img1} 
                alt={name} 
                sx={{ width: 80, height: 80, marginRight: 2 }} 
            />

            {/* Detalles del producto */}
            <Box flex="1">
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="text.secondary">{`$${price}`}</Typography>
            </Box>

            {/* Control de cantidad */}
            <Box display="flex" alignItems="center">
                <IconButton size="small" onClick={() => handleDecreaseQuantity(id, quantity, onUpdate)}>
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ marginX: 1 }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => handleIncreaseQuantity(id, quantity, onUpdate)}>
                    <AddIcon />
                </IconButton>
            </Box>

            {/* Botón de eliminar */}
            <IconButton color="error" onClick={() => handleRemoveProduct(id, onUpdate)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}

ProductItemCard.prototype = {
    productBasket: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
};