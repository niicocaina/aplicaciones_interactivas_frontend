import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import AuthContext from 'src/context/authContext';
import config from 'src/config.json';

function useRecentProducts(maxRecent = 5) {
  const [recentProducts, setRecentProducts] = useState([]);
  const { user, token } = useContext(AuthContext);  
  
  const conf = {
    headers: {
      'Authorization': `Bearer ${token}`,
      }}
  
  useEffect(() => {
    if(user){
    axios.get(config.apiBaseUrl + config.endpoints.recent,conf).then(response => setRecentProducts(response.data)).catch(err => console.log(err))
    }
  },[user])


  const addRecentProduct = useCallback((product) => {
    console.log(product)
    if(user){
    setRecentProducts((prevRecent) => {
      const isAlreadyViewed = prevRecent.some(item => item.productId === product.productId);
      let updatedRecent = isAlreadyViewed
        ? prevRecent.filter(item => item.productId !== product.productId)
        : prevRecent;

      updatedRecent = [product, ...updatedRecent];

      if (updatedRecent.length > maxRecent) {
        updatedRecent = updatedRecent.slice(0, maxRecent);
      }
      if(!isAlreadyViewed){
        axios.get(config.apiBaseUrl + config.endpoints.product + '/' + product.productId, conf)
        setRecentProducts(updatedRecent)
    }
      return updatedRecent;
    });}

    return null
    
  }, [maxRecent, user]);

  return { recentProducts, addRecentProduct };
}

export default useRecentProducts;
