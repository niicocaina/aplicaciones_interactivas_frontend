import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import config from 'src/config.json';
import AuthContext from 'src/context/authContext';
import { useNotification} from 'src/context/notificationContext';
function useFavoriteProducts(maxFavorite = 5) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { user, token } = useContext(AuthContext);  
  const showNotification = useNotification();
  const conf = {
    headers: {
      'Authorization': `Bearer ${token}`,
      }
  }
  useEffect(() => {
    if(user){
    axios.get(config.apiBaseUrl + config.endpoints.favorite,conf)
      .then(response => setFavoriteProducts(response.data))
      .catch(()=> showNotification("Error al obtener productos favoritos","error"));
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
        axios.post(config.apiBaseUrl + config.endpoints.product + '/' + product.productId + "/favorite",{},conf).then(res => {showNotification("Agregado a favoritos","success")}).catch( () =>showNotification("Error al agregar a favoritos","error"));
      }
      return updatedFavorite;
    }
    return null;
    });
  }, [maxFavorite]);

  const removeFavoriteProduct = useCallback((productId) => {
    setFavoriteProducts((prevFavorite) => {
      const updatedFavorite = prevFavorite.filter(item => item.productId !== productId);
      return updatedFavorite;
    });
    axios.delete(config.apiBaseUrl + config.endpoints.product + '/' + productId + "/favorite",conf).then(res => {showNotification("Removido de favoritos","success")}).catch(() => showNotification("Error al remover de favoritos","error"));
      
  }, []);

  return { favoriteProducts, addFavoriteProduct, removeFavoriteProduct };
}

export default useFavoriteProducts;
