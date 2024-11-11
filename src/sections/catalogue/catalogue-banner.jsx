import React from 'react';
import './CatalogueBanner.css';

function CatalogueBanner({ title, subtitle, bannerImageUrl }) {
  return (
    <div className="catalogue-banner" style={{ backgroundImage: `url(${bannerImageUrl})` }}>
      <div className="catalogue-banner-overlay">
        <div className="catalogue-banner-content">
          <h1 className="catalogue-banner-title">{title}</h1>
          {subtitle && <p className="catalogue-banner-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export default CatalogueBanner;

