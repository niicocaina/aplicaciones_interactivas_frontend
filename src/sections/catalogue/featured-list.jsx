import React, { useState } from 'react';
import ShopProductCard from './product-card';
import './FeaturedList.css';

const FeaturedProductList = ({ products = [], loading }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleProducts = 5;

  const handlePrevious = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? products.length - visibleProducts : prevIndex - visibleProducts
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleProducts >= products.length ? 0 : prevIndex + visibleProducts
    );
  };

  const displayedProducts = products.slice(startIndex, startIndex + visibleProducts);
  if(loading === false){
  return (
    <div className="featured-product-list">
      <button className="arrow left-arrow" onClick={handlePrevious}>
        &#10094;
      </button>

      {loading === true ? (
        <p>Loading...</p>
      ) : (
        <div className="product-container">
          {displayedProducts.map((product, index) => (
            <ShopProductCard key={index} product={product} similarProducts={products.filter(item => item.category.id === product.category.id)}/>
          ))}
        </div>
      )}

      <button className="arrow right-arrow" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );}
};

export default FeaturedProductList;
