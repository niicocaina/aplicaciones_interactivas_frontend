import { Helmet } from 'react-helmet-async';
import { CatalogueView } from 'src/sections/catalogue/view';


// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Catalogue | Minimal UI </title>
      </Helmet>

      <CatalogueView />
    </>
  );
}
