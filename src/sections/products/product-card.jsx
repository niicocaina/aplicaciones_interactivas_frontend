import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import EditProduct from './product-edit-modal';
import DeleteAlert from './product-delete-alert';

// ----------------------------------------------------------------------
// ["default","primary","secondary","info","success","warning","error"]
export default function ShopProductCard({ product, onProductChange }) {
  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.img1}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography component="span" variant="body1">
        Precio: {fCurrency(product.price)}
      </Typography>
      {product.promotionalPrice > 0 && (
        <Typography>Precio Especial: {fCurrency(product.promotionalPrice)}</Typography>
      )}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <EditProduct id={product.id} onChange={onProductChange} />
        <DeleteAlert id={product.id} onChange={onProductChange} />
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  onProductChange: PropTypes.func.isRequired,
};
