import axios from 'axios';
import * as React from 'react';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import {Typography, Box, Chip , ImageListItem, ImageList, Modal} from '@mui/material';
import Iconify from 'src/components/iconify';
import MediaList from './media-list';
import { handleIncreaseQuantity } from '../basket/product-Item-card';
import useRecentProducts from 'src/hooks/useRecentProducts';
export const handleAddToCart = async (product, productBasket, onUpdate) => {
  try {
    console.log("productBasket"+ productBasket)
    if (!productBasket || productBasket.length === 0) {
      // Crear el carrito con el primer producto
      const response = await axios.post('http://localhost:3000/productBasket', {
        id: "1",
        quantity: 1,
        product: product
      });
      console.log('Carrito creado con el primer producto:', response.data);
      onUpdate(); // Actualizar el estado del carrito
      return;
    }
    const existingItem = productBasket.find(item => item.product.productId === product.productId);
    if(existingItem) {
      await handleIncreaseQuantity(existingItem.id, existingItem.quantity, onUpdate);
    }
    else{
      const lastId = productBasket[productBasket.length - 1].id;
      const newId = (Number(lastId) + 1).toString();

      const response = await axios.post('http://localhost:3000/productBasket', {
        id: newId,
        quantity: 1,
        product: product
      });
      console.log('Producto agregado al carrito:', response.data);
      
      onUpdate;
    }
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    alert('Error al agregar el producto al carrito');
  }
};

const baseUrl = "http://localhost:3000/productBasket";

export default function ProductDetailsModal({product, similarProducts}) {

    const {recentProducts, addRecentProduct} = useRecentProducts();
    const [open, setOpen] = useState(false);
    const maxImages = [product.img1,product.img5,product.img3,product.img4,product.img2].filter(img => img != null);
    const sizes = ["40","41","42"];
    
    const handleClickOpen = () => {
        setOpen(true);
        console.log(product);
        addRecentProduct(product);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [categoria, setCategoria] = useState('');

    const getNombre = (event) => {
        setNombre(event.target.value);
    }

    const getDescripcion = (event) => {
        setDescripcion(event.target.value);
    }

    const getPrecio = (event) => {
        setPrecio(event.target.value);
    }

    const getStock = (event) => {
        setStock(event.target.value);
    }

    const getCategoria = (event) => {
        setCategoria(event.target.value);
    }

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


    return (
      <>
  <Button variant="contained" onClick={handleClickOpen}>
    Ver Detalles
  </Button>
  <Modal open={open} onClose={handleClose}>
    <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '10px',
      maxHeight: '90vh',
      overflowY: 'scroll', // Allow scrolling but hide scrollbar
      '&::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar in WebKit browsers
      },
      '-ms-overflow-style': 'none',  // Hide scrollbar in IE and Edge
      'scrollbar-width': 'none', // Hide scrollbar in Firefox
    }}
      onClick={handleClickOpen}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ImageList variant="quilted" cols={2} gap={8}>
            <MediaList mediaArray={maxImages} />
          </ImageList>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: { md: 'sticky' },
              top: 16,
              height: 'fit-content',
            }}
          >
            <Typography variant="overline" display="block" gutterBottom>
              {product.category.name}
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" mb={2}>
              ${product.price}
            </Typography>
            <Typography variant="body2" mb={1} sx={{ fontStyle: 'italic', color: 'green' }}>
              {product.featured === true ? 'Producto Destacado' : ''}
            </Typography>
            {product.promotionalPrice === 0 ? (
              <Chip sx={{ p: 1, mb: 2, mt: 2 }} label="No aplican descuentos para este producto" />
            ) : (
              <Chip sx={{ p: 1, mb: 2, mt: 2 }} label="¡Aprovechá esta oportunidad!" />
            )}
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Talles:
            </Typography>
            <Grid container spacing={1}>
              {sizes.map((size, index) => (
                <Grid item key={index}>
                  <Button variant="outlined" size="small">
                    {size}
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Button variant="contained" color="primary" sx={{ mt: 3, width: '100%' }} onClick={() => handleAddToCart(product, productBasket, fetchBasket)}>

              Agregar al Carrito
            </Button>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Devoluciones Gratis para Socios
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt={4}>
              Otros compraron en {product.category.name}
            </Typography>
            <Grid container spacing={2} mt={2}>
              {similarProducts.map((similarProduct, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <Box
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: 2,
                      textAlign: 'center',
                      height: '100%',
                    }}
                  >
                    <img
                      src={similarProduct.img1}
                      alt={similarProduct.name}
                      style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                    <Typography variant="body2" mt={1} fontWeight="bold">
                      {similarProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${similarProduct.price}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Modal>
</>

    
    );
}

ProductDetailsModal.propTypes = {
    similarProducts: PropTypes.array,
    product: PropTypes.shape({
      img1: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      promotionalPrice: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      colors: PropTypes.arrayOf(PropTypes.string).isRequired,
      sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
        })
    }).isRequired
  };