import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { List, ListItem, Container, Typography, Box, Button, Grid, CircularProgress} from "@mui/material";

import ProductItemCard from './product-Item-card';
import AuthContext from 'src/context/authContext';

const baseUrl = "http://localhost:3000/productBasket";
const baseCheckOutUrl ="http://localhost:3000/checkOut"

export default function BasketView() {
    const [productBasket, setProductBasket] = useState([]);
    const [loading, setLoading] = useState("true");

    const fetchBasket = async () => {
        try {
            const response = await axios.get(baseUrl);
            setProductBasket(response.data);
            setLoading(false); // Cambia loading a false solo después de cargar los datos.
        } catch (error) {
            console.error("Error al cargar el carrito", error);
            setLoading(false); // Asegura que loading también cambie a false en caso de error.
        }
    };

    // Cargar el carrito cuando el componente se monta
    useEffect(() => {
        fetchBasket();
    }, []);

    // Función para vaciar el carrito
    const clearBasket = async () => {
        try {
            // Borra cada producto del carrito
            await Promise.all(productBasket.map(item => axios.delete(`${baseUrl}/${item.id}`)));
            setProductBasket([]); // Actualiza el estado local para reflejar que el carrito está vacío
        } catch (error) {
            console.error("Error al vaciar el carrito", error);
        }
    };

    const { user } = useContext(AuthContext);

    const handleCheckOut = async () => {
        try {
            if (user === null) {
                alert("Inicie sesión para poder comprar");
                console.log("Usuario no logueado");
                return;
            }

            // Datos de la compra a enviar al backend
            const purchaseData = {
                userId: user.id,  // ID del usuario que realiza la compra
                items: productBasket.map(item => ({
                    ...item.product,  // Incluye todos los detalles del producto (como nombre, descripción, etc.)
                    quantity: item.quantity // Agrega la cantidad comprada como un campo adicional
                })),
                totalAmount: productBasket.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
                totalItems: productBasket.reduce((sum, item) => sum + item.quantity, 0), // Cantidad total de productos
                fechaCompra: new Date().toISOString() 
            };

            // Solicitud POST para procesar el checkout
            const response = await axios.post("http://localhost:3000/checkOut", purchaseData);
            
            if (response.status === 201) {
                alert("Compra realizada con éxito!");
                console.log("Datos de la compra:", response.data);
                clearBasket();  // Vaciar el carrito después de la compra
            } else {
                console.log("Error al realizar la compra:", response.statusText);
            }
        } catch (error) {
            console.error("Error", error)
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
                        {productBasket.map(item => (
                            <Grid item xs={12} key={item.id}>
                                <ProductItemCard productBasket={item} onUpdate={fetchBasket()} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Total y botón de limpiar */}
                    <Box sx={{ marginTop: 4, padding: 2, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color="primary">
                            Total: $ {productBasket.reduce((sum, item) => sum + (item.product.price*item.quantity), 0)}
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