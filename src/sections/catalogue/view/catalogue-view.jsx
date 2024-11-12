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
import CatalogueBanner from '../catalogue-banner';
import FeaturedProductList from '../featured-list';
import useAuth from '../../../context/authContext';
import ProductCartWidget from '../../products/product-cart-widget'
import useRecentProducts from 'src/hooks/useRecentProducts';
// ----------------------------------------------------------------------

export default function CatalogueView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  const {recentProducts, addRecentProduct} = useRecentProducts();
  

  useEffect(() => {
    
    setProducts([]);
    setLoading(true);
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
      <CatalogueBanner
      title="CATÁLOGO"
      subtitle="Chusmeá nuestra selección de productos y encontrá todo lo que buscás, ¡con promos y novedades imperdibles!"
      bannerImageUrl="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/xcat_fw24_holiday_shoes_100_under_mh_lg_mw_d_dc3379f48d.jpg"
      />

      <br/>
      
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
            <ProductCard product={product} similarProducts={products.filter(item => item.category.id === product.category.id)}/>
          </Grid>
        ))}
      </Grid>
      <ProductCartWidget />
      <br/>
      <Typography variant='subtitle1'> Productos destacados</Typography>
      <FeaturedProductList products={products.filter((item) => item.featured === true)} loading={loading}/>
      <br/>
      {recentProducts.length === 0 ? "":
        <>
        <br/>
        <Typography variant='subtitle1'> Vistos Recientemente</Typography>
        <FeaturedProductList products={recentProducts.map(item => item[0])} loading={loading}/>
        <br/>
        </>}
    </Container>
  );
}
