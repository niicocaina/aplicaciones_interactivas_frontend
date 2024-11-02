import { Helmet } from 'react-helmet-async';

import { BasketView } from 'src/sections/basket';

// ----------------------------------------------------------------------

export default function BasketPage() {
  return (
    <>
      <Helmet>
        <title> Basket | Minimal UI </title>
      </Helmet>

      <BasketView />
    </>
  );
}