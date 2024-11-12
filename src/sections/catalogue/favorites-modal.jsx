import React from 'react';
import { Modal, Button, Box } from '@mui/material';
import ShopProductCard from './product-card';

const FavoritesModal = ({ open, onClose, favorites }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="favorites-modal-title"
    >
      <Box 
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxWidth: 600,
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
      >
      <h2 id="favorites-modal-title">Ver Favoritos</h2>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',  // Coloca los elementos en una sola columna
          gap: 2,                   // Espacio entre productos
        }}
      >
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <ShopProductCard key={product.id} product={product} similarProducts={[]} />
            ))
          ) : (
            <p>No tienes productos en favoritos.</p>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default FavoritesModal;
