import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import OldSellerSidebar from "./oldside";
import "./shopview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 

function ShopView() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 16;

  useEffect(() => {
    const fetchShopData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Authentication token not found.');
        }

        const tokenPayload = token.split('.')[1];
        const decodedToken = JSON.parse(atob(tokenPayload));
        const userId = decodedToken.sub;

        const response = await fetch(`https://mybanda-backend-88l2.onrender.com/shop`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch shop data: ${response.statusText}`);
        }

        const data = await response.json();
        const userShopData = data.find(shop => shop.seller_id === userId);

        if (!userShopData) {
          throw new Error('Shop data not found for the logged-in user');
        }

        setShopData(userShopData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  console.log("shop data", shopData);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    setCurrentPage(1); // Reset pagination when changing the filter option
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = shopData?.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterOption === "" || (filterOption === "low" && product.quantity_available < 5) || (filterOption === "high" && product.quantity_available >= 5))
  ) || [];
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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

  if (!shopData) {
    return <div>No shop data available</div>;
  }

  return (
    <div className="shop-view">
      <OldSellerSidebar /> 
      <div className="shop-view-content">
        <div className="shop-banner">
          <img src={shopData.banner_image_url} alt="Shop Banner" className="banner-img" />
          <div className="shop-logo-container">
            <img src={shopData.logo_image_url} alt="Shop Logo" className="shop-logo" />
          </div>
        </div>

        <div className="shop-details">
          <div className="shop-info">
            <h4>{shopData.name}</h4>
            <p>{shopData.description}</p>
            <p>Contact :{shopData.contact} {shopData.email}</p>
          </div>
         {/* <div className="shop-actions">
            <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
          </div>
  */}
        </div>
        <hr />

        <div className="spbsearch-export">
          <div className="spbsearch-box">
            <FontAwesomeIcon icon={faSearch} className="spbsearchicon" />
            <input type="text" placeholder="Search Products..." value={searchQuery} onChange={handleSearch} />
          </div>
         {/*<div className="filter-dropdown">
            <select value={filterOption} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="low">Low Stock</option>
              <option value="high">High Stock</option>
            </select>
  </div> */}
        </div>

        <div className="shop-products">
          {currentProducts.map((product, index) => (
            <div className="product-card" key={index}>
              {product.quantity_available < 5 && (
                <div className="quantity-tag running-low">
                  {product.quantity_available === 0 ? "Out of Stock" : "Running Low"}
                </div>
              )}
              {product.quantity_available >= 5 && (
                <div className="quantity-tag available">Available</div>
              )}
              <div className="product-image">
                <img src={product.images[0].image_url} alt={product.name} />
              </div>
              <div className="product-info">
                <h5>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h5>
                <p>Quantity: {product.quantity_available}</p>
                <p>Category: {product.category}</p>
                <p>Price: Ksh.{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="view-more">
          <Button onClick={() => navigate('/producthome')}>View More </Button>
        </div>
      </div>
    </div>
  );
}

export default ShopView;
