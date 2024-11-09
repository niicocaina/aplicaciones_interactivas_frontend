import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, IconButton } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';
import CategoryMenu from './category-menu';
import { getProduct, updateProduct } from './product-service';

export default function AlertDialog({ id }) {
  const [open, setOpen] = useState(false);
  const [producto, setProducto] = useState({});
  const [nombre, setNombre] = useState('Nombre');
  const [descripcion, setDescripcion] = useState('Descripción');
  const [precio, setPrecio] = useState('Precio');
  const [stock, setStock] = useState('stock');
  const [categoria, setCategoria] = useState('Categoria');

  const handleClickOpen = () => {
    getProduct(id).then((product) => {
        setProducto(product);
        setNombre(product.name || 'Nombre');
        setDescripcion(product.description || 'Descripción');
        setPrecio(product.price || 'Precio');
        setStock(product.stock || 'Stock');
        setCategoria(product.category || 'Categoria');
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProducts = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/products/${id}`, {
        name: nombre,
        description: descripcion,
        price: precio,
        stock,
        category: categoria,
      });
      console.log(response);
    } catch (error) {
      console.log('Error al actualizar producto');
    }
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handleChangePrecio = (event) => {
    setPrecio(event.target.value);
  };

  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };

  return (
    <>
      <IconButton
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ top: 16, left: 40, ml: 1, background: 'white', position: 'absolute', zIndex: 10 }}
      >
        <Iconify icon="mdi:pencil" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar producto</DialogTitle>
        <DialogContent>
          <TextField
            value={nombre}
            label="Nombre"
            sx={{ mb: 2, mt: 2 }}
            onChange={handleChangeNombre}
            fullWidth
          />
          <TextField
            value={descripcion}
            label="Descripcion"
            sx={{ mb: 2 }}
            onChange={handleChangeDescripcion}
            fullWidth
          />
          <TextField
            type="number"
            label="Precio"
            value={precio}
            sx={{ mb: 2 }}
            onChange={handleChangePrecio}
            fullWidth
          />
          <TextField
            type="number"
            label="Stock"
            value={stock}
            sx={{ mb: 2 }}
            onChange={handleChangeStock}
            fullWidth
          />
          <CategoryMenu onCategoryChange={setCategoria} productCategory={categoria} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              updateProducts();
              handleClose();
            }}
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  id: PropTypes.string,
};
