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
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        transition: 'all 0.3s ease-in-out'
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

export default function ShopProductCard({ product }) {
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
    img2="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/a384cde536db45e7acb1af560093e048_9366/Zapatillas_Web_Boost_Negro_HQ4155_01_standard.jpg" 
    alt="Example product"/>
    </Box>
  );

  const renderVid = (
    <Box
    sx={{
      top: 0,
      width: 1,
      height: 1,
      objectFit: 'cover',
      position: 'absolute',
    }}
    >
    <video
              src="https://assets.adidas.com/videos/ar_1,w_720,c_fill,q_auto,f_auto/4300d7b9187942e79a82a8ab010672d5_d98c/Samba_OG_Shoes_White_B75806_video.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ borderRadius: '10px', width: '100%' }}
              preload="metadata"
            >
            <track
            kind="captions"
            src='messi'
            srcLang="en"
            label="English captions"
            default
          />
          Your browser does not support the video tag.
        </video>
    </Box>
  )

  const renderPrice = (
    <Typography variant="subtitle1">
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
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {(product.promotionalPrice === 0 && product.featured === false) ? "" : (product.featured === true) ? renderFeatured : renderSale}
        {product.featured === true ? renderVid : renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>

        <ProductDetailsModal product = {product}/>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
