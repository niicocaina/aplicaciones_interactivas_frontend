import { Helmet } from 'react-helmet-async';
import CatalogueView from 'src/sections/catalogue/view/catalogue-view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Catalogo | Minimal UI </title>
      </Helmet>

      <CatalogueView/>
    </>
  );
}
