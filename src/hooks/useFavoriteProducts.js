import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function useFavoriteProducts(maxFavorite = 5) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/favorite").then(response => setFavoriteProducts(response.data)).catch(err => console.log(err))
  },[])


  const addFavoriteProduct = useCallback((product) => {
    setFavoriteProducts((prevFavorite) => {
      const isAlreadyFav = prevFavorite.some(item => item.productId === product.productId);

      let updatedFavorite = isAlreadyFav
        ? prevFavorite.filter(item => item.productId !== product.productId)
        : prevFavorite;

      updatedFavorite = [product, ...updatedFavorite];

      if (updatedFavorite.length > maxFavorite) {
        updatedFavorite = updatedFavorite.slice(0, maxFavorite);
      }
      if(!isAlreadyFav){
        axios.get("http://localhost:3000/favorite").then(res => {
          const isAlreadyInDb = res.data.some(item => item.productId === product.productId);
          if(!isAlreadyInDb){       
            axios.post("http://localhost:3000/favorite",product).then(response => console.log(response)).catch("error al actualizar el archivo")
          }
        }
        )
      }
      return updatedFavorite;
    });
  }, [maxFavorite]);

  return { favoriteProducts, addFavoriteProduct };
}

export default useFavoriteProducts;
