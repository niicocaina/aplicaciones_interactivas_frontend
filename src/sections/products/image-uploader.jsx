import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';

import { Box, Button } from '@mui/material';

function ImageUploader({ images, setImages }) {
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'aplicacionesInteractivas-img'); // Reemplaza con el nombre del upload preset de Cloudinary

      try {
        // Hacer la solicitud de carga a Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dvs7zpy9d/image/upload`,
          formData
        ); // Reemplaza TU_CLOUD_NAME con tu Cloud Name de Cloudinary
        return response.data.secure_url;
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        return null;
      }
    });

    const newImageUrls = (await Promise.all(uploadPromises)).filter(Boolean);

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImageUrls];
      return updatedImages.slice(0, 5); // Limitar a 5 elementos
    });
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

ImageUploader.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default ImageUploader;
