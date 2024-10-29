import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { List, ListItem, Container, Typography} from "@mui/material";

import ProductItemCard from './product-Item-card';

export default function BasketView() {
    const [productBasket, setProductBasket] = useState([]);
    const [loading, setLoading] = useState("true");

    useEffect(() => {
    axios.get("http://localhost:3000/productBasket").then(response => setProductBasket(response.data)).then(setLoading("false")).catch(err => console.log(err))
    },[])
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
            <List>
                {loading === "true" ? <h1>Cargando</h1> : productBasket.map(item => (
                    <div key={item.id}>
                        <ListItem                        >
                        <ProductItemCard productBasket = {item}/>
                        </ListItem>
                    </div>
                ))}
            </List>
            <Typography variant="body1">Este es un texto de prueba en el contenedor.</Typography>
        </Container>
    );
} 