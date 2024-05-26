
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import OldSidebar from './oldside';
import ProductHome from './producthome';
import "./shopview.css";

function ShopView() {
  const { sellerId } = useParams(); 
  const [shopView, setShopView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://mybanda-backend-88l2.onrender.com/user/${sellerId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Fetch access token from local storage
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shop data');
        }

        const data = await response.json();
        setShopView(data);
        setAuthenticated(true); // If successful response, set authenticated to true
      } catch (error) {
        console.error('Error fetching shop data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [sellerId]);

  if (loading) {
    return (
      <div className="loader">
        <img src="https://i.pinimg.com/originals/c1/bc/d8/c1bcd8a8c945b53da6b29f10a2a553c0.gif" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading shop data: {error.message}</div>;
  }

  if (!authenticated) {
    return <div>You are not authenticated</div>;
  }

  if (!shopView) {
    return <div>No shop data available</div>;
  }

  return (
    <div className="shopview mb-5">
      <OldSidebar />
      <div className="shopviewWrapper">
        <div className="container-fluid">
          <div className="shopviewBanner">
            <img src={shopView.shop.banner_image_url} alt="Shop Banner" className="w-100" />
            <div className="shopviewLogo">
              <img src={shopView.shop.logo_image_url} alt="Shop Logo" />
            </div>
          </div>
        </div>
        <br />
      </div>

      <div className="container-fluid pt-3">
        <div className="shopviewDetails">
          <div className="shopviewInfo">
            <h4>{shopView.shop.name}</h4>
            <p>{shopView.shop.description}</p>
            <p><strong>Phone / Email :</strong> {shopView.shop.contact}, {shopView.email}</p>
          </div>
          <div className="shopviewFollow">
            <Button>Follow</Button>
          </div>
        </div>
        <hr />

        <div className="shopviewSearch">
          <div className="shopviewSearchInput">
            <input type="text" placeholder='Search for products...' />
            <SearchOutlinedIcon />
          </div>
          <div className="shopviewFilter">
            Filter By
          </div>
        </div>

        <div className="shopviewProducts">
          {shopView.shop.products.map((item, index) => (
            <div className="item" key={index}>
              <ProductHome item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopView;
