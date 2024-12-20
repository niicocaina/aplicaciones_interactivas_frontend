import { useState, useEffect, useContext } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import CreateProduct from '../product-create-modal';
import ProductCartWidget from '../product-cart-widget';
import {getProductos } from '../product-service';

import AuthContext from 'src/context/authContext';
import { Navigate } from 'react-router-dom';
import { useNotification } from 'src/context/notificationContext';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const showNotification = useNotification();
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const { user, token } = useContext(AuthContext);

  // Función para cargar productos desde la api
  const loadProducts = async () => {
    const productos = await getProductos(token);
    setProducts(productos);
    console.log('productos:', productos);
  };

  // Cargar productos solo al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (products === null) {
      showNotification('Error al cargar los productos', 'error');
    }
  }, [products]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  if (user) {
    if (user.role == 'ADMIN') {
      return (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap-reverse"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <CreateProduct onProductChange={loadProducts} />
              <ProductFilters
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort />
            </Stack>
          </Stack>


          {products ? (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} onProductChange={loadProducts} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6"></Typography>
          )}

          <ProductCartWidget />
        </Container>
      );
    } else {
      return <Navigate to="/404" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
