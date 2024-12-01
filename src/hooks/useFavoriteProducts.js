import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import config from 'src/config.json';
import AuthContext from 'src/context/authContext';

function useFavoriteProducts(maxFavorite = 5) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { user } = useContext(AuthContext);  
  
  useEffect(() => {
    if(user){
    axios.get(config.apiBaseUrl + config.endpoints.favorite)
      .then(response => setFavoriteProducts(response.data))
      .catch(err => console.log(err));
    }
  }, [user]);

  const addFavoriteProduct = useCallback((product) => {
    setFavoriteProducts((prevFavorite) => {

      if(user){
      const isAlreadyFav = prevFavorite.some(item => item.productId === product.productId);

      let updatedFavorite = isAlreadyFav
        ? prevFavorite.filter(item => item.productId !== product.productId)
        : prevFavorite;

      updatedFavorite = [product, ...updatedFavorite];

      if (updatedFavorite.length > maxFavorite) {
        updatedFavorite = updatedFavorite.slice(0, maxFavorite);
      }

      if (!isAlreadyFav) {
        axios.get(config.apiBaseUrl + config.endpoints.favorite).then(res => {
          const isAlreadyInDb = res.data.some(item => item.productId === product.productId);
          if (!isAlreadyInDb) {       
            axios.post(config.apiBaseUrl + config.endpoints.favorite, product)
              .catch(() => console.log("Error al actualizar el archivo"));
          }
        });
      }
      return updatedFavorite;
    }
    return null;
    });
  }, [maxFavorite]);

  const removeFavoriteProduct = useCallback((productId) => {
    setFavoriteProducts((prevFavorite) => {
      const updatedFavorite = prevFavorite.filter(item => item.productId !== productId);

      axios.get(config.apiBaseUrl + config.endpoints.favorite).then(res => res.data).then((data) => {
      const product_to_delete = data.filter(item => item.productId === productId)
      const id_to_delete = product_to_delete[0]["id"]
      axios.delete(`http://localhost:3000/favorite/${id_to_delete}`)
        .catch(() => console.log("Error al eliminar el archivo"));
      })  
      return updatedFavorite;
    });
  }, []);

  return { favoriteProducts, addFavoriteProduct, removeFavoriteProduct };
}

export default useFavoriteProducts;
