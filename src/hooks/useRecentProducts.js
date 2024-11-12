import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
function useRecentProducts(maxRecent = 5) {
  const [recentProducts, setRecentProducts] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/recentlyViewed").then(response => setRecentProducts(response.data)).catch(err => console.log(err))
  },[])


  const addRecentProduct = useCallback((product) => {
    setRecentProducts((prevRecent) => {
      const isAlreadyViewed = prevRecent.some(item => item.productId === product.productId);

      let updatedRecent = isAlreadyViewed
        ? prevRecent.filter(item => item.productId !== product.productId)
        : prevRecent;

      updatedRecent = [product, ...updatedRecent];

      if (updatedRecent.length > maxRecent) {
        updatedRecent = updatedRecent.slice(0, maxRecent);
      }
      axios.post("http://localhost:3000/recentlyViewed",updatedRecent).then(response => console.log(response)).catch("error al actualizar el archivo")
      return updatedRecent;
    });
  }, [maxRecent]);

  return { recentProducts, addRecentProduct };
}

export default useRecentProducts;
