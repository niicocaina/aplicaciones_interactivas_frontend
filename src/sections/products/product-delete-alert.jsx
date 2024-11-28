import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from 'src/components/iconify';

import { deleteProduct, deleteProducto } from './product-service';

export default function AlertDialog({ id, onChange }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ top: 16, ml: 1, background: 'white', position: 'absolute', zIndex: 10 }}
      >
        <Iconify icon="mdi:trash" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Seguro que quiere eliminar el producto?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La acción no podra ser deshecha una vez realizada.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              deleteProducto(id).then(() => onChange());
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
