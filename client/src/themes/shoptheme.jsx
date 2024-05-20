import React from 'react';
import './shoptheme.css';

const ShopTheme = ({ storeName, description, logoUrl, bannerUrl, location, contact }) => {
  return (
    <div className="store-container">
      <div className="store-banner">
        <img src={bannerUrl} alt="Store Banner" />
      </div>
      <div className="store-details">
        <div className="store-logo">
          <img src={logoUrl} alt="Store Logo" />
        </div>
        <div className="store-info">
          <h1 className="store-name">{storeName}</h1>
          <p className="store-description">{description}</p>
          <p className="store-location"><strong>Location:</strong> {location}</p>
          <p className="store-contact"><strong>Contact:</strong> {contact}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopTheme;
