import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

export default function CategoryMenu({ onCategoryChange, productCategory }) {
  const categorias = [
    { name: 'Running', id: 1 },
    { name: 'Casual', id: 2 },
    { name: 'Deportiva', id: 3 },
  ];

  // Estado local para manejar la opción seleccionada
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (productCategory) {
      const defaultCategory =
        categorias.find((category) => category.id === productCategory.id) || null;
      setSelectedCategory(defaultCategory);
    }
  }, [productCategory]);

  return (
    <Autocomplete
      options={categorias}
      sx={{ width: 300, mb: 2 }}
      value={selectedCategory} // Usamos el estado para el valor actual
      onChange={(event, value) => {
        setSelectedCategory(value); // Actualizamos el estado al seleccionar una nueva opción
        onCategoryChange(value); // Llamamos a la función de cambio de categoría
      }}
      renderInput={(params) => <TextField {...params} label="Categoría" />}
      ListboxProps={{ sx: { bgcolor: '#B3E5FC' } }}
      getOptionLabel={(option) => option.name}
    />
  );
}

CategoryMenu.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  productCategory: PropTypes.object.isRequired,
};
