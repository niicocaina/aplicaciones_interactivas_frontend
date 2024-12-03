import React from 'react';  
import axios from 'axios';
import PropTypes from 'prop-types';
import {Box, Avatar, Typography, IconButton} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { error } from 'src/theme/palette';
import {useContext} from 'react';
import AuthContext from 'src/context/authContext';


const endpointBasket = "http://localhost:8080/basket";

export const handleIncreaseQuantity = async(productBasket, token, onUpdate) => {
    try {
        const response = await axios.put(`${endpointBasket}/increase`, productBasket, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (response.status === 204) { // 204 No Content
            console.log("Cantidad aumentada");
            onUpdate(); 
        }
    }
    catch (error) {
        console.error("Error al aumentar la cantidad del producto", error);
        alert("Error al aumentar la cantidad");
    }
}

const handleDecreaseQuantity = async(productBasket, token, onUpdate) => {
    try {
        const response = await axios.put(`${endpointBasket}/decrease`, productBasket, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status == 204) {
            console.log("cantidad disminuida")
            onUpdate();
        }
    }
    catch {
        console.error("Error al disminuir la cantidad del producto", error);
        alert("Error al disminuir la cantidad del producto");
    }
}

const handleRemoveProduct = async(productBasket, token, onUpdate) => {
    try {
        const response = await axios.delete(`${endpointBasket}/remove`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {  // Agrega los parámetros aquí
                id: productBasket.id  // Asegúrate de que este es el ID correcto
            }
        });
        if (response.status === 204) {
            console.log("Producto eliminado");
            onUpdate();
        }
    } catch (error) {
        console.error("Error al eliminar el producto", error);
        alert("Error intentando eliminar el producto")
    }
};

export default function ProductItemCard({ productBasket, onUpdate }) {
    const {quantity, price, name, img1 } = productBasket;
    const {token} = useContext(AuthContext)
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
                <IconButton size="small" onClick={() => handleDecreaseQuantity(productBasket, token, onUpdate)}>
                    <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ marginX: 1 }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => handleIncreaseQuantity(productBasket, token, onUpdate)}>
                    <AddIcon />
                </IconButton>
            </Box>

            {/* Botón de eliminar */}
            <IconButton color="error" onClick={() => handleRemoveProduct(productBasket, token, onUpdate)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}

ProductItemCard.prototype = {
    productBasket: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
};