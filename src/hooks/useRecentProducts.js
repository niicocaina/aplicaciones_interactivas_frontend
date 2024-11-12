import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
function useRecentProducts(maxRecent = 5) {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/recentlyViewed").then(response => setRecentProducts(response.data)).catch(err => console.log(err))
},[])


  const addRecentProduct = useCallback((product) => {
    console.log("recent products al entrar",recentProducts)
    setRecentProducts((prevRecent) => {
      const isAlreadyViewed = prevRecent.some(item => item.productId === product.productId);
      console.log("el producto ya estaba? ", isAlreadyViewed);
      let updatedRecent = isAlreadyViewed
        ? prevRecent.filter(item => item.productId !== product.productId)
        : prevRecent;

      updatedRecent = [product, ...updatedRecent];

      if (updatedRecent.length > maxRecent) {
        updatedRecent = updatedRecent.slice(0, maxRecent);
      }
      if(!isAlreadyViewed){
        axios.get("http://localhost:3000/recentlyViewed").then(res => {
            const isAlreadyInDb = res.data.some(item => item.productId === product.productId);
            if(!isAlreadyInDb){
            axios.post("http://localhost:3000/recentlyViewed",product).then(response => console.log(response)).catch("error al actualizar el archivo")
            }
        })
    }
      return updatedRecent;
    });
  }, [maxRecent]);

  return { recentProducts, addRecentProduct };
}

export default useRecentProducts;
