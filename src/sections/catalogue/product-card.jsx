import PropTypes from 'prop-types';
import { useState } from 'react';


import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import { Button } from '@mui/material';
import ProductDetailsModal from './product-details-modal';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
// ["default","primary","secondary","info","success","warning","error"]


const HoverImage = ({ img1, img2, alt }) => {
  const [currentSrc, setCurrentSrc] = useState(img1);

  return (
    <Box
      component="img"
      src={currentSrc}
      alt={alt}
      onMouseEnter={() => setCurrentSrc(img2)}
      onMouseLeave={() => setCurrentSrc(img1)}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        borderRadius: '10px',
        transition: 'all 0.3s ease-in-out',
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );
};

HoverImage.propTypes = {
  img1: PropTypes.string.isRequired,
  img2: PropTypes.string.isRequired,
  alt: PropTypes.string
};

HoverImage.defaultProps = {
  alt: 'Product image'
};

export default function ShopProductCard({ product, similarProducts }) {

  console.log(product)
  similarProducts = similarProducts.filter(item => item.productId !== product.productId);

  const renderSale = (
    <Label
      variant="filled"
      color="error"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
    SALE
    </Label>
  );

  const renderFeatured = (
    <Label
      variant="filled"
      color="default"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
    DESTACADO
    </Label>
  );

  const renderImg = (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    >
    <HoverImage img1={product.img1}
    img2={product.img2 ? product.img2 : product.img1} 
    alt="Imagen no definida"/>
    </Box>
  );


  const renderPrice = (
    <><Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.promotionalPrice !== 0 && fCurrency(product.price)}
      </Typography>
      &nbsp;
      {fCurrency(product.promotionalPrice ? product.promotionalPrice : product.price)}
      </Typography></>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {(product.promotionalPrice === 0 && product.featured === false) ? "" : (product.featured === true) ? renderFeatured : renderSale}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>

        <ProductDetailsModal product = {product} similarProducts = {similarProducts}/>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  similarProducts: PropTypes.array
};
