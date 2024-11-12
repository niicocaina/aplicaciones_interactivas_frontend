import { Helmet } from 'react-helmet-async';
import CrearCuenta from 'src/sections/login/crear-cuenta';

// ----------------------------------------------------------------------

export default function crearCuentaPage() {
  return (
    <>
      <Helmet>
        <title> crear Cuenta | Minimal UI </title>
      </Helmet>

      <CrearCuenta/>
    </>
  );
}