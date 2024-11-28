import * as React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';

import PropTypes from 'prop-types';
import ImageUploader from './image-uploader';
import CategoryMenu from './category-menu';
import { createProduct, createProducto } from './product-service';

export default function AlertDialog({ onProductChange }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setImages([]);
    setOpen(false);
  };

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [precioDescuento, setPrecioDescuento] = useState(0);
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');

  const getNombre = (event) => {
    setNombre(event.target.value);
  };

  const getDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const getPrecio = (event) => {
    setPrecio(event.target.value);
  };

  const getStock = (event) => {
    setStock(event.target.value);
  };

  const getPrecioDescuento = (event) => {
    setPrecioDescuento(event.target.value);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Nuevo Producto
        <Iconify icon="bi:plus" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Nuevo producto</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Nombre"
            sx={{ mb: 2, mt: 2 }}
            onChange={getNombre}
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Description"
            sx={{ mb: 2 }}
            onChange={getDescripcion}
            fullWidth
          />
          <TextField
            variant="outlined"
            type="number"
            label="Precio"
            sx={{ mb: 2 }}
            onChange={getPrecio}
            fullWidth
          />
          <TextField
            variant="outlined"
            type="number"
            label="Precio Promocional"
            sx={{ mb: 2 }}
            onChange={getPrecioDescuento}
            fullWidth
          />
          <TextField
            variant="outlined"
            type="number"
            label="stock"
            sx={{ mb: 2 }}
            onChange={getStock}
            fullWidth
          />
          <CategoryMenu onCategoryChange={setCategoria} />
          <ImageUploader images={images} setImages={setImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              createProducto({
                name: nombre,
                description: descripcion,
                price: precio,
                promotionalPrice: precioDescuento,
                stock,
                category: categoria,
                img1: images[0] || null,
                img2: images[1] || null,
                img3: images[2] || null,
                img4: images[3] || null,
                img5: images[4] || null,
              }).then(() => onProductChange());
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
  onProductChange: PropTypes.func.isRequired,
};
