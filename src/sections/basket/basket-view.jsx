import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { List, ListItem, Container, Typography, Box, Button, Grid, CircularProgress} from "@mui/material";

import ProductItemCard from './product-Item-card';

export default function BasketView() {
    const [productBasket, setProductBasket] = useState([]);
    const [loading, setLoading] = useState("true");

    useEffect(() => {
        axios.get("http://localhost:3000/productBasket")
            .then(response => {
                setProductBasket(response.data);
                setLoading(false); // Cambia loading a false solo después de cargar los datos.
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Asegura que loading también cambie a false en caso de error.
            });
    }, []);

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
                                <ProductItemCard productBasket={item} />
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
                            onClick={() => setProductBasket([])} // Puedes reemplazar esta función con otra que realmente vacíe el carrito.
                        >
                            Limpiar Carrito
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
} 