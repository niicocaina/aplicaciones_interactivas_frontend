import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import {Container, Typography, Box, Button, Grid, CircularProgress} from "@mui/material";

import ProductItemCard from './product-Item-card';
import AuthContext from 'src/context/authContext';

import {useNotification} from 'src/context/notificationContext';

const baseUrl = "http://localhost:8080/basket";

export default function BasketView() {
    const [productBasket, setProductBasket] = useState([]);
    const [loading, setLoading] = useState("true");
    const { token } = useContext(AuthContext);
    const showNotification = useNotification();

    const fetchBasket = async () => {
        try {
            const response = await axios.get(baseUrl, {
                headers: {
                  Authorization: `Bearer ${token}`
                }});   
            setProductBasket(response.data.products);
            setLoading(false);
             // Cambia loading a false solo después de cargar los datos.
        } catch (error) {
            console.error("Error al cargar el carrito", error);
            setLoading(false);
            showNotification("Error de red o inesperado", "error"); // Asegura que loading también cambie a false en caso de error.
        }
    };

    // Cargar el carrito cuando el componente se monta
    useEffect(() => {
        fetchBasket();
    }, []);

    // Función para vaciar el carrito
    const clearBasket = async () => {
        try {
            const response = await axios.delete(`${baseUrl}/removeAll`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                console.log("Producto eliminado");
                fetchBasket();
            }
        } catch (error) {
            console.error("Error al vaciar el carrito", error);
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await axios.post(`${baseUrl}/checkout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.status === 204) {
                showNotification("Compra realizada con exito", "success");
                fetchBasket();
            }
        } catch (error) {
            // Verificar si el error tiene una respuesta de Axios
            if (error.response) {
                if (error.response.status === 500) {
                    showNotification("El carrito se encuentra vacío.", "error");
                }
            } else {
                // Error sin respuesta (problemas de red, etc.)
                console.error("Error de red o inesperado", error);
                showNotification("Error de red o inesperado", "error");
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ paddingTop: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
                Carrito de Compras
            </Typography>            
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Lista de productos */}
                    <Grid container spacing={3} sx={{ marginTop: 2 }}>
                        {productBasket.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <ProductItemCard productBasket={item} onUpdate={fetchBasket} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Total y botón de limpiar */}
                    <Box sx={{ marginTop: 4, padding: 2, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            Total: $ {productBasket.reduce((sum, item) => sum + (item.price*item.quantity), 0)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ marginTop: 2, fontWeight: 'bold', borderRadius: 4 }}
                            onClick={clearBasket} // Puedes reemplazar esta función con otra que realmente vacíe el carrito.
                        >
                            Limpiar Carrito
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2, fontWeight: 'bold', borderRadius: 4, marginLeft: 2 }}
                            onClick={handleCheckOut}
                        >
                            Realizar Compra
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
} 