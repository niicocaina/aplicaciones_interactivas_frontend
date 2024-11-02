import React, { useState } from 'react';

import { Box, Button } from '@mui/material';

function ImageUploader() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    // Añadir nuevas imágenes al estado sin sobrescribir las anteriores
    setImages((prevImages) => [...prevImages, ...newImageUrls]);
  };

  return (
    <Box>
      <label htmlFor="image-upload">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <Button variant="contained" component="span">
          Cargar Imagenes
        </Button>
      </label>

      {/* Mostrar todas las imágenes seleccionadas */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px' }} />
        ))}
      </Box>
    </Box>
  );
}

export default ImageUploader;
