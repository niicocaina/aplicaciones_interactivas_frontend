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
import { getProduct, updateProduct, getProducto, updateProducto } from './product-service';

export default function AlertDialog({ id, onChange }) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [precioDescuento, setPrecioDescuento] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleClickOpen = () => {
    /*getProduct(id).then((product) => {
      setNombre(product.name);
      setDescripcion(product.description);
      setPrecio(product.price);
      setPrecioDescuento(product.promotionalPrice > 0 ? product.promotionalPrice : '');
      setStock(product.stock);
      setCategoria(product.category);
    });*/
    getProducto(id).then((product) => {
      setNombre(product.name);
      setDescripcion(product.description);
      setPrecio(product.price);
      setPrecioDescuento(product.promotionalPrice > 0 ? product.promotionalPrice : '');
      setStock(product.stock);
      setCategoria(product.category);
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleChangePrecioDescuento = (event) => {
    setPrecioDescuento(event.target.value);
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
            label="Descripcion"
            value={descripcion}
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
            label="Precio Promocional"
            value={precioDescuento}
            sx={{ mb: 2 }}
            onChange={handleChangePrecioDescuento}
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
              updateProducto(id, {
                name: nombre,
                description: descripcion,
                price: precio,
                promotionalPrice: precioDescuento,
                stock,
                category: categoria,
              }).then(() => onChange());
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
  onChange: PropTypes.func,
};
