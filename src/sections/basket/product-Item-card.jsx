import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import {Box, Avatar, Typography, IconButton} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';



const baseUrl = "http://localhost:3000/productBasket";

const handleIncreaseQuantity = async (productId, currentQuantity) => {
    try {
        const response = await axios.put(`${baseUrl}/${productId}`, {
            quantity: currentQuantity + 1
        });
        if (response.status === 200) {
            console.log("Cantidad aumentada");
        }
    } catch (error) {
        console.error("Error al aumentar la cantidad", error);
    }
};

const handleDecreaseQuantity = async (productId, currentQuantity) => {
    try {
        const response = await axios.post(`${baseUrl}/${productId}`, {
            quantity: currentQuantity - 1
        });
        if (response.status === 200) {
            console.log("Cantidad disminuida");
        }
    } catch (error) {
        console.error("Error al disminuir la cantidad", error);
    }
};

const handleRemoveProduct = async (productId) => {
    try {
        const response = await axios.delete(`${baseUrl}/${productId}`);
        if (response.status === 200) {
            console.log("Producto eliminado");
        }
    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
};


export default function ProductItemCard(productBasket) {
    const {quantity, product: { productId, price, name, img1 } } = productBasket.productBasket;
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
                <IconButton size="small" onClick={() => handleDecreaseQuantity(productId, quantity)}>
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ marginX: 1 }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => handleIncreaseQuantity(productId, quantity)}>
                    <AddIcon />
                </IconButton>
            </Box>

            {/* Botón de eliminar */}
            <IconButton color="error" onClick={() => handleRemoveProduct(productId)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}

ProductItemCard.prototype = {
    productBasket: PropTypes.object,
};