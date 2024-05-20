import React, { useState, useEffect } from "react";
import "./producthome.css";
import NewSellerSidebar from "./sellersidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import storeIcon from "../assets/store-2.png";
import placeholderImage from "../assets/glasses.png";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetch("https://mybanda-backend-88l2.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        const productsWithImages = data.map((product) => {
          fetch(`https://mybanda-backend-88l2.onrender.com/products/${product.id}/images`)
            .then((response) => response.json())
            .then((imageData) => {
              const imageUrl = imageData.length > 0 ? imageData[0].image_url : placeholderImage;
              return { ...product, image_url: imageUrl };
            })
            .catch((error) => {
              console.error("Error fetching product images:", error);
              return { ...product, image_url: placeholderImage };
            });
        });
        Promise.all(productsWithImages)
          .then((products) => setProducts(products))
          .catch((error) => console.error("Error fetching product images:", error));
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-home-container">
      <div className="prodheader">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={storeIcon} alt="Store Icon" style={{ width: "20px", height: "auto" }} />
          <h1 style={{ fontSize: "24px", marginLeft: "10px", verticalAlign: "middle" }}>Products</h1>
        </div>
        <div className="header-icons">
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.quantity_available < 5 && (
              <div className="quantity-tag running-low">
                {product.quantity_available === 0 ? "Out of Stock" : "Running Low"}
              </div>
            )}
            {product.quantity_available >= 5 && (
              <div className="quantity-tag available">
                Available
              </div>
            )}
            <div className="product-image">
              <img src={product.image_url} alt="Product" />
            </div>
            <div className="product-info">
              <h2>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h2>
              <p>Quantity: {product.quantity_available}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProduct >= products.length}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <NewSellerSidebar />
    </div>
  );
};

export default ProductHome;
