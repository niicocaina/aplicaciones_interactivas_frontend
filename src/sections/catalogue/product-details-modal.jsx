import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import {Typography, Box, Chip , ImageListItem, ImageList, Modal} from '@mui/material';
import Iconify from 'src/components/iconify';


export default function ProductDetailsModal({product}) {
    const [open, setOpen] = useState(false);
    const maxImages = [product.img1,product.img1,product.img1,product.img1,product.img1];
    const sizes = ["40","41","42"];
    const handleClickOpen = () => {
        setOpen(true);
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
    return (
        <>
        <Button variant="contained" onClick={handleClickOpen}>
                Nuevo Producto
                <Iconify icon="bi:plus" />
            </Button>
        <Modal open={open} onClose={handleClose}>
        <Box sx={{
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
            overflowY: 'auto'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <ImageList variant="quilted" cols={2} gap={8}>
            {maxImages.map((image, index) => (
              <ImageListItem key={index} cols={index === 0 ? 2 : 1} rows={1}>
                <img
                  src={image}
                  alt={` ${index + 1}`}
                  loading="lazy"
                  style={{ borderRadius: '10px', width: '100%' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
            </Grid>
            <Grid item xs={12} md={6}>
            <Box sx={{
                position: { md: 'sticky' },
                top: 16,
                height: 'fit-content'
              }}>
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
            {(product.featured === true) ? "Producto Destacado" : ""}
            
            </Typography>
            {(product.promotionalPrice === 0) ? <Chip sx={{p:1,mb:2,mt:2}} label="No aplican descuentos para este producto"/> : <Chip sx={{p:1,mb:2,mt:2}} label="¡Aprovechá ésta oportunidad!"/>}
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

            <Button variant="contained" color="primary" sx={{ mt: 3, width: '100%' }}>
              Agregar al Carrito
            </Button>

            <Typography variant="body2" color="text.secondary" mt={2}>
              Devoluciones Gratis para Socios
            </Typography>
            </Box>
          </Grid>
          </Grid>
        </Box>
      </Modal>
      </>
    );
}

ProductDetailsModal.propTypes = {
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