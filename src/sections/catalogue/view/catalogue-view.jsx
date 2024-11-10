import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';

import axios from 'axios';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import { useParams } from 'react-router-dom';

import ProductCartWidget from '../../products/product-cart-widget'
// ----------------------------------------------------------------------

export default function CatalogueView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {

    if (categoryId) {
      axios.get("http://localhost:3000/products").then(response => setProducts(response.data.filter(item => String(item.category.id) == String(categoryId)))).then(setLoading(false)).catch(err => console.log(err))
  
    } else {
      axios.get("http://localhost:3000/products").then(response => setProducts(response.data)).then(setLoading(false)).catch(err => console.log(err))
    }
  }, [categoryId]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  
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
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {loading === true ? 
          <Card>
          <Skeleton width={400} height={400} />
    
          <Stack spacing={2} sx={{ p: 3 }}>
    
            <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Skeleton width={210} height={118}/>
            </Stack>
          </Stack>
        </Card>
        : products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <ProductCartWidget />
    </Container>
  );
}
