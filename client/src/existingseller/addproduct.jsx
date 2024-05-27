import React, { useState, useEffect } from "react";
import "./addproduct.css";
import OldSidebar from './oldside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

import storeIcon from '../assets/store-2.png';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrls, setImageUrls] = useState([""]);
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        // Fetch user ID from JWT token in local storage
        const fetchUserId = () => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const tokenParts = accessToken.split('.');
                const payload = JSON.parse(atob(tokenParts[1]));
                return payload.sub;
            }
            return null;
        };

        const userId = fetchUserId();
        console.log('User ID:', userId);
    }, []);

    const handleImageChange = (index, event) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = event.target.value;
        setImageUrls(newImageUrls);
    };

    const addMoreImages = () => {
        if (imageUrls.length < 5) {
            setImageUrls([...imageUrls, ""]);
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
          productName,
          description,
          price,
          imageUrls,
          quantity,
          category,
          sizes,
        
      };
  
      console.log("Data to be submitted:", data); 
  
      try {
          const response = await fetch(
              "https://mybanda-backend-88l2.onrender.com/products",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
              }
          );
  
          console.log("Response:", response); // Log response object
  
          if (response.ok) {
              const responseData = await response.json();
              console.log("Product submitted successfully:", responseData);
              // Redirect user or show success message
          } else {
              console.error("Failed to submit product:", response.statusText);
              // Handle error, show error message to user, etc.
          }
      } catch (error) {
          console.error("Error submitting product:", error);
          // Handle error, show error message to user, etc.
      }
  };
  

    return (
        <div className="add-product-container">
            <OldSidebar />
            <div className="prodheader">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={storeIcon} alt="Store Icon" style={{ width: '20px', height: 'auto' }} />
                    <h1 style={{ fontSize: '24px', marginLeft: '10px', verticalAlign: 'middle' }}>Add a New Product</h1>
                </div>
            </div>
            <div className="form-sections-container">
                <div className="left-column">
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
                    <div className="form-section gray-container">
                        <h2>General Information</h2>
                        <div className="add-form-group">
                            <label> Product Name </label>
                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength="20" />
                        </div>
                        <div className="add-form-group">
                            <label>Product Description </label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength="100" />
                        </div>
                    </div>
                    <div className="form-section gray-container">
                        <h2>Pricing and Stock</h2>
                        <div className="add-form-group">
                            <label>Base Pricing</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="add-form-group">
                            <label>Stock</label>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="add-form-group">
                            <label>Category</label>
                            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Home Decor">Home Decor</option>
                                <option value="Appliances">Appliances</option>
                                <option value="Tools & Hardware">Tools & Hardware</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Beauty & Skincare">Beauty & Skincare</option>
                            </select>
                        </div>
                        {["Clothing", "Shoes"].includes(category) && (
                            <div className="add-form-group">
                                <label>Sizes</label>
                                <p>Pick available sizes</p>
                                <div className="sizes-container">
                                    {getSizesForCategory(category).map((size) => (
                                        <button key={size} type="button" className={`size-button ${sizes.includes(size) ? "selected" : ""}`} onClick={() => handleSizeClick(size)}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right-column">
                    <div className="form-section gray-container">
                        <h2>Input Image URLs</h2>
                        <div className="image-upload-container">
                            {imageUrls.map((url, index) => (
                                <div key={index} className="image-preview">
                                    <input type="text" placeholder={`Image URL ${index + 1}`} value={url} onChange={(e) => handleImageChange(index, e)} />
                                </div>
                            ))}
                            {imageUrls.length < 5 && (
                                <button type="button" className="add-more-button" onClick={addMoreImages}>
                                    <FontAwesomeIcon icon={faPlus} className="adpbtn" style={{ color: 'white' }} /> Add More
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="form-actions">
                        <button className="add-new-product-button" onClick={handleSubmit}> Add Product </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;