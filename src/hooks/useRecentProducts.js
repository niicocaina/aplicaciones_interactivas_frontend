import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import AuthContext from 'src/context/authContext';


function useRecentProducts(maxRecent = 5) {
  const [recentProducts, setRecentProducts] = useState([]);
  const { user } = useContext(AuthContext);  

  
  useEffect(() => {
    if(user){
    axios.get("http://localhost:8080/api/v1/catalog/recent").then(response => setRecentProducts(response.data)).catch(err => console.log(err))
    }
  },[user])


  const addRecentProduct = useCallback((product) => {
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
        axios.get("http://localhost:8080/api/v1/catalog/recent").then(res =>{
          console.log(res.data)
        })
    }
      return updatedRecent;
    });}

    return null
    
  }, [maxRecent, user]);

  return { recentProducts, addRecentProduct };
}

export default useRecentProducts;
